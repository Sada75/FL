"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSelection = (role: string) => {
    if (role === "doctor") {
      router.push("/rigister-doctor"); // Redirect to doctor page
    } else if (role === "patient") {
      router.push("/get-diagnosis"); // Redirect to patient page
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Welcome!</h1>
        <p>Are you a Doctor or a Patient?</p>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => handleSelection("doctor")}
            style={{
              padding: "10px 20px",
              margin: "10px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Doctor
          </button>
          <button
            onClick={() => handleSelection("patient")}
            style={{
              padding: "10px 20px",
              margin: "10px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Patient
          </button>
        </div>
      </div>
    </div>
  );
}
