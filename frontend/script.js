async function checkInteraction() {
    const firstDrug = document.getElementById('firstDrug').value;
    const secondDrug = document.getElementById('secondDrug').value;

    try {
        const response = await fetch(`/api/drugInteractions/check?firstDrug=${firstDrug}&secondDrug=${secondDrug}`);
        const data = await response.json();
        displayResult(data.message);
    } catch (error) {
        displayResult("Error fetching interaction data.");
    }
}

function displayResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.style.color = "red"; // Adjust styling as needed
}
