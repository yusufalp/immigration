import Image from "next/image";
import AssessmentForm from "./components/AssessmentForm";
import styles from "./page.module.css";

export default async function AssessmentFormPage() {
  return (
    <>
      <div className={styles.header}>
      </div>
      <div className={styles.page}>
        <main className={styles.main}>
          <section className={styles.intro}>
            <Image
              src="/info.svg"
              alt="info icon"
              width={48}
              height={48}
              priority
            />
            <h2 className={styles.introTitle}>
              Want to understand your visa options?
            </h2>
            <p className={styles.introDescription}>
              Submit the form below and our team of experienced attorneys will
              review your information and send a preliminary assessment of your
              case based on your goals.
            </p>
          </section>
          <AssessmentForm />
        </main>
      </div>
    </>
  );
}
