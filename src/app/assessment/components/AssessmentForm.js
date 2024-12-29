"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { countryList } from "@/app/data/countries";
import styles from "../page.module.css";

const visaTypes = ["O-1", "EB-1A", "EB-2 NIW", "Unsure"];

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
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const validateForm = (e) => {
    const { name, value } = e.target;

    const newErrors = {};

    if (name === "firstName") {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First Name is required.";
      }
    }

    if (name === "lastName") {
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last Name is required.";
      }
    }
    if (name === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is not valid.";
      }
    }

    if (name === "websiteUrl") {
      if (!formData.websiteUrl.trim()) {
        newErrors.websiteUrl = "LinkedIn or Personal Website URL is required.";
      } else if (!/^https?:\/\/.+\..+/.test(formData.websiteUrl)) {
        newErrors.websiteUrl = "URL must be valid.";
      }
    }

    if (name === "resume") {
      if (!resumeFile) {
        newErrors.resume = "Resume is required.";
      }
    }

    if (name === "message") {
      if (!formData.message.trim()) {
        newErrors.message = "Message is required.";
      }
    }

    setErrors(newErrors);
  };

  const isFormValid = () => {
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isVisaTypeSelected = false;

    for (let radio of e.target.visaType) {
      if (radio.checked) {
        isVisaTypeSelected = true;
      }
    }

    if (!isVisaTypeSelected) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        visaType: "Please select a Visa type.",
      }));
      return;
    }

    if (!isFormValid()) {
      return;
    }

    const submittedDate = new Date();

    const responseInfo = await fetch(`http://localhost:3000/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        submittedDate,
      }),
    });

    const formDataFile = new FormData();
    formDataFile.append("resume", resumeFile);

    const responseFile = await fetch(`http://localhost:3000/api/uploadFiles`, {
      method: "POST",
      body: formDataFile,
    });

    if (responseInfo.ok && responseFile.ok) {
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
              onBlur={validateForm}
              required
            />
            {errors.firstName && (
              <p className={styles.error}>{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={validateForm}
              required
            />
            {errors.lastName && (
              <p className={styles.error}>{errors.lastName}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={validateForm}
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
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
              onBlur={validateForm}
              required
            />
            {errors.websiteUrl && (
              <p className={styles.error}>{errors.websiteUrl}</p>
            )}
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
            {visaTypes.map((visaType) => (
              <label className={styles.visaType} key={visaType}>
                <input
                  type="radio"
                  name="visaType"
                  value={visaType}
                  onChange={handleChange}
                />
                <span>{visaType}</span>
              </label>
            ))}
            {errors.visaType && (
              <p className={styles.error}>{errors.visaType}</p>
            )}
          </div>

          <div>
            <label htmlFor="resume">Please upload your resume:</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
            {errors.resume && <p className={styles.error}>{errors.resume}</p>}
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
            {errors.message && <p className={styles.error}>{errors.message}</p>}
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
