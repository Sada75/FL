"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSelection = (role: string) => {
    if (role === "doctor") {
      router.push("/register-doctor");
    } else if (role === "patient") {
      router.push("/get-diagnosis");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen px-72"
      style={{
        backgroundImage: 'url("/bg-patient.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      background: "transparent",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ 
        textAlign: "center",
        backgroundColor: "white",
        padding: "3rem 4rem",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "500px",
        transition: "transform 0.2s ease-in-out"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          color: "#2c3e50",
          marginBottom: "1.5rem",
          fontWeight: "600",
          letterSpacing: "0.5px"
        }}>Welcome!</h1>
        <p style={{
          fontSize: "1.2rem",
          color: "#546e7a",
          marginBottom: "2rem",
          lineHeight: "1.6"
        }}>Are you a Doctor or a Patient?</p>
        <div style={{ 
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          // "@media (min-width: 640px)": {
          //   flexDirection: "row",
          //   justifyContent: "center",
          //   gap: "2rem"
          // }
        }}>
          <button
            onClick={() => handleSelection("doctor")}
            style={{
              padding: "12px 30px",
              fontSize: "1.1rem",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "500",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(76, 175, 80, 0.2)",
              // ":hover": {
              //   backgroundColor: "#45a049",
              //   transform: "translateY(-2px)",
              //   boxShadow: "0 6px 12px rgba(76, 175, 80, 0.3)"
              // }
            }}
          >
            Doctor
          </button>
          <button
            onClick={() => handleSelection("patient")}
            style={{
              padding: "12px 30px",
              fontSize: "1.1rem",
              cursor: "pointer",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "500",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 6px rgba(33, 150, 243, 0.2)",
              // ":hover": {
              //   backgroundColor: "#1e88e5",
              //   transform: "translateY(-2px)",
              //   boxShadow: "0 6px 12px rgba(33, 150, 243, 0.3)"
              // }
            }}
          >
            Patient
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}