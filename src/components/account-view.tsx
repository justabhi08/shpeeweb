"use client";
import { useEffect, useState, type FormEvent } from "react";
import { acceptInvite, getUser, handleAuthCallback, login, logout, requestPasswordRecovery, signup, updateUser } from "@netlify/identity";
import Link from "next/link";
import { OrderCard, type OrderDetails } from "./order-card";
export function AccountView() {
  const [email, setEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(true);
  const [mode, setMode] = useState("login");
  const [invite, setInvite] = useState("");
  async function load() {
    const user = await getUser();
    setEmail(user?.email ?? null);
    if (user) {
      const res = await fetch("/api/account/orders", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setOrders(data.orders);
    }
  }
  useEffect(() => { (async () => {
    try {
      const result = await handleAuthCallback();
      if (result?.type === "invite") { setInvite(result.token ?? ""); setMode("reset"); }
      if (result?.type === "recovery") setMode("reset");
      await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to load account."); }
    finally { setBusy(false); }
  })(); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const data = new FormData(event.currentTarget);
    const address = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    try {
      if (mode === "signup") { await signup(address, password); setMessage("Check your email to confirm your account, then sign in."); }
      else if (mode === "forgot") { await requestPasswordRecovery(address); setMessage("Check your email for a password reset link."); }
      else if (mode === "reset") { if (invite) await acceptInvite(invite, password); else await updateUser({ password }); setInvite(""); setMode("login"); setMessage("Password saved."); }
      else await login(address, password);
      await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }
  return <div className="site-container order-dashboard">
    <div className="order-dashboard-head"><div><h2>{email ? "My orders" : "Your account"}</h2><p>{email ?? "Sign in with the email used at checkout to see your orders."}</p></div><Link href="/track-order" className="outline-button">Track a guest order</Link></div>
    {mode === "reset" || !email ? <form className="account-auth" onSubmit={submit}>
      <h3>{mode === "signup" ? "Create account" : mode === "forgot" ? "Reset password" : mode === "reset" ? "Set password" : "Sign in"}</h3>
      {mode !== "reset" && <label>Email address<input name="email" type="email" autoComplete="email" required /></label>}
      {mode !== "forgot" && <label>Password<input name="password" type="password" minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} required /></label>}
      <button className="primary-button" disabled={busy}>{busy ? "Please wait…" : "Continue"}</button>
      <div className="account-actions">{["login", "signup", "forgot"].map(value => <button type="button" key={value} disabled={busy} onClick={() => { setMode(value); setMessage(""); }}>{value === "login" ? "Sign in" : value === "signup" ? "Create account" : "Forgot password"}</button>)}</div>
    </form> : <><div className="account-actions"><button disabled={busy} onClick={async () => { setBusy(true); try { await load(); } catch { setMessage("Unable to refresh orders."); } finally { setBusy(false); } }}>Refresh orders</button><button onClick={async () => { try { await logout(); setEmail(null); setOrders([]); } catch { setMessage("Unable to sign out."); } }}>Sign out</button><Link href="/admin/orders">Manage orders (admin)</Link></div>{!orders.length && !busy && <p>No orders found for this email.</p>}{orders.map(order => <OrderCard order={order} key={order.orderNumber} />)}</>}
    <p role="status">{message}</p>
  </div>;
}
