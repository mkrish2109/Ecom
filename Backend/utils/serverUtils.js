const connect = require("../db/connect");

const start = async (app) => {
  const PORT = process.env.PORT || 5000;
  try {
    await connect();
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.log("Failed to connect to the database. Error: ", error.message);
  }
};

const sendErrorResponse = (res, msg, status = 500) => {
  res.status(status).json({ success: false, msg });
};

module.exports = { start, sendErrorResponse };
