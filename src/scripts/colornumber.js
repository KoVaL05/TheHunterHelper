document.addEventListener("DOMContentLoaded", function() {
    const animalNumbers = document.querySelectorAll(".animal-number");
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

    colorNumbers(1, animalNumbers.length);

    animalNumbers.forEach(function(number) {
        number.addEventListener("click", function() {
            const selectedNumber = parseInt(number.textContent);

            if (selectedNumbers.length === 0) {
                number.style.backgroundColor = "#ff9900";
                selectedNumbers.push(number);
            } else if (selectedNumbers.length === 1) {
                const start = parseInt(selectedNumbers[0].textContent);
                const end = selectedNumber;
                colorNumbers(start, end);
            } else {
                selectedNumbers.forEach(num => {
                    num.style.backgroundColor = "";
                });
                selectedNumbers = [];
                number.style.backgroundColor = "#ff9900";
                selectedNumbers.push(number);
            }
        });
    });
});
