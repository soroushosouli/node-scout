#!/usr/bin/env node

import { help } from "./commands/help.js"
import { system } from "./commands/system.js"
import { version } from "./commands/version.js"
import { scout } from "./utils/scout.js"
import { scanFile } from "./targets/file.js"
import { scanFolder } from "./targets/folder.js"
import { scanProject } from "./targets/project.js"

const args = process.argv.slice(2);

switch (args[0]){
    case undefined:
        scout(help)
        break;

    default:
        console.error("Unknown command, type in scout -h for help");
        break;        

    case "help":
    case "-h":
        scout(help)
        break;

    case "version":
    case "-v":
        scout(version)
        break;

    case "system":
        scout(system)
        break;

    case "file":
        scanFile(args[1])
        break;  
        
    case "folder":
        scanFolder(args[1])
        break;

    case "project":
        scanProject(args[1])
        break;           
}