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

    let period = parseFloat(document.getElementById('period').value) || 1;

    let foodDiet = (parseFloat(document.getElementById('scope3_food_diet').value) * 2000) / period || 0;
    let foodPurchase = (parseFloat(document.getElementById('scope3_food_purchase').value) * 2000) / period || 0;
    let clothingPurchase = parseFloat(document.getElementById('scope3_clothing_purchase').value) || 0;
    let numberOfGarments = parseFloat(document.getElementById('number_of_garments').value) || 0;

    // Calculate clothing emissions based on the number of garments
    let clothingEmissions = clothingPurchase * numberOfGarments;

    // Calculate total emissions using current factors and scope 3 dropdown values
    let totalEmissions = (heating * currentFactors.heating) +
                         (cooking * currentFactors.cooking) +
                         (transportation * currentFactors.transportation) +
                         (electricity * currentFactors.electricity) +
                         foodDiet +
                         foodPurchase +
                         clothingEmissions;

    document.getElementById('total-emissions').innerText = totalEmissions.toFixed(2);

    // Determine the target emissions based on the selected period
    let targetEmissions;
    switch (period) {
        case 1:
            targetEmissions = 6000; // Year
            break;
        case 12:
            targetEmissions = 6000 / 12; // Month
            break;
        case 52:
            targetEmissions = 6000 / 52; // Week
            break;
        case 365:
            targetEmissions = 6000 / 365; // Day
            break;
        default:
            targetEmissions = 6000; // Default to year if something goes wrong
    }

    // Show different phrases and images based on the total emissions
    let messageElement = document.getElementById('emission-message');
    let imageElement = document.getElementById('emission-image');
    if (totalEmissions <= targetEmissions) {
        messageElement.innerText = "Great job! You're within the recommended emissions limit.";
        imageElement.src = "WhiteRiverSustainability/smallsteps/goodjob.jpg"; // Replace with actual image path
    } else if (totalEmissions <= targetEmissions * 1.5) {
        messageElement.innerText = "You're doing okay, but there's room for improvement.";
        imageElement.src = "WhiteRiverSustainability/smallsteps/soso.jpg"; // Replace with actual image path
    } else {
        messageElement.innerText = "Your emissions are too high. Consider making lifestyle changes.";
        imageElement.src = "WhiteRiverSustainability/smallsteps/notgood.jpg"; // Replace with actual image path
    }
}
