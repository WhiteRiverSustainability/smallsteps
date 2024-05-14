// Initial emission factors by region
const emissionFactors = {
    "default": { // Default could be the most common or average factors
        heating: 0.408,  // lbs CO2 per kWh for natural gas
        cooking: 12.65,  // lbs CO2 per gallon for propane
        transportation: 19.59,  // lbs CO2 per gallon for gasoline
        electricity: 0.823  // lbs CO2 per kWh for electricity
    },
    "us": {
        heating: 0.408,
        cooking: 12.65,
        transportation: 19.59,
        electricity: 0.823
    },
    "eu": {
        heating: 0.34,
        cooking: 11.89,
        transportation: 18.95,
        electricity: 0.56
    },
    "ca": {
        heating: 0.42,
        cooking: 13.01,
        transportation: 20.21,
        electricity: 0.85
    }
};

// Current emission factors being used, defaulting to 'default'
let currentFactors = emissionFactors['default'];

function updateEmissionFactors() {
    let region = document.getElementById('region').value;
    console.log("Region selected:", region);

    // Update current emission factors based on the selected region
    if (emissionFactors[region]) {
        currentFactors = emissionFactors[region];
    } else {
        currentFactors = emissionFactors['default']; // Fallback to default if region is unknown
    }
}

function calculateEmissions() {
    let heating = parseFloat(document.getElementById('heating').value) || 0;
    let cooking = parseFloat(document.getElementById('cooking').value) || 0;
    let transportation = parseFloat(document.getElementById('transportation').value) || 0;
    let electricity = parseFloat(document.getElementById('electricity').value) || 0;

    // Calculate emissions using current factors
    let totalEmissions = (heating * currentFactors.heating) +
                         (cooking * currentFactors.cooking) +
                         (transportation * currentFactors.transportation) +
                         (electricity * currentFactors.electricity);

    document.getElementById('total-emissions').innerText = totalEmissions.toFixed(2);
}
