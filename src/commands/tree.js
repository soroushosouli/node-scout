import fs from "node:fs/promises";
import path from "node:path";

import { IGNORE } from "../utils/ignore.js";
import { color } from "../utils/color.js";

const MAX_ENTRIES = 10_000;
const MAX_DEPTH = 30;

export async function scanTree(p) {
    try {
        if (!p) {
            throw new Error("No path provided");
        }

        const stats = await fs.stat(p);

        if (!stats.isDirectory()) {
            throw new Error(`Path is not a directory: ${p}`);
        }

        const absolutePath = path.resolve(p);
        let totalEntries = 0;

        async function buildTree(currentPath, prefix = "", depth = 0) {
            if (depth > MAX_DEPTH) {
                throw new Error(
                    `Directory is too deep to scan: ${currentPath}`
                );
            }

            let entries;

            try {
                entries = await fs.readdir(currentPath, {
                    withFileTypes: true,
                });
            } catch {
                throw new Error(`Cannot read directory: ${currentPath}`);
            }

            entries = entries
                .filter((entry) => !IGNORE.includes(entry.name))
                .sort((a, b) => {
                    if (a.isDirectory() && !b.isDirectory()) return -1;
                    if (!a.isDirectory() && b.isDirectory()) return 1;

                    return a.name.localeCompare(b.name);
                });

            const lines = [];

            for (let i = 0; i < entries.length; i++) {
                totalEntries++;

                if (totalEntries > MAX_ENTRIES) {
                    throw new Error(
                        `Directory is too large to scan: over ${MAX_ENTRIES.toLocaleString()} entries`
                    );
                }

                const entry = entries[i];
                const isLast = i === entries.length - 1;

                const connector = isLast ? "└── " : "├── ";
                lines.push(`${prefix}${connector}${entry.name}`);

                if (entry.isDirectory()) {
                    const nextPrefix =
                        prefix + (isLast ? "    " : "│   ");

                    const children = await buildTree(
                        path.join(currentPath, entry.name),
                        nextPrefix,
                        depth + 1
                    );

                    lines.push(...children);
                }
            }

            return lines;
        }

        const rootName = path.basename(absolutePath) || absolutePath;
        const tree = await buildTree(absolutePath);

        console.log(
            `${color.bold}${color.cyan}SCOUT${color.reset}  ${color.dim}Project tree${color.reset}`
        );
        console.log("");
        console.log(`${rootName}/`);
        console.log(tree.join("\n"));
        console.log("");

    } catch (error) {
        console.error(
            `${color.red}Error: ${error.message}${color.reset}`
        );
    }
}