document.addEventListener("DOMContentLoaded", function(){
    function generateDivs(ammoData) {
        var container = document.getElementById("ammunition-container");

        ammoData.forEach(function(data) {
            var ammo = document.createElement("div");
            ammo.className = "ammunition";
            
            var image = document.createElement("img");
            var imgName = `${data.caliber}${data.type}`.replaceAll(/[\s.,-,_,/]/g, '');
            imgName = imgName.replaceAll('-', '');
            image.src = `../GUI/img/ammunition/${imgName}.webp`;
            ammo.appendChild(image);

            var info = document.createElement("div");
            info.className = "info";

            caliber = data.caliber
            if(caliber == 'traditional_arrow'){
                caliber = 'traditional_arr'
            }

            var elements = [
                {label: "Caliber", value: caliber},
                {label: "Type", value: data.type},
                {label: "Class", value: data.ammunition_class},
                {label: "Range", value: data.ammunition_range},
                {label: "Pen", value: data.penetration},
                {label: "Exp", value: data.expansion},
                {label: "Weight", value: data.weight},
                {label: "Price", value: data.price}
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

            ammo.appendChild(info);

            container.appendChild(ammo);
        });

        var caliberElements = document.getElementsByClassName('Caliber');
        for (var i = 0; i < caliberElements.length; i++) {
            (function(index) {
                caliberElements[index].addEventListener('click', function(){
                    var dataToSend = caliberElements[index].textContent;
                    window.ipcRenderer.send('open-ammo-window', dataToSend);
                });
            })(i);
        }           
    }

    function createInfoElement(label, value){
        var elem = document.createElement("div");
        elem.className = label.replaceAll(' ', '-') + " json";
        elem.textContent = value;
        return elem;
    }

    generateDivs(window.api.getCaliber())
});