import React from 'react'; // Import React library
import './App.css'; // Import global CSS
import DrugInteractionForm from './components/DrugInteractionForm'; // Import the form component

function App() {
  return (
    <div className="App">
      {/* Application Header */}
      <header className="App-header">
        <h1>Drug Interaction Checker</h1>
        <p>Enter drug names to check for potential interactions.</p>
      </header>
      
      {/* Drug Interaction Form */}
      <main>
        <DrugInteractionForm />
      </main>
      
      {/* Footer Section */}
      <footer>
        <p>© 2024 Drug Interaction Checker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
