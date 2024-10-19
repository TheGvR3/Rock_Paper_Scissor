alert("Welcome Challenger")

const nomeGiocatore = window.prompt("Enter your name");

document.querySelector("#titolo").innerHTML = `Welcome ${nomeGiocatore}`;

const titolo = document.querySelector("#titolo");
const informazioni = document.querySelector("#informazioni");
const playBtn = document.querySelector("#playBtn");
const choseBtn = document.querySelectorAll(".choseBtn");
const resultBtn = document.querySelector("#verdetto");
const risultato = document.querySelector("#risultato");
const resetBtn = document.querySelector("#resetBtn");

function start() {
    document.querySelector('.playing-choices').classList.add('playing');
    choseBtn.forEach(btn => {
        btn.classList.remove("notPlaying");
        btn.classList.add("playing");
    });
    informazioni.classList.remove("notPlaying");
    informazioni.classList.add("playing");
    playBtn.classList.add("notPlaying");
};

let sceltaUtente;

function sceltaCarta() {
    sceltaUtente = 'carta';
    scelta()
}

function sceltaSasso() {
    sceltaUtente = 'sasso';
    scelta()
}

function sceltaForbici() {
    sceltaUtente = 'forbici';
    scelta()
}

function scelta() {
    alert(`${nomeGiocatore} you chose ${sceltaUtente}`);
    document.querySelector('.playing-choices').classList.remove('playing');
    choseBtn.forEach(btn => {
        btn.classList.add("notPlaying");
        btn.classList.remove("playing");
    });
    informazioni.classList.add("notPlaying");
    informazioni.classList.remove("playing");
    resultBtn.classList.add("playing");
    pcMove();
}

let mossaComputer

function pcMove() {
    numeroCasuale = Math.random()
    if (numeroCasuale >= 0 && numeroCasuale <= 1 / 3) {
        mossaComputer = 'sasso'
    } else if (numeroCasuale > 1 / 3 && numeroCasuale <= 2 / 3) {
        mossaComputer = 'carta'
    } else {
        mossaComputer = 'forbici'
    }
}

function risultatoHTML() {
    titolo.classList.add("notPlaying");
    resultBtn.classList.remove("playing");
    resetBtn.classList.add("playing");
    risultato.classList.remove("notPlaying");
    risultato.classList.add("playing");
}

function getIcon(scelta) {
    switch(scelta) {
        case 'sasso': return '🪨';
        case 'carta': return '📄';
        case 'forbici': return '✂️';
        default: return '';
    }
}

function verdetto() {
    let vittorie = localStorage.getItem('wins') || 0;
    let pareggi = localStorage.getItem('draws') || 0;
    let sconfitte = localStorage.getItem('losses') || 0;

    let userIcon = getIcon(sceltaUtente);
    let pcIcon = getIcon(mossaComputer);

    risultatoHTML();

    if (mossaComputer === sceltaUtente) {
        risultato.innerHTML = `
            <p>${nomeGiocatore}, it's a draw!</p>
            <p>${sceltaUtente.toUpperCase()} ${userIcon} draws with ${mossaComputer.toUpperCase()} ${pcIcon}</p>
        `;
        pareggi++;
        localStorage.setItem('draws', pareggi);
    }
    else if ((mossaComputer === 'sasso' && sceltaUtente === 'carta') ||
        (mossaComputer === 'carta' && sceltaUtente === 'forbici') ||
        (mossaComputer === 'forbici' && sceltaUtente === 'sasso')) {
        risultato.innerHTML = `
            <p>${nomeGiocatore}, you won! 🎉</p>
            <p>${sceltaUtente.toUpperCase()} ${userIcon} beats ${mossaComputer.toUpperCase()} ${pcIcon}</p>
        `;
        vittorie++;
        localStorage.setItem('wins', vittorie);
    } else {
        risultato.innerHTML = `
            <p>${nomeGiocatore}, you lost! 😢</p>
            <p>${mossaComputer.toUpperCase()} ${pcIcon} beats ${sceltaUtente.toUpperCase()} ${userIcon}</p>
        `;
        sconfitte++;
        localStorage.setItem('losses', sconfitte);
    }
}

function resetGame() {
    sceltaUtente = null;
    mossaComputer = null;
    risultato.innerHTML = '';
    risultato.classList.remove("playing");
    risultato.classList.add("notPlaying");
    resultBtn.classList.remove("playing");
    resetBtn.classList.remove("playing");
    titolo.classList.remove("notPlaying");
    playBtn.classList.remove("notPlaying");
}

function mostraRisultati() {
    let vittorie = localStorage.getItem('wins') || 0;
    let pareggi = localStorage.getItem('draws') || 0;
    let sconfitte = localStorage.getItem('losses') || 0;

    alert(`Results:\nWins: ${vittorie}\nDraws: ${pareggi}\nLosses: ${sconfitte}`);
}

function pulisciLocalStorage() {
    localStorage.clear();
}
