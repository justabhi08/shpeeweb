export const orderStatuses = ["Confirmed", "Processing", "Shipped", "Out for delivery", "Delivered", "Cancelled"] as const;
export const paymentStatuses = ["Due on delivery", "Pending verification", "Paid", "Refunded"] as const;
export function stageIndex(status: string) {
  return status === "Order placed" ? 0 : orderStatuses.indexOf(status as typeof orderStatuses[number]);
}
