import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import { router } from "./router";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.static('static'));
app.use(router);
