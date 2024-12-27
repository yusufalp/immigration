"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Assessment() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    citizenship: "",
    websiteUrl: "",
    resume: null,
    visaCategory: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, resume: file });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h2 className={styles.introTitle}>
            Want to understand your visa options?
          </h2>
          <p className={styles.introDescription}>
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
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <select defaultValue="select" name="citizenship">
              <option value="select">Country of Citizenship</option>
              {/* {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))} */}
            </select>
          </div>
          <div>
            <input
              type="url"
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="LinkedIn / Personal Website URL"
              required
            />
          </div>
          <div>
            <label>Please submit your resume (PDF or Word)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </div>
          <div>
            <h2 className={styles.introTitle}>Visa categories of interest?</h2>
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
            <h2 className={styles.introTitle}>How can we help you?</h2>
            <textarea
              name="message"
              rows="6"
              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
              required
            />
          </div>
          <div className={styles.submit}>
            <button className={styles.primary} type="submit">
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
