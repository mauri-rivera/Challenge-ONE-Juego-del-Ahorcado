function mostrarTextoBotonMensajesPantalla(){
    nuevoTituloArriba.textContent = "Sólo se puede agregar una nueva palabra hasta que se termine el juego";
    nuevoTituloArriba.classList.remove("main-rodapie2");
    nuevoTituloArriba.classList.add("main-rodapie");
    nuevaPalabra.classList.remove("text-input");
    nuevaPalabra.classList.add("text-input3");
    botonAgregarNuevaPalabra.classList.remove("btn");
    botonAgregarNuevaPalabra.classList.add("btn2");
    saltoLinea.classList.remove("saltoLinea2");
    saltoLinea.classList.add("saltoLinea");
}

function volverMostrarTextoBotonMensajesPantalla(teclaObtenida){
    nuevaPalabra.classList.remove("text-input3");
    nuevaPalabra.classList.add("text-input");
    botonAgregarNuevaPalabra.classList.remove("btn2");
    botonAgregarNuevaPalabra.classList.add("btn");
    saltoLinea.classList.remove("saltoLinea2");
    saltoLinea.classList.add("saltoLinea");
    nuevoTituloArriba.classList.remove("main-rodapie");
    nuevoTituloArriba.classList.add("main-rodapie2");
    document.oncontextmenu = function(){return true;};
    document.onmousedown = function(){return true;};
    borrarMensajeLetraRepetida(teclaObtenida);
}

// Función que realiza el dibujo del carácter acertado correctamente de la palabra seleccionada al azar
function dibujarCaracterCorrecto(ctx, arregloCaracter, posicion, caracterCorrecto){
    var caracterAcertado = arregloCaracter[posicion];  // Variable que obtiene el carácter que ha sido acertada correctamente  
    
    if(arregloCaracter.length >= 8){
        ctx.font = "55px Georgia";
    }
    else{
        ctx.font = "65px Georgia";
    }

    ctx.fillStyle = "blue";
    ctx.fillText(caracterCorrecto, caracterAcertado.x, caracterAcertado.y);
}

// Función que realiza el dibujo del carácter acertado incorrectamente en relación a la palabra seleccionada al azar
function dibujarCaracterIncorrecto(ctx, arregloCaracter, posicion){
    var caracterErrado = arregloCaracter[posicion-1];   // Variable que obtiene el carácter que ha sido acertada incorrectamente

    ctx.font = "40px Georgia";
    ctx.fillStyle = "black";

    if(arregloCaracter.length == 1){
        ctx.fillText(caracterErrado, 712.5, 425);
        nuevaPartida = 712.5 + 50;
    }
    else{
        ctx.fillText(caracterErrado, nuevaPartida, 425);
        nuevaPartida = nuevaPartida + 50;
    }
}

function mostrarMensajeLetraRepetidaCorrecta(teclaObtenida){
    var primeraParte = "Ya utilizaste la letra";
    var segundaParte = teclaObtenida;
    var mensaje1 = primeraParte.concat(" ", segundaParte);
    escribirErrorLetraRepetida(lapizAcuarela, "green", mensaje1.toString(), "Elige otra diferente");
}

function mostrarMensajeLetraRepetidaIncorrecta(teclaObtenida){
    var primeraParte = "Ya utilizaste la letra";
    var segundaParte = teclaObtenida;
    var mensaje1 = primeraParte.concat(" ", segundaParte);
    escribirErrorLetraRepetida(lapizAcuarela, "red", mensaje1.toString(), "Elige otra diferente");
}

function borrarMensajeLetraRepetida(teclaObtenida){
    var primeraParte = "Ya utilizaste la letra";
    var segundaParte, mensaje1;
    if(pruebaLetraAnterior == false){
        segundaParte = teclaObtenida;
        mensaje1 = primeraParte.concat(" ", segundaParte);
        escribirErrorLetraRepetida(lapizAcuarela, "yellow", mensaje1.toString(), "Elige otra diferente");
        letraAnterior = teclaObtenida;
        pruebaLetraAnterior = true;
    }
    else{
        segundaParte = letraAnterior;
        mensaje1 = primeraParte.concat(" ", segundaParte);
        escribirErrorLetraRepetida(lapizAcuarela, "yellow", mensaje1.toString(), "Elige otra diferente");
        letraAnterior = teclaObtenida;
    }   
}

// Función que finaliza el juego cuando se termina de dibujar la Horca (y del Ahorcado)
function terminarJuego(){
    escribirDerrota(lapizAcuarela, "red", "Fin del juego!", undefined);
}

// Función que finaliza el juego cuando se acerta correctamente todos los carácteres de la palabra seleccionada al azar
function verificarGanador(){
    escribirVictoria(lapizAcuarela, "green", "Ganaste,", "Felicidades!");
}

// Función que dibuja el mensaje del fin del juego cuando se termina el dibujo de la Horca (y del Ahorcado)
function escribirDerrota(ctx, color, mensaje1){
    escribirMensaje(ctx, color, mensaje1);
}

// Función que dibuja el mensaje cuando se acertado correctamente todas los carácteres de la palabra seleccionada al azar 
function escribirVictoria(ctx, color, mensaje1, mensaje2){
    escribirMensaje(ctx, color, mensaje1, mensaje2);
}

function escribirErrorLetraRepetida(ctx, color, mensaje1, mensaje2){
    escribirMensaje(ctx, color, mensaje1, mensaje2);
}

// Función que dibuja un mensaje
function escribirMensaje(ctx, color, mensaje1, mensaje2){
    if(mensaje2 == undefined){
        ctx.font = "40px Georgia";
        ctx.fillStyle = color;
        ctx.fillText(mensaje1, 775, 350);
    }
    else{
        ctx.font = "40px Georgia";
        ctx.fillStyle = color;
        ctx.fillText(mensaje1, 775, 325);
        ctx.fillText(mensaje2, 750, 360);
    } 
}