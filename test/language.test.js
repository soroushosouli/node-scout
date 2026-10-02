import test from "node:test";
import assert from "node:assert/strict";

import { detect } from "../src/utils/language.js";

test("detects JavaScript", () => {
    assert.equal(detect(".js"), "JavaScript");
});

test("detects TypeScript", () => {
    assert.equal(detect(".ts"), "TypeScript");
});

test("detects Python", () => {
    assert.equal(detect(".py"), "Python");
});

test("returns Other for unknown extensions", () => {
    assert.equal(detect(".xyz"), "Other");
});