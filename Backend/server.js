require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { start } = require("./utils/serverUtils");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const fileupload = require("express-fileupload");
const pagesRouter = require("./routes/pagesRouter");
const whishListRouter = require("./routes/whishListRouter");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(fileupload());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/pages", pagesRouter);
app.use("/whishList", whishListRouter);

start(app);
