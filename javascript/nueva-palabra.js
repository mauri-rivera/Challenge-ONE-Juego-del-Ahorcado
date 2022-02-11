var botonAgregarNuevaPalabra = document.querySelector("#nueva-palabra");
var nuevaPalabra = document.querySelector("#nuevaPalabra");

var acumuladorPalabra = "";  //Variable que concatena carácteres para formar una palabra
var palabraValidada;  // Variable que valida la nueva palabra del campo de texto "nuevaPalabra"
var palabraNueva;  // Variable que obtiene la nueva palabra del campo de texto "nuevaPalabra"

// Función que captura el evento se escribe una nueva palabra en el campo de texto
nuevaPalabra.addEventListener("keydown", function(event){
    event.preventDefault();
    
    if(event.which == 8){
        acumuladorPalabra = "";
        this.value = "";
    }
    else{
        palabraNueva = String.fromCharCode(event.which);   
        palabraValidada = validarNuevaPalabra(palabraNueva);  
        if(palabraValidada != undefined){
            acumuladorPalabra = acumuladorPalabra + palabraValidada;
            this.value = acumuladorPalabra;
        }
    }   
});

// Función que permite agregar una nueva palabra al juego del Ahorcado
botonAgregarNuevaPalabra.addEventListener("click", function(event){
    event.preventDefault();

    var nuevoTexto = capturarNuevaPalabra();  // Variable que obtiene la palabra del campo de texto "nuevaPalabra"

    if(nuevoTexto.length < 3 || nuevoTexto.length > 10){
        agregarTexto("Texto no Válido");
    }
    else{
        agregarNuevaPalabra(nuevoTexto);
        acumuladorPalabra = "";
        nuevaPalabra.value = "";
    }
});

// Función que valida solo letras mayúsculas al presionar una tecla 
function validarNuevaPalabra(nuevaPalabra){
    if(nuevaPalabra.match(caracterExpresionRegular) != null){  
        return nuevaPalabra;
    }
}

// Función encargada de obtener el contenido del campo de texto "nuevaPalabra"
function capturarNuevaPalabra(){
    var divTexto = document.querySelector("#nuevo-texto");
    var campoTexto = divTexto.nuevaPalabra.value;  // Variable encargada que contener la información desde el campo de texto "nuevaPalabra"
    
    return campoTexto;
}

// Función que agrega una nueva palabra al selecto grupo de palabras que son elegidos al azar para el juego del Ahorcado
function agregarNuevaPalabra(palabraTexto){
    arregloPalabras.push(palabraTexto);
    nuevaPalabra.value = "";
}

// Función encargado de mostrar una palabra desde un campo de texto  
function agregarTexto(nuevoTexto){
    nuevaPalabra.value = nuevoTexto;   // Muestra la frase por pantalla desde el campo de texto "nuevaPalabra"
    nuevaPalabra.focus();
}
