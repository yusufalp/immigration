"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import LeadsTable from "./components/LeadsTable/LeadsTable";
import styles from "./page.module.css";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    } else {
      fetchLeads();
    }
  }, [router]);

  async function fetchLeads() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/leads`);
      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }
      const data = await response.json();

      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <Image
          className={styles.logo}
          src="/alma-logo.jpeg"
          alt="alma logo"
          width={200}
          height={100}
          priority
        />
        <div className={styles.sidebarContent}>
          <ul>
            <div>
              <li>Leads</li>
              <li>Settings</li>
            </div>
            <div>
              <li>Admin</li>
              <li onClick={handleLogout}>Logout</li>
            </div>
          </ul>
        </div>
      </aside>
      <div className={styles.main}>
        <h1>Leads</h1>
        {leads.length === 0 ? (
          <p>There are no leads</p>
        ) : (
          <LeadsTable leads={leads} />
        )}
      </div>
    </div>
  );
}
