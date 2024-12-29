"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      localStorage.setItem("authToken", "mySecretToken");
      router.push("/leads");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <form onSubmit={handleLogin} className={styles.form}>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.submit}>
            <button className={styles.primary} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
