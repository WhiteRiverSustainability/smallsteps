let display = document.getElementById('display');

function appendNumber(number) {
    display.value += number;
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

function clearDisplay() {
    display.value = "";
}
