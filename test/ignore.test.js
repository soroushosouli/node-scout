import test from "node:test";
import assert from "node:assert/strict";

import {
    IGNORE,
    add,
    remove,
    reset,
    list,
} from "../src/utils/ignore.js";

const DEFAULT_IGNORE = [
    ".env",
    ".gitignore",
    "node_modules",
    ".git",
    "LICENSE",
];

test("IGNORE starts with default ignore items", () => {
    assert.deepEqual(IGNORE, DEFAULT_IGNORE);
});

test("add() adds new items to the ignore list", async () => {
    await reset();

    await add("dist", "coverage");

    assert.ok(IGNORE.includes("dist"));
    assert.ok(IGNORE.includes("coverage"));

    await reset();
});

test("add() does not add duplicate items", async () => {
    await reset();

    await add("dist");
    await add("dist");

    assert.equal(
        IGNORE.filter(item => item === "dist").length,
        1
    );

    await reset();
});

test("add() handles multiple items", async () => {
    await reset();

    await add("dist", "coverage", "build");

    assert.ok(IGNORE.includes("dist"));
    assert.ok(IGNORE.includes("coverage"));
    assert.ok(IGNORE.includes("build"));

    await reset();
});

test("add() with no arguments does not change the list", async () => {
    await reset();

    const before = [...IGNORE];

    await add();

    assert.deepEqual(IGNORE, before);
});

test("remove() removes existing items", async () => {
    await reset();

    await add("dist", "coverage");

    await remove("dist");

    assert.ok(!IGNORE.includes("dist"));
    assert.ok(IGNORE.includes("coverage"));

    await reset();
});

test("remove() ignores items that do not exist", async () => {
    await reset();

    const before = [...IGNORE];

    await remove("does-not-exist");

    assert.deepEqual(IGNORE, before);
});

test("remove() handles multiple items", async () => {
    await reset();

    await add("dist", "coverage", "build");

    await remove("dist", "coverage");

    assert.ok(!IGNORE.includes("dist"));
    assert.ok(!IGNORE.includes("coverage"));
    assert.ok(IGNORE.includes("build"));

    await reset();
});

test("remove() with no arguments does not change the list", async () => {
    await reset();

    const before = [...IGNORE];

    await remove();

    assert.deepEqual(IGNORE, before);
});

test("reset() restores the default ignore list", async () => {
    await add("dist", "coverage", "build");

    await reset();

    assert.deepEqual(IGNORE, DEFAULT_IGNORE);
});

test("list() does not modify the ignore list", async () => {
    await reset();

    const before = [...IGNORE];

    list();

    assert.deepEqual(IGNORE, before);
});
