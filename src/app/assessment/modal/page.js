import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function ModalPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.logo}>
          <Image
            src="/info.svg"
            alt="info icon"
            width={48}
            height={48}
            priority
          />
        </div>
        <section className={styles.intro}>
          <h2 className={styles.introTitle}>Thank You!</h2>
          <p className={styles.introDescription}>
            Your information was submitted to our team of immigration attorneys.
            Expect an email from hello@tryalma.ai
          </p>
        </section>
        <Link href="/" className={styles.button}>
          Go Back to Homepage
        </Link>
      </main>
    </div>
  );
}
