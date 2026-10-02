import { color } from "../utils/color.js";

export const help = [
    "==== SCOUT HELP ====",
    "",
    `${color.yellow}Commands${color.reset}`,
    "  scout system             Show system information",
    "  scout help               Show this help message",
    "  scout version             Show scout version",
    "",
    `${color.yellow}Targets${color.reset}`,
    "  scout file ./file.ts      Analyze a file",
    "  scout folder ./src        Analyze a folder",
    "  scout project ./project   Analyze a project",
    "",
    `${color.yellow}Options${color.reset}`,
    "  scout -v            Show Scout version",
    "  scout -h            Show this help message"
];
