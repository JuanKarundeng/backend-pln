import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import fileupload from "express-fileupload";
import MasukDataRoute from "./routes/MasukDataRoute.js";
import UbahHargaRoute from "./routes/UbahHargaRoute.js";

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

store.sync();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(fileupload());
app.use(express.static("public"));
app.use(express.json());

//tabel
app.use(MasukDataRoute);
app.use(UbahHargaRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("server started", process.env.APP_PORT);
});
