var botonIniciarJuego = document.querySelector("#iniciar-juego");
var cuadro = document.querySelector("#ahorcado");

var lapizAcuarela = cuadro.getContext('2d');
var palabraEscogida;    // Variable que representa la palabra secreta seleccionada al azar para ser descifrada
var nuevaPartida = 0;   // Variable que proporciona la coordenada X (letra + espacio) entre carácteres incorrectos
var coordenadasLineas = [];  // Variable que guarda las coordenadas X e Y a partir de los dibujos de líneas para agregar los carácteres correctos de la palabra secreta   

// Función que inicia el juego del Ahorcado
botonIniciarJuego.addEventListener("click", function(event){
    event.preventDefault();

    var detector = new MobileDetect(window.navigator.userAgent);
    
    if(detector.phone() != null || detector.mobile() != null || detector.tablet() != null || detector.os() != null || detector.userAgent() != null){        
        nuevoTituloArriba.classList.remove("main-rodapie2");
        nuevoTituloAbajo.classList.remove("main-rodapie2");
        inputMovil.classList.remove("text-input2");
        inputMovil.classList.add("text-input");
        nuevoTituloArriba.classList.add("main-rodapie");
        nuevoTituloAbajo.classList.add("main-rodapie");
        inputMovil.focus();  
        setInterval(prepararLetra, 200);                 
    }

    if(contadorLetrasCorrectas > 0 && coordenadasLineas.length > 0 && arregloCaracteresRepetitivos.length > 0){
        coordenadasLineas.splice(0, coordenadasLineas.length);   
        contadorLetrasCorrectas = 0;
        caracteresAcertados.splice(0, caracteresAcertados.length);
        arregloCaracteresRepetitivos.splice(0, arregloCaracteresRepetitivos.length);
    }

    if(contadorLetrasIncorrectas > 0){
        contadorLetrasIncorrectas = 0;
        caracteresErrados.splice(0, caracteresErrados.length);
        nuevaPartida = 0;
    }

    palabraEscogida = escogerPalabraSecreta();

    lapizAcuarela.fillStyle = 'yellow';
    lapizAcuarela.fillRect(0, 0, 1200, 800);

    dibujarLineasPalabra(lapizAcuarela, palabraEscogida);

    dibujarSoporte(lapizAcuarela);
});

// Función encargada de dibujar las líneas de carácteres con los espacios de la palabra seleccionada al azar 
function dibujarLineasPalabra(ctx, palabraObtenida){

    var espacio = 30;   // Variable inicial de la coordenada X que corresponde al espacio entre las líneas de carácteres
    var linea = 60;   // Variable inicial de la coordenada X que corresponde a la línea de carácteres
    // Variable que obtiene la cantidad de líneas de carácteres en proporción al punto de referencia de la cooordenada X para iniciar el dibujo de las líneas de carácteres
    var cantidadLineasIzquierda = Math.trunc(palabraObtenida.length / 2);
    var puntoReferenciaX = 800;  // Variable que representa el punto de referencia inicial de la coordenada X
    var puntoReferenciaY = 700;  // Variable que representa el punto de referencia inicial de la coordenada Y
    // Variable que representa la coordenada X inicial para dibujar las líneas de carácteres
    // Variable que inicia desde una coordenada X el dibujo de las líneas de carácteres en el caso que la cantidad de líneas es par
    // Variable que inicia desde una coordenada X el dibujo de las líneas de carácteres en el caso que la cantidad de líneas es impar
    // Variable que obtiene la distancia de las líneas y de los espacios en proporción a la cantidad de líneas de carácteres
    var distanciaIzquierdaX, coordenadaInicialParX, coordenadaInicialImparX, trazo;
    var puntoPartida = 0;   // Variable que guarda la coordenada X inicial para el 2° dibujo y las siguientes líneas de carácteres
    
    ctx.lineWidth = 10;
    
    trazo = coordinarLineasEspacios(linea, espacio, palabraObtenida.length);

    distanciaIzquierdaX = puntoReferenciaX - ((trazo.linea + trazo.espacio) * cantidadLineasIzquierda);

    if(palabraObtenida.length % 2 == 0){ 
        for(var cantidadPar = 0; cantidadPar < palabraObtenida.length; cantidadPar++){
            if(cantidadPar == 0){
                coordenadaInicialParX = distanciaIzquierdaX - (trazo.espacio / 2);
                trazarLinea(ctx, coordenadaInicialParX, puntoReferenciaY, trazo.linea);
                puntoPartida = puntoPartida + ((coordenadaInicialParX + trazo.linea) + trazo.espacio);
                coordenadasLineas.push({ x: coordenadaInicialParX + (trazo.linea / 4), y: puntoReferenciaY - 15});
            }
            else{
                coordenadasLineas.push({ x: puntoPartida + (trazo.linea / 4), y: puntoReferenciaY - 15});
                puntoPartida = recorrerLineasEspacios(ctx, puntoPartida, puntoReferenciaY, trazo.linea, trazo.espacio);
            }
        }
    }
    else{
        for(var cantidadImpar = 0; cantidadImpar < palabraObtenida.length; cantidadImpar++){
            if(cantidadImpar == 0){
                coordenadaInicialImparX = distanciaIzquierdaX - trazo.espacio;
                trazarLinea(ctx, coordenadaInicialImparX, puntoReferenciaY, trazo.linea);
                puntoPartida = puntoPartida + ((coordenadaInicialImparX + trazo.linea) + trazo.espacio);
                coordenadasLineas.push({ x: coordenadaInicialImparX + (trazo.linea / 4), y: puntoReferenciaY - 15});
            }
            else{
                coordenadasLineas.push({ x: puntoPartida + (trazo.linea / 4), y: puntoReferenciaY - 15});
                puntoPartida = recorrerLineasEspacios(ctx, puntoPartida, puntoReferenciaY, trazo.linea, trazo.espacio);
            }
        }
    }
}

// Función que continúa el dibujo de las líneas y los espacios entre carácteres
function recorrerLineasEspacios(ctx, partidaInicial, coordenadaY, trazadoLinea, trazadoEspacio){ 
    trazarLinea(ctx, partidaInicial, coordenadaY, trazadoLinea);
    partidaInicial = (partidaInicial + trazadoLinea) + trazadoEspacio;

    return partidaInicial;
}

// Función que dibuja la linea de un carácter
function trazarLinea(ctx, coordenadaX, coordenadaY, trazado){
    ctx.beginPath();
    ctx.moveTo(coordenadaX, coordenadaY);
    ctx.lineTo((coordenadaX + trazado), coordenadaY);
    ctx.stroke();
}

// Función que permite coordinar entre las líneas y los espacios de acuerdo a la cantidad de carácteres
function coordinarLineasEspacios(nuevaLinea, nuevoEspacio, numeroCaracteres){
   
    if(numeroCaracteres <= 4){
        return (ObtenerNuevaLineaEspacio(nuevaLinea, nuevoEspacio, 40, 20));           
    }
    else if(numeroCaracteres == 9){
        return (ObtenerNuevaLineaEspacio(nuevaLinea, nuevoEspacio, -3, 0));          
    }
    else if(numeroCaracteres == 8){
        return (ObtenerNuevaLineaEspacio(nuevaLinea, nuevoEspacio, 7, 3));
    }
    else if(numeroCaracteres == 7){
        return (ObtenerNuevaLineaEspacio(nuevaLinea, nuevoEspacio, 15, 7));
    }
    else if(numeroCaracteres == 5){
        return (ObtenerNuevaLineaEspacio(nuevaLinea, nuevoEspacio, 35, 17));
    } 
    else if(numeroCaracteres == 6){
        return (ObtenerNuevaLineaEspacio(nuevaLinea, nuevoEspacio, 30, 15));
    }  
    else if(numeroCaracteres >= 10){
        return (ObtenerNuevaLineaEspacio(nuevaLinea, nuevoEspacio, -7, -3));          
    }
}

// Función que modifica la distancia de los espacios y las lineas según la cantidad de carácteres 
function ObtenerNuevaLineaEspacio(nuevaLinea, nuevoEspacio, numeroLinea, numeroEspacio){
    nuevaLinea = nuevaLinea + (numeroLinea);
    nuevoEspacio = nuevoEspacio + (numeroEspacio);

    return { linea: nuevaLinea, espacio: nuevoEspacio }
}






