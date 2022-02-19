var teclaCaracterSeleccionado = document.querySelector("#iniciar-juego");
var inputMovil = document.querySelector("#dmovil");

// Variable que guarda una determinada cantidad de palabras para ser elegidas al azar
var arregloPalabras = ["Javascript", "Oracle", "Alura", "HTML", "CSS", "Canvas"];
var caracterExpresionRegular = "^[A-Z]+$";  // Variable que representa una expresión regular para validar solo letras mayúsculas al presionar una tecla y al escribir una palabra
var caracterValidacionMinuscula = "^[a-z]+$";  // Variable que representa una expresión regular para identificar una letra minúscula
var caracteresAcertados = [];  // Variable que sólo guarda carácteres que están relacionados con la palabra seleccionada al azar
var caracteresErrados = [];  // Variable que sólo guarda carácteres que no están relacionados con la palabra seleccionada al azar
var contadorLetrasCorrectas = 0;  // Variable que realiza el conteo de los carácteres acertados correctamente en relación con la palabra seleccionada al azar
var contadorLetrasIncorrectas = 0;  // Variable que realiza el conteo de los carácteres acertados incorrectamente en relación con la palabra seleccionada al azar
var arregloCaracteresRepetitivos = [];  // Variable que guarda los carácteres no repetitivos de la palabra seleccionada al azar
var letraRepetida = false;
var letraAnterior;
var pruebaLetraAnterior = true;

// Función que captura el evento cuando una tecla es presionada
teclaCaracterSeleccionado.addEventListener("keydown", function(event){
    event.preventDefault();

    var caracterSeleccionado = String.fromCharCode(event.which);   // Variable que obtiene el cáracter de la tecla presionada
    var caracterValidado = validarCaracter(caracterSeleccionado);  // Variable que valida el carácter de la tecla presionada
    if(caracterValidado != undefined){
        verificarTeclaCaracter(palabraEscogida, caracterValidado);
    }
});

function prepararLetra(){
    if(inputMovil.value != ""){
        setTimeout(ejecutarLetra, 200);
    }
}

function ejecutarLetra(){
    var caracterValidado = validarCaracter(inputMovil.value);  // Variable que valida el carácter de la tecla presionada
    if(caracterValidado != undefined){
        inputMovil.value = "";
        verificarTeclaCaracter(palabraEscogida, caracterValidado);
    }
}

// Función que permite selecccionar una palabra al azar
function escogerPalabraSecreta(){  
    return (arregloPalabras[Math.round(Math.random() * (arregloPalabras.length))]);
}

// Función que valida solo letras mayúsculas al presionar una tecla 
function validarCaracter(keyChar){
    var resultado;

    if(keyChar.match(caracterValidacionMinuscula) != null){
        resultado = keyChar.toUpperCase();
        if(resultado.match(caracterExpresionRegular) != null){
            return resultado;
        }
        else{
            inputMovil.value = "";
            resultado = undefined;
            return resultado;
        }
    }
    else if(keyChar.match(caracterExpresionRegular) != null){  
            return keyChar;
    }
    else{
        inputMovil.value = "";
        resultado = undefined;
        return resultado;
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
                contadorAciertos++;
                j++;
            }   
            else{
                j++;
            }
        }

        if(arregloCaracteresRepetitivos.length == 0 && contadorAciertos > 0){
            arregloCaracteresRepetitivos.push(teclaObtenida);
            borrarMensajeLetraRepetida();
        }
        else if(contadorAciertos > 0){
            var valorRepetitivo = false;   // Variable interruptor para identicar si existe un carácter repetitivo o no existe 
            for(var l = 0; l < arregloCaracteresRepetitivos.length; l++){
                if(arregloCaracteresRepetitivos[l] == teclaObtenida){
                    valorRepetitivo = true;
                    borrarMensajeLetraRepetida(teclaObtenida);
                    mostrarMensajeLetraRepetidaCorrecta(teclaObtenida);
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
                borrarMensajeLetraRepetida(teclaObtenida);
            }
        }
        
        if(contadorLetrasCorrectas == resultadoCaracteres.length){
            volverMostrarTextoBotonMensajesPantalla(teclaObtenida);
            contadorLetrasIncorrectas = 10;
            verificarGanador();
        }
        
        if(contadorLetrasIncorrectas == 10){
            verificarGanador();
        }
        else if(contadorAciertos == 0){        
            if(caracteresErrados.length == 0){
                caracteresErrados.push(teclaObtenida);
                dibujarCaracterIncorrecto(lapizAcuarela, caracteresErrados, caracteresErrados.length);
                contadorLetrasIncorrectas++;
                dibujarHorcaAhorcado(lapizAcuarela, contadorLetrasIncorrectas);
                borrarMensajeLetraRepetida(teclaObtenida);
            }

            while(k < caracteresErrados.length){
                if(caracteresErrados[k] == teclaObtenida){ 
                    if(letraRepetida == true){
                        borrarMensajeLetraRepetida(teclaObtenida);
                        mostrarMensajeLetraRepetidaIncorrecta(teclaObtenida);
                        letraRepetida = false;
                        contadorRepetitivo++;
                        k++;
                    }
                    
                    if(letraRepetida == false && caracteresErrados.length == 1){
                        letraRepetida = true;
                        contadorRepetitivo++;
                        k++;
                    }
                    else if(letraRepetida == false && caracteresErrados.length > 1){
                        borrarMensajeLetraRepetida(teclaObtenida);
                        mostrarMensajeLetraRepetidaIncorrecta(teclaObtenida);
                        letraRepetida = true;
                        if(contadorRepetitivo == 0){
                            contadorRepetitivo++;
                            k++;
                        }
                    }
                }
                else if(letraRepetida == false){
                    borrarMensajeLetraRepetida(teclaObtenida);
                    k++;
                }
                else if(contadorRepetitivo > 0 && letraRepetida == true){
                    k++;
                }
                else if(letraRepetida == true && contadorRepetitivo == 0){
                    letraRepetida = false;
                    borrarMensajeLetraRepetida(teclaObtenida);
                    k++;
                }     
            }
        
            if(contadorLetrasIncorrectas <= 9){
                if(contadorRepetitivo == 0){
                    borrarMensajeLetraRepetida();
                    if(caracteresErrados.length == 1){
                        contadorLetrasIncorrectas++;
                    }
                    else{
                        contadorLetrasIncorrectas++;
                        dibujarHorcaAhorcado(lapizAcuarela, contadorLetrasIncorrectas);
                    }  
                }  
            }
    
            if(contadorRepetitivo > 0 && contadorLetrasIncorrectas == 9){
                contadorLetrasCorrectas = resultadoCaracteres.length + 1;
                volverMostrarTextoBotonMensajesPantalla(teclaObtenida);
                terminarJuego();
            }

            if(contadorRepetitivo == 0){
                if(contadorLetrasIncorrectas <= 9){
                    if(caracteresErrados.length == 1){
                        dibujarHorcaAhorcado(lapizAcuarela, contadorLetrasIncorrectas);
                    }
                    caracteresErrados.push(teclaObtenida);
                    dibujarCaracterIncorrecto(lapizAcuarela, caracteresErrados, caracteresErrados.length);
                    borrarMensajeLetraRepetida(teclaObtenida);
                }  
            }
                
            if(contadorLetrasIncorrectas == 9){
                contadorLetrasCorrectas = resultadoCaracteres.length + 1;
                volverMostrarTextoBotonMensajesPantalla(teclaObtenida);
                terminarJuego();
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

    return acumuladorCaracteres;
}





