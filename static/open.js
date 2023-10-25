// const { exec } = require('child_process');

// // Comando para ejecutar el archivo Python
// const comandoPython = 'abrir_archivos.py'; // Reemplaza 'mi_script.py' con el nombre de tu archivo Python

// // Ejecuta el comando
// exec(comandoPython, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error al ejecutar el comando: ${error}`);
//         return;
//     }
//     console.log(`Salida estándar: ${stdout}`);
//     console.error(`Salida de error: ${stderr}`);
// });

var hipervinculos = document.querySelectorAll('.abrir-explorador');
        hipervinculos.forEach(function(hipervinculo) {
            hipervinculo.addEventListener('click', function(event) {
                event.preventDefault();
                var index = hipervinculo.getAttribute('data-index');
                abrirExplorador(index); 
            });
});
       
        // Función para abrir el explorador de archivos en Python
function abrirExplorador(index) {
            // Envía el índice al servidor Python utilizando una solicitud AJAX
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/abrir-explorador/' + index, true);
            xhr.send();
}


 // Agrega un evento de clic a los hipervínculos
 // Datos de tu archivo JSON (asegúrate de cargarlos previamente)

 const mapa = document.getElementById('mapa');
 var map = L.map(mapa).setView([7.12728, -73.11920], 13);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 


var allMarkers = []; // Store all markers in an array
var citySelect = document.getElementById("citySelect");

const showAllMarkers = () => {
    allMarkers.forEach(function (marker) {
        map.addLayer(marker);
    });
};
const enlaceDescargar = document.createElement('a');
enlaceDescargar.textContent = 'Descarga la Nube de puntos';

const enlaceDescargarMosaico = document.createElement('a');
enlaceDescargarMosaico.textContent = 'Descarga el ORTOMOSAICO .kml'; 

const getData = () => { 
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/static/metadato.json", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datosParseados = JSON.parse(this.responseText);
            datosParseados.forEach((element) => {
                const myJsonLocal = JSON.stringify(element);
                localStorage.setItem(element.CODIGO, myJsonLocal);

                var option = document.createElement("option");
                option.value = element.CODIGO;
                option.text = element.NOMBRE_PROYECTO; 
                citySelect.appendChild(option);

                var marker = L.marker([element.Latitud, element.Longitud]).addTo(map);
                var popupContent = '<b>' + element.NOMBRE_PROYECTO + '</b><br>' + 'Fecha captura: ' + element.FECHA_CAPTURA;
                marker.bindPopup(popupContent);

                marker.on("popupopen", function () {
                    document.getElementById("codigo").textContent = element.CODIGO;
                    document.getElementById("municipio").textContent = element.MUNICIPIO;
                    document.getElementById("nombre").textContent = element.NOMBRE_PROYECTO;
                    document.getElementById("fecha").textContent = element.FECHA_CAPTURA;
                    document.getElementById("tecnologia").textContent = element.TECNOLOGIA;
                    document.getElementById("latitud").textContent = element.Latitud + "°";
                    document.getElementById("longitud").textContent = element.Longitud + "°";
                    document.getElementById("descripcion").textContent = element.DESCRIPCION;
                    document.getElementById("area").textContent = element.AREA_HAS;
                    document.getElementById("resolucion").textContent = element.RESOLUCION;


                    const servidor = element.RUTA_CARPETA_NUBE_PUNTOS; // Esta es la ruta de la carpeta en tu servidor
                    const archivo = element.NOMBRE_NUBE_PUNTOS; //"\\\\servidor\\carpetacompartida";
                    const LINK= `/descargar?carpeta=${servidor}&archivo=${archivo}`;//`${servidor}`;
                    console.log(" -html ", LINK)
                    enlaceDescargar.href = LINK;
                    enlaceDescargar.target = '_self';
                    const spans = document.getElementById("archivoMosaico");
                    spans.appendChild(enlaceDescargar);

                    const servidorMosaico =element.RUTA_HTML; 
                    const archivoKML = element.ARCHIVO_HTML;
                    const LINK_KML= `/descargar?carpeta=${servidorMosaico}&archivo=${archivoKML}`;
                    enlaceDescargarMosaico.href = LINK_KML;
                    enlaceDescargarMosaico.target = '_self';
                    const spansLaz =document.getElementById("archivoLaz");
                    spansLaz.appendChild(enlaceDescargarMosaico);
                });

                // Add each marker to the array
                allMarkers.push(marker);
            });
        }
    };
};

getData();


citySelect.addEventListener("change", function () {
    var selectedCity = citySelect.value; 
    console.log(selectedCity)
/*var indiceSeleccionado = citySelect.selectedIndex;
    var textoSeleccionado = citySelect.options[indiceSeleccionado].text;
    console.log(selectedCity, datosParseados, textoSeleccionado,marker);
    datosParseados.forEach(function (item) {
        if (item.TECNOLOGIA==  selectedCity) {
            console.log(item.NOMBRE_PROYECTO)
            // Muestra el marcador si la ciudad coincide con el filtro     
             map.addTo(marker); 

        } else {console.log(item.NOMBRE_PROYECTO)
            // Oculta el marcador si no coincide con el filtro    
            map.removeLayer(marker);
        }
    });*/
});