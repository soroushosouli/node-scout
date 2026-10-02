import packageJson from "../../package.json" with { type: "json" };
import { color } from "../utils/color.js";

export const version = [
    `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Version${color.reset}`,
    `Version: ${color.yellow}${packageJson.version}${color.reset}`
];