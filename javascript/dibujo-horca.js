
// Función que dibuja la Horca (y el Ahorcado)
function dibujarHorcaAhorcado(ctx, contador){
 
    if(contador == 1){
        PaloUno(ctx);
    }
    else if(contador == 2){
        PaloDos(ctx);
    }
    else if(contador == 3){
        PaloTres(ctx);
    }
    else if(contador == 4){
        dibujarCabeza(ctx);
    }
    else if(contador == 5){
        dibujarTronco(ctx);
    }
    else if(contador == 6){
        dibujarPiernaIzquierda(ctx);
    }
    else if(contador == 7){
        dibujarPiernaDerecha(ctx);
    }
    else if(contador == 8){
        dibujarBrazoIzquierdo(ctx);
    }
    else if(contador == 9){
        dibujarBrazoDerecho(ctx);
    }
}

// Función que dibuja el soporte de la horca
function dibujarSoporte(ctx){
    dibujarLinea(ctx, 187.5, 650, 75, 700);
    dibujarLinea(ctx, 187.5, 650, 300, 700);
    dibujarLinea(ctx, 75, 700, 300, 700);
}

// Función que dibuja el poste principal de la horca
function PaloUno(ctx){
    dibujarLinea(ctx, 187.5, 650, 187.5, 75);
}

// Función que dibuja el palo horizontal del poste de la horca
function PaloDos(ctx){
    dibujarLinea(ctx, 187.5, 75, 500, 75);
}

// Función que dibuja el palo vertical del poste de la horca
function PaloTres(ctx){
    dibujarLinea(ctx, 500, 75, 500, 150);
}

// Función que dibuja la cabeza del Ahorcado
function dibujarCabeza(ctx){
    dibujarCirculo(ctx, 500, 200, 50);
}

// Función que dibuja el tronco del Ahorcado
function dibujarTronco(ctx){
    dibujarLinea(ctx, 500, 250, 500, 450);
}

// Función que dibuja la pierna izquierda del Ahorcado
function dibujarPiernaIzquierda(ctx){
    dibujarLinea(ctx, 500, 450, 415, 535);
}

// Función que dibuja la pierna derecha del Ahorcado
function dibujarPiernaDerecha(ctx){
    dibujarLinea(ctx, 500, 450, 585, 535);
} 

// Función que dibuja el brazo izquierdo del Ahorcado
function dibujarBrazoIzquierdo(ctx){
    dibujarLinea(ctx, 500, 325, 415, 235);
}

// Función que dibuja el brazo derecho del Ahorcado
function dibujarBrazoDerecho(ctx){
    dibujarLinea(ctx, 500, 325, 585, 235);
}

// Función que dibuja una linea
function dibujarLinea(ctx, coordenadaInicialX, coordenadaInicialY, coordenadaFinalX, coordenadaFinalY){
    ctx.beginPath();
    ctx.moveTo(coordenadaInicialX, coordenadaInicialY);
    ctx.lineTo(coordenadaFinalX, coordenadaFinalY);
    ctx.stroke();
}

// Función que dibuja un círculo
function dibujarCirculo(ctx, posicionX, posicionY, radio){
    ctx.beginPath();
    ctx.arc(posicionX, posicionY, radio, 0, 2*3.14);
    ctx.stroke();
}