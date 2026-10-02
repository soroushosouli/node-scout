import fs from "node:fs/promises";
import path from "node:path";

import { scout } from "../utils/scout.js";
import { color } from "../utils/color.js";
import { detect } from "../utils/language.js";

export async function scanFolder(p) {
    try {
        if (!p) {
            throw new Error("No path provided");
        }

        const absolutePath = path.resolve(p);
        const stats = await fs.stat(absolutePath);

        if (!stats.isDirectory()) {
            throw new Error(`Path is not a folder: ${p}`);
        }

        let files = 0;
        let folders = 0;
        let totalSize = 0;

        const extensionMap = {};

        async function scanDirectory(directory) {
            const entries = await fs.readdir(directory, {
                withFileTypes: true
            });

            for (const entry of entries) {
                const entryPath = path.join(directory, entry.name);

                if (entry.isDirectory()) {
                    folders++;
                    await scanDirectory(entryPath);
                    continue;
                }

                if (entry.isFile()) {
                    files++;

                    const fileStats = await fs.stat(entryPath);
                    totalSize += fileStats.size;

                    const ext = path.extname(entry.name);
                    const type = detect(ext);

                    extensionMap[type] =
                        (extensionMap[type] || 0) + 1;
                }
            }
        }

        await scanDirectory(absolutePath);

        const totalItems = files + folders;

        const daysAgo = Math.floor(
            (Date.now() - stats.birthtimeMs) / 86_400_000
        );

        let overview;

        if (totalItems < 5) {
            overview = "Minimal";
        } else if (totalItems <= 15) {
            overview = "Compact";
        } else if (totalItems <= 40) {
            overview = "Balanced";
        } else if (totalItems <= 80) {
            overview = "Large";
        } else if (totalItems <= 150) {
            overview = "Very Large";
        } else {
            overview = "Excessive";
        }

        const fileTypes = Object.entries(extensionMap).map(
            ([type, count]) => {
                const percentage = files
                    ? ((count / files) * 100).toFixed(1)
                    : "0.0";

                return `${type}: ${count} file${count === 1 ? "" : "s"} (${percentage}%)`;
            }
        );

        const folderInfo = [
            `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Folder information${color.reset}`,
            "",

            `${color.yellow}── BASIC ──${color.reset}`,
            `  Name        ${path.basename(absolutePath)}`,
            `  Path        ${absolutePath}`,
            `  Type        Folder`,
            "",

            `${color.green}── CONTENTS ──${color.reset}`,
            `  Files       ${files}`,
            `  Folders     ${folders}`,
            `  Total Items ${totalItems}`,
            "",

            `${color.cyan}── FILE TYPES ──${color.reset}`,
            ...(fileTypes.length
                ? fileTypes.map(type => `  ${type}`)
                : [`  ${color.dim}No files${color.reset}`]
            ),
            "",

            `${color.magenta}── OTHER ──${color.reset}`,
            `  Created     ${daysAgo} days ago`,
            `  Total Size  ${(totalSize / 1024).toFixed(1)} KB`,
            `  Overview    ${overview}`,
            "",
        ];

        scout(folderInfo);

    } catch (error) {
        console.error(
            `${color.red}Error: ${error.message}${color.reset}`
        );
    }
}