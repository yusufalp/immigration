import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.welcome}>Welcome to Alma</h1>
        <div className={styles.ctas}>
          <Link href="/assessment" className={styles.primary}>
            Get Started
          </Link>
          <Link href="/login" className={styles.primary}>
            Admin Login
          </Link>
        </div>
      </main>
    </div>
  );
}
