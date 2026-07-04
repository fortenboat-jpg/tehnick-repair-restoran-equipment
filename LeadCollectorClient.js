"use client";

export default function AdminError({ reset }) {
  return (
    <main className="adminGate">
      <section className="panel">
        <span className="mark">F</span>
        <h1>Forten Admin</h1>
        <p>Admin screen recovered from a client error.</p>
        <div className="buttonRow">
          <button className="primary" onClick={reset}>Try again</button>
          <a className="secondary" href="/admin/login">Login</a>
        </div>
      </section>
    </main>
  );
}
