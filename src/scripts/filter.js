function inRange(number, min, max){
    return number >= min && number <= max;
};

export function filter_weapons(range){
    range.sort()

    var weapons = document.getElementsByClassName('weapon');

    Array.from(weapons).forEach(function(weapon){
        var classDiv = weapon.querySelector('.Class');
        var classRange = classDiv.textContent.split('-');

        classRange.forEach(function(number){
            weapon.style.visibility = 'visible';
            if(!inRange(number, range[0], range[1])){
                weapon.style.visibility = 'hidden';
            };
        });
    });
};

export function filter_animals(range){
    range.sort();

    var animals = document.getElementsByClassName('animal');

    Array.from(animals).forEach(function(animal){
        var classDiv = animal.querySelector('.class');
        var classRange = classDiv.textContent.split('-');

        classRange.forEach(function(number){
            animal.style.visibility = 'visible';
            if(!inRange(number, range[0], range[1])){
                animal.style.visibility = 'hidden';
            };
        });
    });
};