import fs from "node:fs/promises";
import path from "node:path";

import { scout } from "../utils/scout.js";
import { color } from "../utils/color.js";
import { detect } from "../utils/language.js";

export async function scanFile(p) {
    try {
        if (!p) {
            throw new Error("No path provided");
        }

        const stats = await fs.stat(p);

        if (!stats.isFile()) {
            throw new Error(`Path is not a file: ${p}`);
        }

        const extname = path.extname(p);
        const content = await fs.readFile(p, "utf8");

        const daysAgo = Math.floor(
            (Date.now() - stats.birthtimeMs) / 86_400_000
        );

        const lines = content.split(/\r?\n/).length;
        const characters = content.length;

        const trimmed = content.trim();
        const words = trimmed ? trimmed.split(/\s+/).length : 0;

        let overview;

        if (lines < 30) {
            overview = "Minimal";
        } else if (lines <= 80) {
            overview = "Compact";
        } else if (lines <= 200) {
            overview = "Balanced";
        } else if (lines <= 400) {
            overview = "Large";
        } else if (lines <= 700) {
            overview = "Very Large";
        } else {
            overview = "Excessive";
        }

        const fileInfo = [
            `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}File information${color.reset}`,
            "",

            `${color.yellow}── BASIC ──${color.reset}`,
            `  Name        ${path.basename(p)}`,
            `  Full path   ${path.resolve(p)}`,
            `  Type        File`,
            `  Extension   ${extname}`,
            `  Language    ${detect(extname)}`,
            `  Size        ${(stats.size / 1024).toFixed(1)} KB`,
            "",

            `${color.green}── CONTENT ──${color.reset}`,
            `  Lines       ${lines}`,
            `  Characters  ${characters}`,
            `  Words       ${words}`,
            "",

            `${color.cyan}── OTHER ──${color.reset}`,
            `  Created     ${daysAgo} days ago`,
            `  Overview    ${overview}`,
            "",
        ];

        scout(fileInfo);

    } catch (error) {
        console.error(`${color.red}Error: ${error.message}${color.reset}`);
    }
}