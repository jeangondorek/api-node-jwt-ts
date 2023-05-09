import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import express from "express";
import bodyParser from "body-parser";
import config from "./Config/config";
import mongoose from "mongoose";
import indexRoute from "./Routes/index";
import usersRoute from "./Routes/users";

const app = express();
const port = 3000;
const url = config.bd_string;

mongoose.connect(url);

mongoose.connection.on("error", (err) => {
  console.log("Erro na conexão", +err);
});

mongoose.connection.on("disconnected", () => {
  console.log("App desconectada");
});

mongoose.connection.on("connected", () => {
  console.log("App conectada");
});


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

export default app;
