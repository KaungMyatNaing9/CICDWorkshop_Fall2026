/** The minimum order total that qualifies for free shipping, in dollars. */
export const FREE_SHIPPING_THRESHOLD = 50;

/** The flat shipping charge for orders below the free-shipping threshold. */
export const STANDARD_SHIPPING_COST = 5;

/**
 * Return the shipping cost for an order total.
 *
 * @param {number} orderTotal Total order value in dollars.
 * @returns {number} Shipping cost in dollars.
 */
export function calculateShipping(orderTotal) {
  if (!Number.isFinite(orderTotal) || orderTotal < 0) {
    throw new TypeError("orderTotal must be a non-negative number");
  }

  // WORKSHOP BUG: An order of exactly $50 should receive free shipping.
  // Change this comparison so the test describes the intended behavior.
  return orderTotal > FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
}
