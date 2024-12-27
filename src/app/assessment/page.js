import styles from "./page.module.css";

export default function Assessment() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h2>Want to understand your visa options?</h2>
          <p>
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </p>
        </section>
        <form className={styles.form}>
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div>
            <select defaultValue="country">
              <option value="country">Country of Citizenship</option>
            </select>
          </div>
          <div>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              placeholder="LinkedIn / Personal Website URL"
              required
            />
          </div>
          <div>
            <h2>Visa categories of interest?</h2>
            <label>
              <input type="radio" name="visa" required />
              O-1
            </label>
            <label>
              <input type="radio" name="visa" />
              EB-1A
            </label>
            <label>
              <input type="radio" name="visa" />
              EB-2 NIW
            </label>
            <label>
              <input type="radio" name="visa" />
              {`I don't know`}
            </label>
          </div>
          <div>
            <h2>How can we help you?</h2>
            <textarea
              name=""
              rows="6"
              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
            />
          </div>
          <div className={styles.submit}>
            <button className={styles.primary}>Submit</button>
          </div>
        </form>
      </main>
    </div>
  );
}
