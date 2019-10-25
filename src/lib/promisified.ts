import { promisify } from "util";
import { readdir as rd } from "fs";

export const readdir = promisify(rd);
