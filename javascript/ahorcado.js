var teclaCaracterSeleccionado = document.querySelector("#iniciar-juego");

// Variable que guarda una determinada cantidad de palabras para ser elegidas al azar
var arregloPalabras = ["Javascript", "Oracle", "Alura", "HTML", "CSS", "Canvas"];
var caracterExpresionRegular = "^[A-Z]+$";  // Variable que representa una expresión regular para validar solo letras mayúsculas al presionar una tecla y al escribir una palabra
var caracterValidacionMinuscula = "^[a-z]+$";  // Variable que representa una expresión regular para identificar una letra minúscula
var caracteresAcertados = [];  // Variable que sólo guarda carácteres que están relacionados con la palabra seleccionada al azar
var caracteresErrados = [];  // Variable que sólo guarda carácteres que no están relacionados con la palabra seleccionada al azar
var contadorLetrasCorrectas = 0;  // Variable que realiza el conteo de los carácteres acertados correctamente en relación con la palabra seleccionada al azar
var contadorLetrasIncorrectas = 0;  // Variable que realiza el conteo de los carácteres acertados incorrectamente en relación con la palabra seleccionada al azar
var arregloCaracteresRepetitivos = [];  // Variable que guarda los carácteres no repetitivos de la palabra seleccionada al azar

// Función que captura el evento cuando una tecla es presionada
teclaCaracterSeleccionado.addEventListener("keydown", function(event){
    event.preventDefault();
    
    var caracterSeleccionado = String.fromCharCode(event.which);   // Variable que obtiene el cáracter de la tecla presionada
    var caracterValidado = validarCaracter(caracterSeleccionado);  // Variable que valida el carácter de la tecla presionada
    if(caracterValidado != undefined){
        verificarTeclaCaracter(palabraEscogida, caracterValidado);
    }
});

// Función que permite selecccionar una palabra al azar
function escogerPalabraSecreta(){  
    return (arregloPalabras[Math.round(Math.random() * (arregloPalabras.length))]);
}

// Función que valida solo letras mayúsculas al presionar una tecla 
function validarCaracter(keyChar){
    if(keyChar.match(caracterExpresionRegular) != null){  
        return keyChar;
    }
}

// Función que distingue y registra los carácteres que son acertados correctamente e incorrectamente al presionar una tecla 
function verificarTeclaCaracter(palabraObtenida, teclaObtenida){
    var resultadoCaracteres = convertirMayuscula(palabraObtenida);  // Variable que obtiene la palabra seleccionada al azar con todos los carácteres en mayúscula
    var j = 0;
    var k = 0;
    var contadorRepetitivo = 0;  // Variable que realiza el conteo cuando el carácter de la tecla ya ha sido presionada anteriormente
    var contadorAciertos = 0;  // Variable que realiza el conteo cuando se acertó correctamente el carácter asociada a la palabra seleccionada al azar con la tecla presionada
   
    if(resultadoCaracteres.length >= contadorLetrasCorrectas){
        while(j < resultadoCaracteres.length){
            var caracterMayuscula = resultadoCaracteres.substring(j,j+1);         
            if(teclaObtenida == caracterMayuscula){
                caracteresAcertados[j] = caracterMayuscula;       
                contadorLetrasCorrectas++;
                dibujarCaracterCorrecto(lapizAcuarela, coordenadasLineas, j, teclaObtenida);
                contadorAciertos++
                j++;
            }   
            else{
                j++;
            }
        }

        if(arregloCaracteresRepetitivos.length == 0 && contadorAciertos > 0){
            arregloCaracteresRepetitivos.push(teclaObtenida);
        }
        else if(contadorAciertos > 0){
            var valorRepetitivo = false;   // Variable interruptor para identicar si existe un carácter repetitivo o no existe 
            for(var l = 0; l < arregloCaracteresRepetitivos.length; l++){
                if(arregloCaracteresRepetitivos[l] == teclaObtenida){
                    valorRepetitivo = true;
                }
            }

            if(valorRepetitivo == true){
                if(contadorAciertos > 1){
                    contadorLetrasCorrectas = contadorLetrasCorrectas - contadorAciertos;
                }
                else{
                    contadorLetrasCorrectas--;
                }             
            }
            else {
                arregloCaracteresRepetitivos.push(teclaObtenida);
            }
        }
        
        if(contadorLetrasCorrectas == resultadoCaracteres.length){
            contadorLetrasIncorrectas = 10;
            verificarGanador();
        }
        
        if(contadorAciertos == 0){
            contadorLetrasIncorrectas++;
            if(contadorLetrasIncorrectas <= 9){
                dibujarHorcaAhorcado(lapizAcuarela, contadorLetrasIncorrectas);
            }
                
            if(caracteresErrados.length == 0){
                caracteresErrados.push(teclaObtenida);
                dibujarCaracterIncorrecto(lapizAcuarela, caracteresErrados, caracteresErrados.length);
            }

            while(k < caracteresErrados.length){
                if(caracteresErrados[k] == teclaObtenida){
                    contadorRepetitivo++;
                    k++;
                }
                else{
                    k++;
                }
            }

            if(contadorRepetitivo > 0 && contadorLetrasIncorrectas == 9){
                contadorLetrasCorrectas = resultadoCaracteres.length + 1;
                terminarJuego();
            }

            if(contadorRepetitivo == 0){
                if(contadorLetrasIncorrectas <= 9){
                    caracteresErrados.push(teclaObtenida);
                    dibujarCaracterIncorrecto(lapizAcuarela, caracteresErrados, caracteresErrados.length);
                }
                
                if(contadorLetrasIncorrectas == 9){
                    contadorLetrasCorrectas = resultadoCaracteres.length + 1;
                    terminarJuego();
                }           
            }
        }       
    }
} 

// Función que permite convertir una letra minúscula a mayúscula a partir de la palabra seleccionada al azar
function convertirMayuscula(palabraObtenida){
    var acumuladorCaracteres = "";  // Variable que concatena carácteres de la palabra seleccionada al azar 
    
    for(var i = 0; i < palabraObtenida.length; i++){
        var caracterObtenido = palabraObtenida.substring(i,i+1);

        if(caracterObtenido.match(caracterValidacionMinuscula) != null){
            caracterObtenido = caracterObtenido.toUpperCase();
            acumuladorCaracteres = acumuladorCaracteres + caracterObtenido;
        }
        else{
            acumuladorCaracteres = acumuladorCaracteres + caracterObtenido;
        }
    }

    return acumuladorCaracteres;;
}

// Función que finaliza el juego cuando se termina de dibujar la Horca (y del Ahorcado)
function terminarJuego(){
    escribirDerrota(lapizAcuarela, "red", "Fin del juego!", undefined);
}

// Función que finaliza el juego cuando se acerta correctamente todos los carácteres de la palabra seleccionada al azar
function verificarGanador(){
    escribirVictoria(lapizAcuarela, "green", "Ganaste,", "Felicidades!");
}

$(document).ready(function() {
    $('#ahorcado').click(function(e){
        $(this).focus();
    });
    $('#iniciar-juego').click(function(e) {
        $('#ahorcado').trigger('click');
    });
});

