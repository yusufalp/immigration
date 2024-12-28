import Image from "next/image";
import LeadsTable from "./components/LeadsTable/LeadsTable";
import styles from "./page.module.css";

async function isAuthenticated() {
  console.log(localStorage.getItem("authToken"));
  return localStorage.getItem("authToken");
}

async function fetchLeads() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/leads`);
    if (!response.ok) {
      throw new Error("Failed to fetch leads");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leads:", error);
  }
}

export default async function LeadsPage() {
  if (!isAuthenticated()) {
    return <p>You must be logged in to view this page.</p>;
  }

  let leads = await fetchLeads();
  console.log("leads :>> ", leads);

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
          <h2>Sidebar</h2>
          <ul>
            <div>
              <li>Leads</li>
              <li>Settings</li>
            </div>
            <div>
              <li>Admin</li>
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
