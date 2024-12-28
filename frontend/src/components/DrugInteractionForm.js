import React, { useState } from "react";
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5002',
  headers: {
    'Content-Type': 'application/json'
  }
});

function DrugInteractionForm() {
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [interaction, setInteraction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInteraction(null);
    setLoading(true);

    try {
      const response = await api.post("/check-interaction", { 
        drug_1: drug1,
        drug_2: drug2
      });

      if (response.data) {
        setInteraction(response.data);
      } else {
        setError('No interaction data found for these drugs');
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.response?.data?.error || 
        "Failed to fetch drug interactions. Please check if the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Drug Interaction Checker
      </h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="drug1" style={{ display: 'block', marginBottom: '5px' }}>
            First Drug:
          </label>
          <input
            type="text"
            id="drug1"
            value={drug1}
            onChange={(e) => setDrug1(e.target.value)}
            required
            style={{
              width: '300px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="drug2" style={{ display: 'block', marginBottom: '5px' }}>
            Second Drug:
          </label>
          <input
            type="text"
            id="drug2"
            value={drug2}
            onChange={(e) => setDrug2(e.target.value)}
            required
            style={{
              width: '300px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Checking...' : 'Check Interaction'}
        </button>
      </form>

      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {interaction && (
        <div style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          marginTop: '20px'
        }}>
          <h2 style={{ marginBottom: '15px', color: '#333' }}>Interaction Details</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#444', fontSize: '1.1em', marginBottom: '5px' }}>Drugs</h3>
            <p><strong>Drug 1:</strong> {interaction.drug_1}</p>
            <p><strong>Drug 2:</strong> {interaction.drug_2}</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#444', fontSize: '1.1em', marginBottom: '5px' }}>Interaction</h3>
            <p>{interaction.interaction}</p>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#444', fontSize: '1.1em', marginBottom: '5px' }}>Mechanism</h3>
            <p>{interaction.mechanism}</p>
          </div>

          <div style={{ 
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: interaction.severity === 'High' ? '#ffebee' : 
                           interaction.severity === 'Moderate' ? '#fff3e0' : '#e8f5e9',
            borderRadius: '4px'
          }}>
            <h3 style={{ color: '#444', fontSize: '1.1em', marginBottom: '5px' }}>Severity</h3>
            <p><strong>{interaction.severity}</strong></p>
          </div>

          <div style={{ 
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#e3f2fd',
            borderRadius: '4px'
          }}>
            <h3 style={{ color: '#444', fontSize: '1.1em', marginBottom: '5px' }}>Recommendations</h3>
            <p>{interaction.recommendations}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DrugInteractionForm;
