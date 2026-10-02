import packageJson from "../../package.json" with { type: "json" };
import { color } from "../utils/color.js";

export const version = [
    `Version : ${color.yellow}${packageJson.version}${color.reset}`
];
