import { useEffect, useState } from "react";
import VantaHalo from "./VantaHalo";

export default function App() {
  const [team, setTeam] = useState("");
  const [persona, setPersona] = useState(null);

  const personas = [
    {
      name: "Rural Self-Help Group Member",
      description: `
        * Persona: Meera, 38, is part of a women-led self-help group in a rural area.
        The group applies for government and NGO funds, but approvals are slow and often biased.
        Members do not know where their applications are stuck.
        * Constraint: Limited internet access and low digital literacy.
        * Round 1 Task: Identify where trust breaks, who controls decisions,
        and what Meera needs to trust a digital system.
      `,
    },
    {
      name: "College Student Seeking Scholarships",
      description: `
        * Persona: Aisha, 19, applies for multiple scholarships every year.
        She rarely receives clear rejection reasons and has no visibility into criteria.
        Many deserving students feel the process is unfair.
        * Constraint: Fake or duplicate applications.<br/>
        * Round 1 Task: Identify why students lose trust and what fair selection means.<br/>
      `,
    },
    {
      name: "Woman Entrepreneur Applying for Micro-Loans",
      description: `
        * Persona: Lakshmi, 32, runs a small tailoring business.
        Loan approvals depend on personal connections.
        Terms change unpredictably.
        * Constraint: Financial literacy & intermediaries.<br/>
        * Round 1 Task: Identify where bias enters and what should be immutable.<br/>
      `,
    },
    {
      name: "Factory Worker Reporting Workplace Issues",
      description: `
        * Persona: Rekha, 28, wants to report workplace harassment.<br/>
        She fears retaliation and distrusts internal systems.<br/>
        * Constraint: Privacy & safety.<br/>
        * Round 1 Task: Identify anonymity needs and access control.<br/>
      `,
    },
    {
      name: "Homemaker Accessing Welfare Benefits",
      description: `
        * Persona: Savitri, 45, applies for welfare benefits.<br/>
        Depends on middlemen for updates.<br/>
        * Constraint: Exploitation risk.<br/>
        * Round 1 Task: Identify how transparency reduces manipulation.<br/>
      `,
    },
  ];

  const revealPersona = () => {
    if (!team) {
      alert("Please enter your team number");
      return;
    }

    const index = team % personas.length;
    const selected = personas[index];

    localStorage.setItem(
      "persona_" + team,
      JSON.stringify(selected)
    );

    setPersona(selected);
  };

  // Restore persona if already revealed
  useEffect(() => {
    if (!team) return;

    const saved = localStorage.getItem("persona_" + team);
    if (saved) {
      setPersona(JSON.parse(saved));
    }
  }, [team]);

  return (
    <>
      <VantaHalo />

      <div style={styles.overlay}>
        <div style={styles.glass}>
          <h1>🎭 Reveal Your Persona</h1>
          <p>Enter your team number and tap reveal</p>

          <input
            type="number"
            placeholder="Team Number"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            style={styles.input}
          />

          <br />

          <button onClick={revealPersona} style={styles.button}>
            Reveal Persona
          </button>

          {persona && (
            <div style={styles.card}>
              <h2>Your Persona</h2>
              <h1>{persona.name}</h1>
              <p dangerouslySetInnerHTML={{ __html: persona.description }} />
              <p>Screenshot this and proceed</p>
            </div>
          )}
        </div>
      </div>
    </>

  );
}

const styles = {
  /* Full screen overlay */
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  /* GLASS MORPH CARD */
  glass: {
    width: "85vw",
    maxWidth: "700px",
    maxHeight: "90vh",
    padding: "2.5vh 2vw",
    textAlign: "center",

    background: "rgba(15, 23, 42, 0.45)",   // glass tint
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",

    borderRadius: "18px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",

    color: "white",
    overflow: "auto",
    scrollbarWidth: "none",
  },

  input: {
    padding: "1vh 1.2vw",
    fontSize: "2.2vh",
    margin: "1vh 0",
    borderRadius: "10px",
    border: "none",
    textAlign: "center",
    width: "220px",
  },

  button: {
    padding: "1vh 2vw",
    fontSize: "2.4vh",
    background: "#38bdf8",
    color: "#020617",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    marginBottom: "2vh",
  },

  card: {
    marginTop: "2vw",
    margin:"2%",
    padding: "3vh 2vw",
    background: "rgba(30, 41, 59, 0.75)",
    borderRadius: "14px",

    width: "86%",
    maxWidth: "90%",
    
    textAlign: "left",
  }

};

``
