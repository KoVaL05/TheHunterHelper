document.addEventListener("DOMContentLoaded", function(){
    function generateDivs(weaponsData) {
        var weapons = document.getElementById("weapons");

        weaponsData.forEach(function(data) {
            var weapon = document.createElement("div");
            weapon.className = "weapon";
            
            var image = document.createElement("img");
            var imgName = data.name.replaceAll(/[\s.,-,/]/g, '');
            imgName = imgName.replaceAll('-', '');
            image.src = `../GUI/img/weapons/${imgName}.webp`;
            weapon.appendChild(image);

            var info = document.createElement("div");
            info.className = "info";

            draw_weight = data.draw_weight;
            if(draw_weight == 0){
                draw_weight = 'Only for Bow'
            }

            var elements = [
                {label: "Name", value: data.name},
                {label: "Class", value: data.weapon_class},
                {label: "Accuracy", value: data.accuracy},
                {label: "Recoil", value: data.recoil},
                {label: "Reload", value: data.reload_speed},
                {label: "Hipshot", value: data.hip_shot},
                {label: "Draw Weight", value: draw_weight},
                {label: "Magazine", value: data.magazine},
                {label: "Type", value: data.type},
                {label: "Caliber", value: data.caliber}
            ];

            elements.forEach(function(element){
                var infoElement = document.createElement("div");
                infoElement.className = "info-text";

                var label = document.createElement("div");
                label.textContent = element.label;
                label.className = "label";
                infoElement.appendChild(label);

                var value = createInfoElement(element.label, element.value);
                infoElement.appendChild(value);

                info.appendChild(infoElement);
            });

            weapon.appendChild(info);

            weapons.appendChild(weapon);
        });

        var caliberElements = document.getElementsByClassName('Caliber');
        for (var i = 0; i < caliberElements.length; i++) {
            (function(index) {
                var childLinks = caliberElements[index].getElementsByTagName('a');
                for (var j = 0; j < childLinks.length; j++) {
                    childLinks[j].addEventListener('click', function() {
                        var dataToSend = this.textContent.trim();
                        console.log(dataToSend);
                        window.ipcRenderer.send('open-ammo-window', dataToSend);
                    });
                }
            })(i);
        }       
    }

    function createInfoElement(label, value){
        if(label != 'Caliber'){
            var elem = document.createElement("div");
            elem.className = label.replaceAll(' ', '-') + " json";
            elem.textContent = value;
            return elem;
        };
        value = value.split(',');
        var elem = document.createElement("div");
        elem.className = label.replaceAll(' ', '-') + " json";
        value.forEach(function(ammo){
            var link = document.createElement("a");
            link.textContent = ` ${ammo}`;
            link.href = `#${ammo}`
            link.style.marginRight = '5px'
            elem.appendChild(link);
        });
        return elem;
    }

    bweapons.style.background = '#ff9900';

    fetch('../json/weapons.json')
        .then(response => response.json())
        .then(data => generateDivs(data))
        .catch(error => console.error('Error loading JSON:', error));
});