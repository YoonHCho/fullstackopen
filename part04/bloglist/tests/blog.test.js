import { test, describe } from "node:test";
import assert from "node:assert";

import { dummy } from "../utils/list_helper.js";

describe("Dummy function", () => {
  test("dummy returns one", () => {
    assert.strictEqual(dummy([1, 2, 3]), 1);
  });
});
