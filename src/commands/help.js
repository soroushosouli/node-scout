import { color } from "../utils/color.js";

export const help = [
    `${color.bold}${color.cyan}SCOUT${color.reset} ${color.dim}Project inspection CLI${color.reset}`,
    "",

    `${color.yellow}COMMANDS${color.reset}`,
    `  ${color.green}system${color.reset}     Show system information`,
    `  ${color.green}help${color.reset}       Show this help message`,
    `  ${color.green}version${color.reset}    Show Scout version`,
    "",

    `${color.yellow}TARGETS${color.reset}`,
    `  ${color.cyan}file${color.reset}       Analyze a file`,
    `  ${color.cyan}folder${color.reset}     Analyze a folder`,
    `  ${color.cyan}project${color.reset}    Analyze a project`,
    "",

    `${color.yellow}OPTIONS${color.reset}`,
    `  ${color.magenta}-v${color.reset}          Show Scout version`,
    `  ${color.magenta}-h${color.reset}          Show this help message`,
    "",
];