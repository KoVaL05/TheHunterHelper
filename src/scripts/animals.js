document.addEventListener("DOMContentLoaded", function() {
    function generateDivs(animalData){
        var animals = document.getElementById('animals');

        animalData.forEach(function(data){
            var animal = document.createElement('div');
            animal.className = 'animal';

            var infoElement = document.createElement('div')
            infoElement.className = 'animal-info'

            var img = document.createElement('img');

            var dataInfoname = document.createElement('div');
            dataInfoname.className = 'data-info';
            var labelname = document.createElement('div');
            labelname.textContent = 'Name'
            labelname.className = 'label'
            var name = document.createElement('div');
            name.textContent = data.name;
            dataInfoname.appendChild(labelname);
            dataInfoname.appendChild(name);
            var dataInfoclass = document.createElement('div');
            dataInfoclass.className = 'data-info';
            var labelclass = document.createElement('div');
            labelclass.textContent = 'Class'
            labelclass.className = 'label'
            var animal_class = document.createElement('div');
            animal_class.textContent = data.class;
            dataInfoclass.appendChild(labelclass);
            dataInfoclass.appendChild(animal_class);
            
            infoElement.appendChild(dataInfoname);
            infoElement.appendChild(dataInfoclass);
            animal.appendChild(infoElement);
            animals.appendChild(animal);
        });
    };

    fetch('../json/animals.json')
        .then(response => response.json())
        .then(data => generateDivs(data))
        .catch(error => console.error('Error loading JSON:', error));
});