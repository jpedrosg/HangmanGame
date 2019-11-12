//  BIBLIOTECA DE words  
var words   = new Array();
words[0]  = "carteira";
words[1]  = "brasil";
words[2]  = "aeroplanador";
words[3]  = "treinador";
words[4]  = "software";
words[5]  = "bobeira";
words[6]  = "dados";
words[7]  = "disco";
words[8]  = "jogo";
words[9]  = "mapa";
words[10] = "babado";
words[11] = "cama";
words[12] = "critico";
words[13] = "windows";
words[14] = "linux";
words[15] = "macaco";
words[16] = "panela";
words[17] = "escada";
words[18] = "fofura";
words[19] = "grafico";
words[20] = "mula";
words[21] = "cavalo";
words[22] = "escola";


// SETUP
var canvas = document.querySelector('canvas#game')
var ctx = canvas.getContext("2d");
var words_chosen = words[getRandomInt(0,22)].toUpperCase()
var chosen_list = list(words_chosen)
//var words_chosen = 'O'
const inputTry = document.querySelector('input#try')
const chosen_show = document.querySelector('div#words_chosen')
const errors = document.querySelector('div#errors')
const back = document.body
const screenLeaderscore = document.querySelector('section#leaderscore')
const screenGame = document.querySelector('section#game')
const screenMenu = document.querySelector('section#menu')
const screenLoose = document.querySelector('section#loose')
const screenWin = document.querySelector('section#win')
const winnersList = document.querySelector('div#winnersList')
var escondida = copy(chosen_list)
var erros = 0
var anteriores = ' '
var restantes = 7
var start = 0
var sec = 0
var min = 0
var showMin = 0
var showSec = 0
var timePast = ''
var changeColor = true
var block = 0
var winnerTime = []
var winnerWord = []

// Executa ao entrar ENTER
inputTry.addEventListener('keyup', function(e){ 
    var key = e.which || e.keyCode;
    if (key == 13) { // codigo da tecla enter
        test(inputTry.value.toUpperCase())
    }
});


// Número aleatório para sortear a words_chosen
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


// Cria Array com mesmo tamanho, todo com underlines
function copy(p) { 
    let res = []
    for(let n = 0; n < p.length; n++){
        res.push('_')
    }
return res }


// Transforma a words_chosen em um Array
function list(p) { 
    let res = []
    for(l in p){
        res.push(p[l])
    }
return res } 


// Testa a letra
function test(l) { 
    if (Number.isInteger(Number(l))){
        alert('\nDigite uma LETRA!')
    }
    else if (anteriores.indexOf(l) >= 0) {
        alert(`\nVocê já digitou a letra ${l}`)
    } else if (chosen_list.indexOf(l) >= 0) {
        for(let n = 0; n < chosen_list.length; n++){
            if (l == chosen_list[n]){
                escondida[n] = l
                anteriores += l
            }
        }
    } else {
        erros++
        restantes--
        anteriores += l
    }
    refresh()
}


// Limpa o Input, Atualiza Erros e words_chosen
function refresh() { 

    inputTry.value = ''

    chosen_show.innerHTML = '' 
    for (let l = 0; l < escondida.length; l++){ 
        chosen_show.innerHTML += escondida[l] + ' '
    }

    errors.innerHTML = 'Erros: ' + erros

    if (!(chosen_show.innerHTML.indexOf("_") >= 0)) { // Caso complete a words_chosen...
        win()
    }
    render()
}   


// Alert com a palavra escondida
function reveal() { 
    alert(`A palavra secreta é: ${words_chosen}`)
}


// Renderiza o canvas com o boneco
function render() { 
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowOffsetX = -2;
    ctx.shadowOffsetY = 3;
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#1a1a1a'

    if (changeColor) { // Deixa trocar de cor

        if (erros == 1) { // Desenha a cabeça
            ctx.arc(188, 151, 28, 0, 2 * Math.PI)
            ctx.stroke()
            back.style.backgroundColor = '#2c654d'
        }

        if (erros == 2){ // DESENHA O TRONCO
            ctx.moveTo(188, 182);
            ctx.lineTo(188, 325);
            ctx.stroke();
            back.style.backgroundColor = '#526729'
        }

        if (erros == 3){ // Braço Esquerdo
            ctx.moveTo(188, 200)
            ctx.lineTo(148, 250)
            ctx.stroke()
            back.style.backgroundColor = '#696127'
        }

        if (erros == 4){ // Braço Direito
            ctx.moveTo(188, 200)
            ctx.lineTo(228, 250)
            ctx.stroke()
            back.style.backgroundColor = '#6a4f26'
        }

        if (erros == 5){ // Perna Esquerda
            ctx.moveTo(188, 324)
            ctx.lineTo(148, 390)
            ctx.stroke()
            back.style.backgroundColor = '#6a2f26'
        }

        if (erros == 6){ // Perna Esquerda
            ctx.moveTo(188, 324)
            ctx.lineTo(228, 390)
            ctx.stroke()
            back.style.backgroundColor = '#801111'
        }

        else if (erros > 6){
            loose()
        }
    }


    if (erros == 1){ // DESENHA A CABEÇA
 
    }
}


// Quando perder o jogo
function loose() { 
    screenGame.style.display = 'none'
    screenMenu.style.display = 'none'
    screenWin.style.display = 'none'
    screenLoose.style.display = 'block'
    screenLeaderscore.style.display = 'none';
    document.querySelector('div#words_chosenLoose').innerHTML = 'Palavra: ' + words_chosen
    document.querySelector('div#errorsLoose').innerHTML = errors.innerHTML;
    document.querySelector('div#timeLoose').innerHTML = 'Tempo: ' + timePast;
    back.style.backgroundColor = "#ea3d43"
    document.body.style.backgroundColor = "#ea3d43"
}

// Quando vencer o jogo
function win() { 
    screenGame.style.display = 'none';
    screenMenu.style.display = 'none';
    screenWin.style.display = 'block';
    screenLoose.style.display = 'none';
    screenLeaderscore.style.display = 'none';
    document.querySelector('div#words_chosenWin').innerHTML = 'Palavra: ' + chosen_show.innerHTML;
    document.querySelector('div#errorsWin').innerHTML = errors.innerHTML;
    document.querySelector('div#timeWin').innerHTML = 'Tempo: ' + timePast;
    back.style.backgroundColor = "green"
    document.body.style.backgroundColor = "green"
    changeColor = false
    leaderscore()
};




// Ouve o teclado e inicia o Jogo
const keysDown = {};
window.addEventListener('keydown', function (e){
    keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
    if (e.keyCode == 32) { // Pressionando ESPAÇO inicia o jogo!
        if (block == 0) {
            game()
        }
    }
    if (e.keyCode == 27) { // Pressionando ESQ volta ao menu!
        reload()
        block = 0
    }
});


// Reinicia a página
function reload() { 
    screenGame.style.display = 'block';
    screenMenu.style.display = 'none';
    screenWin.style.display = 'none';
    screenLoose.style.display = 'none';
    screenLeaderscore.style.display = 'none';
    // SETUP
    canvas.width = canvas.width
    words_chosen = words[getRandomInt(0,22)].toUpperCase()
    chosen_list = list(words_chosen)
    escondida = copy(chosen_list)
    erros = 0
    anteriores = ' '
    restantes = 7
    start = 0
    sec = 0
    min = 0
    showMin = 0
    showSec = 0
    timePast = ''
    changeColor = true
    block = 0
    back.style .backgroundColor = '#2c6165'
    refresh();
}


// Inicia o jogo
function game() { 
    screenGame.style.display = 'block';
    screenMenu.style.display = 'none';
    screenWin.style.display = 'none';
    screenLoose.style.display = 'none';
    screenLeaderscore.style.display = 'none';
    refresh();
    startTime();
    block = 1 ;
};




// Contador de tempo
function startTime() { 
    sec++;

    if (sec >= 60){
        min++;
        sec = 0;
    };

    if (sec < 10) {
        showSec = '0' + sec;
    } else {
        showSec = sec;
    };

    if (min < 10) {
        showMin = '0' + min;
    } else {
        showMin = min;
    };

    timePast = showMin + ':' + showSec; 
    document.getElementById('time').innerHTML = 'Tempo: ' + timePast;
    t=setTimeout('startTime()',1000);
};

function leaderscore() {
    winnerTime.push(timePast)
    winnerWord.push(chosen_show.innerHTML)
    winnersList.innerHTML = '&nbsp'.repeat(20) +'TEMPO' + '&nbsp'.repeat(26) + 'PALAVRA' + '<br/>'+ '<br/>'
    for(let pos in winnerTime){
        winnersList.innerHTML += '&nbsp'.repeat(20) + winnerTime[pos] + '&nbsp'.repeat(26) + winnerWord[pos] + '<br/>'
    }
    
}

function showLeaderscore() {
    screenGame.style.display = 'none';
    screenMenu.style.display = 'none';
    screenWin.style.display = 'none';
    screenLoose.style.display = 'none';
    screenLeaderscore.style.display = 'block';
}