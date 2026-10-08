#!/usr/bin/env node

import { help } from "./commands/help.js";
import { system } from "./commands/system.js";
import { version } from "./commands/version.js";
import { scout } from "./utils/scout.js";
import { scanFile } from "./targets/file.js";
import { scanFolder } from "./targets/folder.js";
import { scanProject } from "./targets/project.js";
import { scanTree } from "./commands/tree.js";
import {
    add,
    remove,
    reset,
    list,
} from "./utils/ignore.js";

const args = process.argv.slice(2);

switch (args[0]) {
    case undefined:
        scout(help);
        break;

    case "help":
    case "-h":
        scout(help);
        break;

    case "version":
    case "-v":
        scout(version);
        break;

    case "system":
        scout(system);
        break;

    case "file":
        scanFile(args[1]);
        break;

    case "folder":
        scanFolder(args[1]);
        break;

    case "project":
        scanProject(args[1]);
        break;

    case "tree":
        scanTree(args[1]);
        break;        

    case "ignore":
        if (!args[1]) {
            list();
            break;
        }

        switch (args[1]) {
            case "add":
                await add(...args.slice(2));
                break;

            case "remove":
                await remove(...args.slice(2));
                break;

            case "reset":
                await reset();
                break;

            case "list":
                list();
                break;

            default:
                console.error("Unknown ignore command");
        }

        break;

    default:
        console.error("Unknown command, type in scout -h for help");
        break;
}