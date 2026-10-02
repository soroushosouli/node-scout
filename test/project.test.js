import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { scanProject } from "../src/targets/project.js";

test("scans a project and ignores excluded files and folders", async () => {
    const tempDir = await fs.mkdtemp(
        path.join(os.tmpdir(), "node-scout-")
    );

    const srcDir = path.join(tempDir, "src");
    const nodeModulesDir = path.join(tempDir, "node_modules");

    await fs.mkdir(srcDir);
    await fs.mkdir(nodeModulesDir);

    await fs.writeFile(
        path.join(srcDir, "app.js"),
        "console.log('app');"
    );

    await fs.writeFile(
        path.join(tempDir, ".env"),
        "SECRET=test"
    );

    await fs.writeFile(
        path.join(tempDir, ".gitignore"),
        "node_modules"
    );

    await fs.writeFile(
        path.join(nodeModulesDir, "package.js"),
        "ignored"
    );

    await scanProject(tempDir);

    const appStats = await fs.stat(
        path.join(srcDir, "app.js")
    );

    assert.equal(appStats.isFile(), true);

    await fs.rm(tempDir, {
        recursive: true,
        force: true
    });
});