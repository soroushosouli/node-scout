import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { scanFolder } from "../src/targets/folder.js";

test("scans a folder recursively", async () => {
    const tempDir = await fs.mkdtemp(
        path.join(os.tmpdir(), "node-scout-")
    );

    const nestedDir = path.join(tempDir, "nested");
    await fs.mkdir(nestedDir);

    await fs.writeFile(
        path.join(tempDir, "main.js"),
        "console.log('main');"
    );

    await fs.writeFile(
        path.join(nestedDir, "nested.js"),
        "console.log('nested');"
    );

    await scanFolder(tempDir);

    const mainStats = await fs.stat(path.join(tempDir, "main.js"));
    const nestedStats = await fs.stat(path.join(nestedDir, "nested.js"));

    assert.equal(mainStats.isFile(), true);
    assert.equal(nestedStats.isFile(), true);

    await fs.rm(tempDir, { recursive: true, force: true });
});