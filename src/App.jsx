import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    value: 5,
    selfConcept: 5,
    accomplishments: 5,
    gratitude: 5,
    hedonicAdaptation: 5,
    expectedOutcome: 10,
    reality: 5
  });

  const calculateHappiness = () => {
    const { value, selfConcept, accomplishments, gratitude, hedonicAdaptation, expectedOutcome, reality } = inputs;
    const happiness = value * selfConcept * accomplishments * (1 + gratitude / Math.abs(hedonicAdaptation) - gratitude / (expectedOutcome - reality));
    return isNaN(happiness) ? 0 : happiness.toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: isNaN(numValue) ? 0 : Math.min(Math.max(numValue, 1), 10)
    }));
  };

  const getSuggestions = () => {
    const suggestions = [];
    if (inputs.value < 7) suggestions.push("Focus on aligning your actions with your personal values.");
    if (inputs.selfConcept < 7) suggestions.push("Work on improving your self-esteem and self-image.");
    if (inputs.accomplishments < 7) suggestions.push("Set and achieve small goals to boost your sense of accomplishment.");
    if (inputs.gratitude < 7) suggestions.push("Practice daily gratitude by noting things you're thankful for.");
    if (inputs.hedonicAdaptation > 3) suggestions.push("Try new experiences to counteract hedonic adaptation.");
    if (inputs.expectedOutcome - inputs.reality > 3) suggestions.push("Adjust your expectations to be more in line with reality.");
    return suggestions;
  };

  return (
    <div className="App">
      <h1>Happiness Calculator</h1>
      <div className="input-group">
        {Object.entries(inputs).map(([key, value]) => (
          <label key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} (1-10):
            <input
              type="number"
              name={key}
              min="1"
              max="10"
              value={value}
              onChange={handleInputChange}
            />
          </label>
        ))}
      </div>
      <div className="result">
        <h2>Your Happiness Score: {calculateHappiness()}</h2>
      </div>
      <div className="suggestions">
        <h3>Suggestions to Improve Happiness:</h3>
        <ul>
          {getSuggestions().map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;