import { color } from "./color.js";
import { scout } from "./scout.js";

export let IGNORE = [
    ".env",
    ".gitignore",
    "node_modules",
    ".git",
    "LICENSE",
];

export function add(...args) {
    let number = 0;

    for (const arg of args) {
        if (!IGNORE.includes(arg)) {
            IGNORE.push(arg);
            number++;
        }
    }

    const addMsg = [
        `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Ignore List${color.reset}`,
        `Added ${number} items to the ignore list`,
    ];

    scout(addMsg);
}

export function remove(...args) {
    let number = 0;

    for (const arg of args) {
        const index = IGNORE.indexOf(arg);

        if (index !== -1) {
            IGNORE.splice(index, 1);
            number++;
        }
    }

    const removeMsg = [
        `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Ignore List${color.reset}`,
        `Removed ${number} items from the ignore list`,
    ];

    scout(removeMsg);
}

export function reset() {
    IGNORE = [
        ".env",
        ".gitignore",
        "node_modules",
        ".git",
        "LICENSE",
    ];

    const resetMsg = [
        `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Ignore List${color.reset}`,
        `Ignore list has been successfully reset.`,
    ];

    scout(resetMsg);
}
