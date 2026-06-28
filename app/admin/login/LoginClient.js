"use client";

import { useMemo, useState } from "react";
import { Languages, LockKeyhole } from "lucide-react";

const copy = {
  en: {
    lang: "Русский",
    title: "Forten Admin Login",
    subtitle: "Private access for Forten internal CRM.",
    password: "Password",
    submit: "Sign in",
    error: "Password is incorrect.",
    hint: "Demo password is available when ADMIN_PASSWORD is not configured."
  },
  ru: {
    lang: "English",
    title: "Вход в админ-панель Forten",
    subtitle: "Закрытый доступ к внутренней CRM Forten.",
    password: "Пароль",
    submit: "Войти",
    error: "Неверный пароль.",
    hint: "Демо-пароль работает, если ADMIN_PASSWORD не настроен."
  }
};

export default function LoginClient() {
  const [lang, setLang] = useState("en");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const safeLang = copy[lang] ? lang : "en";
  const t = useMemo(() => copy[safeLang], [safeLang]);

  async function submit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const result = await response.json().catch(() => ({ ok: false }));
      if (!response.ok || !result.ok) {
        setError(t.error);
        return;
      }
      saveSession();
      window.location.assign("/admin");
    } catch {
      setError(t.error);
    }
  }

  return (
    <main className="loginShell">
      <form className="loginCard" onSubmit={submit}>
        <div className="loginTop">
          <span className="mark">F</span>
          <button type="button" className="secondary" onClick={() => setLang(safeLang === "en" ? "ru" : "en")}><Languages size={17} />{t.lang}</button>
        </div>
        <LockKeyhole size={34} />
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <label>{t.password}</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button className="primary" type="submit">{t.submit}</button>
        <p className="hint">{t.hint}</p>
        {error && <p className="loginError">{error}</p>}
      </form>
    </main>
  );
}

function saveSession() {
  try {
    localStorage.setItem("fortenAdminSession", "active");
  } catch {}
  try {
    document.cookie = "fortenAdminSession=active; max-age=28800; path=/; SameSite=Lax";
  } catch {}
}
