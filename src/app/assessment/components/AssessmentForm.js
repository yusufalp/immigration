"use client"; // Mark as a client component

import { countryList } from "@/app/data/countries";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../page.module.css";
import Image from "next/image";

export default function AssessmentForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    citizenship: "",
    websiteUrl: "",
    visaType: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submittedDate = new Date();

    const response = await fetch(`http://localhost:3000/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        submittedDate,
      }),
    });

    if (response.ok) {
      router.push("/assessment/modal");
    } else {
      alert("Form submission failed.");
    }
  };

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <select
              name="citizenship"
              value={formData.citizenship}
              onChange={handleChange}
            >
              <option value="select">Country of Citizenship</option>
              {countryList.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="url"
              id="websiteUrl"
              name="websiteUrl"
              placeholder="LinkedIn / Personal Website URL"
              value={formData.websiteUrl}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.visaTypes}>
            <div className={styles.logo}>
              <Image
                src="/options.svg"
                alt="options icon"
                width={48}
                height={48}
                priority
              />
            </div>
            <h2 className={styles.introTitle}>Visa categories of interest?</h2>
            <label className={styles.visaType}>
              <input
                type="radio"
                name="visaType"
                value="O-1"
                required
                onChange={handleChange}
              />
              <span>O-1</span>
            </label>
            <label className={styles.visaType}>
              <input
                type="radio"
                name="visaType"
                value="EB-1A"
                onChange={handleChange}
              />
              <span>EB-1A</span>
            </label>
            <label className={styles.visaType}>
              <input
                type="radio"
                name="visaType"
                value="EB-2 NIW"
                onChange={handleChange}
              />
              <span>EB-2 NIW</span>
            </label>
            <label className={styles.visaType}>
              <input
                type="radio"
                name="visaType"
                value="unsure"
                onChange={handleChange}
              />
              <span>{`I don't know`}</span>
            </label>
          </div>
          <div>
            <div className={styles.logo}>
              <Image
                src="/support.svg"
                alt="support icon"
                width={48}
                height={48}
                priority
              />
            </div>
            <h2 className={styles.introTitle}>How can we help you?</h2>
            <textarea
              name="message"
              rows="6"
              placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.submit}>
            <button className={styles.primary} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
