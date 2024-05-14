function updateEmissionFactors() {
    // Example function to handle region selection changes
    let region = document.getElementById('region').value;
    console.log("Region selected:", region);
    // Update emission factors based on region
}

function calculateEmissions() {
    let heating = parseFloat(document.getElementById('heating').value) || 0;
    let cooking = parseFloat(document.getElementById('cooking').value) || 0;
    let transportation = parseFloat(document.getElementById('transportation').value) || 0;
    let electricity = parseFloat(document.getElementById('electricity').value) || 0;
    let goods = parseFloat(document.getElementById('goods').value) || 0;

    // Example calculation, adjust based on actual emission factors
    let totalEmissions = heating + cooking + transportation + electricity + goods;
    document.getElementById('total-emissions').innerText = totalEmissions.toFixed(2);
}
