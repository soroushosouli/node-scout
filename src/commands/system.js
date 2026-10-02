import os from "node:os";
import { exec } from "node:child_process";
import { promisify } from "node:util";

import { getPlatform } from "../utils/platform.js";
import { color } from "../utils/color.js";

const execAsync = promisify(exec);

const gb = bytes => (bytes / 1024 ** 3).toFixed(1);

const { stdout } = await execAsync("npm --version");
const npm = stdout.trim();

export const system = [
    `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}System information${color.reset}`,
    "",

    `${color.yellow}── MACHINE ──${color.reset}`,
    `  OS          ${getPlatform()}`,
    `  Hostname    ${os.hostname()}`,
    `  User        ${os.userInfo().username}`,
    "",

    `${color.green}── HARDWARE ──${color.reset}`,
    `  CPU Model   ${os.cpus()[0].model}`,
    `  CPU Cores   ${os.cpus().length}`,
    `  Total RAM   ${gb(os.totalmem())} GB`,
    `  Free RAM    ${gb(os.freemem())} GB`,
    "",

    `${color.cyan}── RUNTIME ──${color.reset}`,
    `  Node        ${process.version}`,
    `  npm         ${npm}`,
    `  CWD         ${process.cwd()}`,
    "",
    
];