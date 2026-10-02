import test from "node:test";
import assert from "node:assert/strict";

import { system } from "../src/commands/system.js";

test("system info contains expected sections", () => {
    assert.equal(Array.isArray(system), true);

    assert.equal(system[0], "==== SYSTEM INFO ====");

    assert.ok(system.some(line => line.startsWith("OS:")));
    assert.ok(system.some(line => line.startsWith("Hostname:")));
    assert.ok(system.some(line => line.startsWith("User:")));

    assert.ok(system.some(line => line.startsWith("CPU Model:")));
    assert.ok(system.some(line => line.startsWith("CPU Cores:")));
    assert.ok(system.some(line => line.startsWith("Total RAM:")));
    assert.ok(system.some(line => line.startsWith("Free RAM:")));

    assert.ok(system.some(line => line.startsWith("Node:")));
    assert.ok(system.some(line => line.startsWith("npm:")));
    assert.ok(system.some(line => line.startsWith("CWD:")));
});