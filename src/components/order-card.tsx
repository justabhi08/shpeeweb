import { formatPrice } from "@/data/catalog";
import { orderStatuses, stageIndex } from "@/lib/order-status";
export type OrderDetails = {
  orderNumber: string; status: string; paymentMethod: string; paymentStatus: string;
  courier: string | null; trackingNumber: string | null; estimatedDelivery: string | null;
  total: string; createdAt: string; history: { status: string; note: string; at: string }[];
};
export function OrderCard({ order }: { order: OrderDetails }) {
  return <article className="order-detail-card">
    <div className="tracking-result-head"><h3>{order.orderNumber}</h3><b>{order.status}</b></div>
    <p>{new Date(order.createdAt).toLocaleDateString("en-IN")} · {formatPrice(Number(order.total))}</p>
    {order.status !== "Cancelled" ? <ol className="order-steps">{orderStatuses.slice(0, 5).map((status, i) => <li className={i <= stageIndex(order.status) ? "complete" : ""} key={status}>{status}</li>)}</ol> : <p>Order cancelled</p>}
    <p>{order.paymentMethod} · {order.paymentStatus}</p>
    {order.courier && <p>Courier: <strong>{order.courier}</strong></p>}
    {order.trackingNumber && <p>Tracking number: <strong>{order.trackingNumber}</strong></p>}
    {order.estimatedDelivery && <p>Expected delivery: <strong>{order.estimatedDelivery}</strong></p>}
    <ul className="order-history">{order.history?.slice().reverse().map((event, i) => <li key={i}><strong>{event.status}</strong> — {event.note}<small>{new Date(event.at).toLocaleString("en-IN")}</small></li>)}</ul>
  </article>;
}
