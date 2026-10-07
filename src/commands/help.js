import { color } from "../utils/color.js";

export const help = [
    `${color.bold}${color.cyan}SCOUT${color.reset} ${color.dim}Project inspection CLI${color.reset}`,
    "",

    `${color.yellow}COMMANDS${color.reset}`,
    `  ${color.green}system${color.reset}     Show system information`,
    `  ${color.green}help${color.reset}       Show this help message`,
    `  ${color.green}version${color.reset}    Show Scout version`,
    `  ${color.green}ignore${color.reset}    Shows Ignore list`,
    "",

    `${color.yellow}TARGETS${color.reset}`,
    `  ${color.cyan}file${color.reset}       Analyze a file`,
    `  ${color.cyan}folder${color.reset}     Analyze a folder`,
    `  ${color.cyan}project${color.reset}    Analyze a project`,
    `  ${color.cyan}ignore add${color.reset}    Add items to ignore list`,
    `  ${color.cyan}ignore remove${color.reset}    Remove items from ignore list`,
    `  ${color.cyan}ignore reset${color.reset}    Reset ignore list to the package default`,
    "",

    `${color.yellow}OPTIONS${color.reset}`,
    `  ${color.magenta}-v${color.reset}          Show Scout version`,
    `  ${color.magenta}-h${color.reset}          Show this help message`,
    "",
];