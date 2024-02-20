// Global variables
const amountInput = document.getElementById("amountInput");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");   

// Buttons
const convertAmountButton = document.getElementById("convertAmount");
const resetButton = document.getElementById("resetButton");

document.addEventListener('DOMContentLoaded', () => {

        amountInput.value = "";
        fromCurrency.value = "";
        toCurrency.value = "";
    convertAmountButton.addEventListener('click', (e) => {
        e.preventDefault();

        const input = amountInput.value;
        const currentValue = fromCurrency.value;
        const request = toCurrency.value;

        convertAmount(input, currentValue, request);
    });

    resetButton.addEventListener('click', () => {
        amountInput.value = "";
        fromCurrency.value = "";
        toCurrency.value = "";
    });
});

// Function to convert amount
function convertAmount(amount, currentValue, requestedValue) {
  
    // API 
    const API_Key = "13999783a22295f50d41304b";
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_Key}/latest/USD`;

    fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }
        return response.json();
    })
    .then(data =>  {
        console.log(data);

        let value;
        const amt = data.conversion_rates[currentValue];
            console.log(amt);
        const req = data.conversion_rates[requestedValue];
            console.log(req);

        if (amt < req) {
            value = amount * (req / amt).toFixed(2);
            console.log(value);
        }
        else {
            value = amount * (amt / req).toFixed(2);
            console.log(value);
        }
        console.log(`Entered amount: ${amount} ${currentValue} `);
        console.log(`Entered amount ${requestedValue} value: ${value}`)


        document.getElementById("result").innerHTML = value;
    });

    
}