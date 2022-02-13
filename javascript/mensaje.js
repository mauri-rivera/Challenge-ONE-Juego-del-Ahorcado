
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