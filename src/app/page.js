import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.welcome}>Welcome to Alma</h1>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </div>
      </main>
    </div>
  );
}
