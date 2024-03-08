import {filter_weapons, filter_animals} from './filter.js';

let animalNumbers;
let selectedNumbers = [];

function colorNumbers(start, end) {
    for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
        const numberToColor = document.querySelector(`.animal-number:nth-child(${i})`);
        if (numberToColor) {
            numberToColor.style.backgroundColor = "#ff9900";
            selectedNumbers.push(numberToColor);
        }
    }
}

export function restart(){
    console.log('działa');
    animalNumbers = [];
    selectedNumbers = [];
    colorNumbers(1, 9);
};

document.addEventListener("DOMContentLoaded", function(){
    animalNumbers = document.querySelectorAll(".animal-number");

    colorNumbers(1, animalNumbers.length);

    animalNumbers.forEach(function(number){
        number.addEventListener("click", function() {
            const selectedNumber = parseInt(number.textContent);

            if (selectedNumbers.length == 0) {
                number.style.backgroundColor = "#ff9900";
                selectedNumbers.push(number);
            } else if (selectedNumbers.length == 1) {
                const start = parseInt(selectedNumbers[0].textContent);
                const end = selectedNumber;
                if(bweapons.style.backgroundColor == ''){
                    filter_animals([start, end]);
                }else if(banimals.style.backgroundColor == ''){
                    filter_weapons([start, end]);
                }
                colorNumbers(start, end);
            } else {
                selectedNumbers.forEach(num => {
                    num.style.backgroundColor = "";
                });
                selectedNumbers = [];
                number.style.backgroundColor = "#ff9900";
                selectedNumbers.push(number);
            };
        });
    });
});