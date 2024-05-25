// Initial emission factors by region
const emissionFactors = {
    "default": { // Default could be the most common or average factors
        heating: 11.7,  // lbs CO2 per therm for natural gas
        transportation: 19.59,  // lbs CO2 per gallon for gasoline
        electricity: 0.823  // lbs CO2 per kWh for electricity
    },
};

// Current emission factors being used, defaulting to 'default'
let currentFactors = emissionFactors['default'];

function calculateEmissions() {
    let heating = parseFloat(document.getElementById('heating').value) || 0;
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
        imageElement.src = "https://github.com/WhiteRiverSustainability/smallsteps/blob/main/goodjob.jpg?raw=true"; // Replace with actual image path
    } else if (totalEmissions <= targetEmissions * 1.5) {
        messageElement.innerText = "You're doing okay, but there's room for improvement.";
        imageElement.src = "https://github.com/WhiteRiverSustainability/smallsteps/blob/main/soso.jpg?raw=true"; // Replace with actual image path
    } else {
        messageElement.innerText = "Your emissions are too high. Consider making lifestyle changes.";
        imageElement.src = "https://github.com/WhiteRiverSustainability/smallsteps/blob/main/notgood.jpg?raw=true"; // Replace with actual image path
    }

    // Remove the hidden class to display the results and the accordion
    document.getElementById('dynamic-results').classList.remove('hidden');
    document.getElementById('accordion-container').classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function() {
    var acc = document.getElementsByClassName("accordion");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});
