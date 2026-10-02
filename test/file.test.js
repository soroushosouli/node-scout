import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { scanFile } from "../src/targets/file.js";

test("scans a file", async () => {
    const tempDir = await fs.mkdtemp(
        path.join(os.tmpdir(), "node-scout-")
    );

    const filePath = path.join(tempDir, "test.js");

    await fs.writeFile(
        filePath,
        "const x = 10;\nconsole.log(x);",
        "utf8"
    );

    await scanFile(filePath);

    const stats = await fs.stat(filePath);

    assert.equal(stats.isFile(), true);

    await fs.rm(tempDir, { recursive: true, force: true });
});