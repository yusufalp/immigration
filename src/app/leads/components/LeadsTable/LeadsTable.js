"use client";

import { useState } from "react";
import styles from "../../page.module.css";
import Image from "next/image";

export default function LeadsTable({ leads }) {
  const [sortedLeads, setSortedLeads] = useState(leads);
  const [sortDirection, setSortDirection] = useState("asc"); // Track sort direction
  const [sortField, setSortField] = useState(null); // Track

  const handleSort = (field) => {
    let newSortDirection = "asc";

    // Toggle sort direction if the same field is clicked
    if (sortField === field) {
      newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    }

    const sorted = [...sortedLeads].sort((a, b) => {
      if (a[field] < b[field]) return sortDirection === "asc" ? -1 : 1;
      if (a[field] > b[field]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setSortedLeads(sorted);
    setSortField(field); // Update the field being sorted
    setSortDirection(newSortDirection); // Update the sort direction
  };

  const getArrowDirection = (field) => {
    if (field !== sortField) return "down"; // Default to down if not the active sort field
    return sortDirection === "asc" ? "up" : "down";
  };

  const handleStateChange = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/leads`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: "REACHED_OUT" }),
      });

      if (response.ok) {
        alert(`Lead ${id} marked as "REACHED_OUT"`);

        setSortedLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === id ? { ...lead, status: "REACHED_OUT" } : lead
          )
        );
      } else {
        alert("Failed to update lead status.");
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
      alert("An error occurred.");
    }
  };

  return (
    <>
      <div className={styles.search}>
        <input type="search" name="search" placeholder="Search" />
        <select defaultValue="default">
          <option value="default" disabled>
            Status
          </option>
          <option value="pending">Pending</option>
          <option value="reached">Reached Out</option>
        </select>
      </div>
      <div>
        <table border="1" className={styles.leadsTable}>
          <thead>
            <tr>
              <th>
                Name{" "}
                <button onClick={() => handleSort("fullName")}>
                  <Image
                    src={`/${getArrowDirection("fullName")}-arrow.svg`}
                    alt="down arrow icon"
                    width={16}
                    height={16}
                    priority
                  />
                </button>
              </th>
              <th>
                Submitted{" "}
                <button onClick={() => handleSort("submittedDate")}>
                  {" "}
                  <Image
                    src={`/${getArrowDirection("submittedDate")}-arrow.svg`}
                    alt="down arrow icon"
                    width={16}
                    height={16}
                    priority
                  />
                </button>
              </th>
              <th>
                Status{" "}
                <button onClick={() => handleSort("status")}>
                  {" "}
                  <Image
                    src={`/${getArrowDirection("status")}-arrow.svg`}
                    alt="down arrow icon"
                    width={16}
                    height={16}
                    priority
                  />
                </button>
              </th>
              <th>
                Country{" "}
                <button onClick={() => handleSort("citizenship")}>
                  {" "}
                  <Image
                    src={`/${getArrowDirection("citizenship")}-arrow.svg`}
                    alt="down arrow icon"
                    width={16}
                    height={16}
                    priority
                  />
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.fullName}</td>
                <td>{`${new Date(
                  lead.submittedDate
                ).toLocaleDateString()}, ${new Date(
                  lead.submittedDate
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}</td>
                <td>{lead.status}</td>
                <td>{lead.citizenship}</td>
                <td className={styles.ctas}>
                  {lead.status === "PENDING" && (
                    <button
                      onClick={() => handleStateChange(lead.id)}
                      className={styles.button}
                    >
                      Reached Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
