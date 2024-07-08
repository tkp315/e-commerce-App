import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.route.js";
import { profileRoute } from "./routes/profile.route.js";
import { addressRoute } from "./routes/address.route.js";
import { productRoute } from "./routes/product.route.js";
import { paymentRoute } from "./routes/payment.route.js";
import { categoryRoute } from "./routes/category.route.js";
import { trackingRoute } from "./routes/tracking.route.js";

const app = express();

app.use(cors({
  origin: 'https://668a8de061200ed8a91150c0--profound-crumble-ce3c7e.netlify.app',
  credentials: true
}));

app.options('*', cors({
  origin: 'https://668a8de061200ed8a91150c0--profound-crumble-ce3c7e.netlify.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));


app.use(cookieParser());
app.use(
  json({
    limit: "200KB",
  })
);


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(`/api/v1/user`, router);
app.use(`/api/v1/profile`, profileRoute);
app.use(`/api/v1/address`, addressRoute);
app.use(`/api/v1/product`, productRoute);
app.use(`/api/v1/category`, categoryRoute);
app.use(`/api/v1/tracking`, trackingRoute);

app.use("/api/v1/payment", paymentRoute);

export default app;
