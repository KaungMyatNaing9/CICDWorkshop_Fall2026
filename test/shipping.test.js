import assert from "node:assert/strict";
import test from "node:test";

import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
  calculateShipping,
} from "../src/shipping.js";

test("orders below the threshold pay standard shipping", () => {
  assert.equal(calculateShipping(FREE_SHIPPING_THRESHOLD - 0.01), STANDARD_SHIPPING_COST);
});

test("orders at the threshold receive free shipping", () => {
  assert.equal(calculateShipping(FREE_SHIPPING_THRESHOLD), 0);
});

test("orders above the threshold receive free shipping", () => {
  assert.equal(calculateShipping(FREE_SHIPPING_THRESHOLD + 0.01), 0);
});

test("negative totals are rejected", () => {
  assert.throws(() => calculateShipping(-1), /non-negative number/);
});
