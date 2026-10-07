import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { color } from "./color.js";
import { scout } from "./scout.js";

const configPath = path.join(
    os.homedir(),
    ".node-scout",
    "config.json"
);

const DEFAULT_IGNORE = [
    ".env",
    ".gitignore",
    "node_modules",
    ".git",
    "LICENSE",
];

export let IGNORE = [...DEFAULT_IGNORE];

async function save() {
    const configDir = path.dirname(configPath);

    await fs.mkdir(configDir, { recursive: true });

    await fs.writeFile(
        configPath,
        JSON.stringify({ ignore: IGNORE }, null, 4),
        "utf8"
    );
}

async function load() {
    try {
        const data = await fs.readFile(configPath, "utf8");
        const config = JSON.parse(data);

        if (Array.isArray(config.ignore)) {
            IGNORE = config.ignore;
        }
    } catch {
        await save();
    }
}

await load();

export async function add(...args) {
    if (!args.length) {
        console.error("No items provided to add.");
        return;
    }

    let number = 0;

    for (const arg of args) {
        if (!IGNORE.includes(arg)) {
            IGNORE.push(arg);
            number++;
        }
    }

    await save();

    const addMsg = [
        `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Ignore List${color.reset}`,
        `Added ${number} items to the ignore list`,
    ];

    scout(addMsg);
}

export async function remove(...args) {
    if (!args.length) {
        console.error("No items provided to remove.");
        return;
    }

    let number = 0;

    for (const arg of args) {
        const index = IGNORE.indexOf(arg);

        if (index !== -1) {
            IGNORE.splice(index, 1);
            number++;
        }
    }

    await save();

    const removeMsg = [
        `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Ignore List${color.reset}`,
        `Removed ${number} items from the ignore list`,
    ];

    scout(removeMsg);
}

export async function reset() {
    IGNORE = [...DEFAULT_IGNORE];

    await save();

    const resetMsg = [
        `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Ignore List${color.reset}`,
        `Ignore list has been successfully reset.`,
    ];

    scout(resetMsg);
}

export function list() {
    const listMsg = [
        `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Ignore List${color.reset}`,
        ...IGNORE.map(item => `  ${item}`),
    ];

    scout(listMsg);
}