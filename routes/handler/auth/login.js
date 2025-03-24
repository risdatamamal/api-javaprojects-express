const apiAdapter = require("../../adapter/api");
const jwt = require("jsonwebtoken");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.post("/auth/login", req.body);
    const data = user.data.data;
    const user_id = parseInt(data.id, 10);

    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    await api.post("/refresh_tokens", {
      refresh_token: refreshToken,
      user_id: user_id,
    });

    return res.json({
      code: 200,
      status: "success",
      data: {
        token,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ 
          code: 500, 
          status: "error", 
          message: "Service Unavailable" 
        });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
