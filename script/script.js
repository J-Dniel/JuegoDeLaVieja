// Elementos Requerido
const selectMenu = document.querySelector(".select-menu"),
select1Player = selectMenu.querySelector(".player1"),
select2Player = selectMenu.querySelector(".player2"),
selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
winText = resultBox.querySelector(".win-text"),
replayBtn = resultBox.querySelector("button");

let opc = true;

window.onload = ()=>{ // Una vez cargada la ventana:
    for (let i = 0; i < allBox.length; i++){ //agregua el atributo "onclick" en todo el intervalo disponible
        allBox[i].setAttribute("onclick","clickedBox(this)");
        
    }

    select1Player.onclick = ()=>{ //Evento de un jugador
        selectMenu.classList.add("show"); //.select-menu.show
        selectBox.classList.remove("hide"); //.select-box.hide
    }
    select2Player.onclick = ()=>{ //Evento de dos jugadores
        selectMenu.classList.add("show"); //.select-meni.show
        selectBox.classList.remove("hide"); //.select-box.hide
        opc = false;
    }

    selectXBtn.onclick = ()=>{ //Evento Jugador (X)
        selectBox.classList.add("hide"); //.select-box.hide
        playBoard.classList.add("show"); //.play-board.show
    }
    selectOBtn.onclick = ()=>{ //Evento Jugador (O)
        selectBox.classList.add("hide"); //.select-box.hide
        playBoard.classList.add("show"); //.play-board.show
        players.setAttribute("class","players active player") //Establecer el atributo de "class" a "players active player"
    }
}

// fontawesome es un framework de iconos y estilos css
let xIcon = "fas fa-times"; //class name of fontawesome cross icon
let oIcon = "far fa-circle"; //class name of fontawesome circle icon
let sign = "X"; // variable Global que se le asgina el signo "X" o "O"
let runBot = true; // variable Global que sirve para detener la funcion bot() una vez ganada la partida o en empate!

// Comienzo de funcion clickedBox
function clickedBox(paramts) {
    // console.log(paramts)
    if (opc) {
        if (players.classList.contains("player")) {
            paramts.innerHTML = `<i class="${oIcon}"></i>`; //agrega una etiqueta de icono, dentro del elemento o cuadro en el que el usuario hizo click
            players.classList.add("active"); //agregar active class in players
            sign = "O"; // si el jugador eligio "O", se le asigna ese valor
            paramts.setAttribute("id",sign); //establecer el atributo de identificación en el cuadro con el signo elegido por el jugador
        }else{
            paramts.innerHTML = `<i class="${xIcon}"></i>`; //agrega una etiqueta de icono, dentro del elemento o cuadro en el que el usuario hizo click
            players.classList.add("active"); //agregar active class in players
            paramts.setAttribute("id",sign); //establecer el atributo de identificación en el cuadro con el signo elegido por el jugador
        }
        selectWinner(); // funcion selectWinner()
        playBoard.style.pointerEvents = "none"; //una vez que el usuario selecciona cualquier casilla,no se puede volver a hacer clic en esa casilla
        paramts.style.pointerEvents = "none";
        //agregar pointerEvents=none al tablero de juego para que el usuario no pueda hacer clic inmediatamente en cualquier otro cuadro hasta que el bot seleccione o el otro jugador seleciones
        let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //generando un número aleatorio, por lo que el bot se retrasará 
        setTimeout(()=>{
            bot(runBot); // llamada de la funcion bot()
        },randomDelayTime);  //pasando valor de retardo
    }else{
        if (players.classList.contains("player")) {
            paramts.innerHTML = `<i class="${oIcon}"></i>`
            players.classList.remove("active","player"); //elimina "active player" class in players
            sign = "O";
            paramts.setAttribute("id",sign);
        }else{
            paramts.innerHTML = `<i class="${xIcon}"></i>`
            players.classList.add("active","player"); //agregar "active player" class in players
            paramts.setAttribute("id",sign);
        }
        selectWinner();
        playBoard.style.pointerEvents = "auto"; //agregar pointerEvents=auto en el tablero de juego para que el usuario pueda volver a hacer clic en otro cuadro
        paramts.style.pointerEvents = "none";
        sign = "X";
    }
} // Fin

// Comienzo de funcion bot()
function bot(runBot) {
    if (runBot) {
        sign = "O";
    let array = []; //se crea una matriz vacía, para almacenar el índice de las cajas sin hacer clic
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) { //si el box/span no tiene hijos significa etiqueta <i>
            array.push(i); //se inserta casillas sin hacer clic en el number/index dentro de la matriz
            // console.log(i + " has no children");
        }
        
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; //obteniendo un índice aleatorio de la matriz para que el bot seleccione un cuadro aleatorio no seleccionado
    // console.log(array);
    if (array.length > 0) {
        if (players.classList.contains("player")) {
            sign = "X";
            allBox[randomBox].innerHTML = `<i class="${xIcon}"></i>`
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id",sign);
        }else{
            allBox[randomBox].innerHTML = `<i class="${oIcon}"></i>`
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id",sign);
        }
        selectWinner();      
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    sign = "X";
    }
}

function getClass(idName) {
    return document.querySelector(".box" + idName).id;
    
}

function checkIdSign(val1, val2, val3, sign) { //verifica que todo los valores de identificación sea igual al signo (X u O)
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }    
}

function selectWinner() { //si la siguiente combinación ganadora coincide, selecciona el ganador
    if(checkIdSign(1,2,3,sign) || checkIdSign(4,5,6,sign) || checkIdSign(7,8,9,sign) || checkIdSign(1,4,7,sign) || checkIdSign(2,5,8,sign) || checkIdSign(3,6,9,sign) || checkIdSign(1,5,9,sign) || checkIdSign(3,5,7,sign)){
        //console.log(sign + " Ganador");
        runBot = false; //el bot no se vuelva a ejecutar
        bot(runBot);
        setTimeout(()=>{ //después de la partida ganada, oculta el tablero del juego y muestra el resultado después de 700 ms
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); //1s = 1000ms
        winText.innerHTML = `Jugador <p>${sign}</p> a Ganando!!!`; //muestra el texto ganador con el signo del jugador(X u O)
    }else{
        if(getClass(1) != "" && getClass(2) && getClass(3) && getClass(4) && getClass(5) && getClass(6) && getClass(7) && getClass(8) && getClass(9)) {
            runBot=false;
            bot(runBot);
            setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        winText.textContent = `Empatado!`; //Muestra el texto que queda en Empate!
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload(); //recargar la página en su inicio al hacer clic en el botón de "repetir"---
}
