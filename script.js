alert("Benvenuto Sfidante")

const nomeGiocatore = window.prompt("Inserisci il tuo nome");

document.querySelector("#titolo").innerHTML = `Benvenuto ${nomeGiocatore}`;

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
    alert(`${nomeGiocatore} hai scelto ${sceltaUtente}`);
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
    let vittorie = localStorage.getItem('vittorie') || 0;
    let pareggi = localStorage.getItem('pareggi') || 0;
    let sconfitte = localStorage.getItem('sconfitte') || 0;

    let userIcon = getIcon(sceltaUtente);
    let pcIcon = getIcon(mossaComputer);

    risultatoHTML();

    if (mossaComputer === sceltaUtente) {
        risultato.innerHTML = `
            <p>${nomeGiocatore}, è un pareggio!</p>
            <p>${sceltaUtente.toUpperCase()} ${userIcon} pareggia con ${mossaComputer.toUpperCase()} ${pcIcon}</p>
        `;
        pareggi++;
        localStorage.setItem('pareggi', pareggi);
    }
    else if ((mossaComputer === 'sasso' && sceltaUtente === 'carta') ||
        (mossaComputer === 'carta' && sceltaUtente === 'forbici') ||
        (mossaComputer === 'forbici' && sceltaUtente === 'sasso')) {
        risultato.innerHTML = `
            <p>${nomeGiocatore}, hai vinto! 🎉</p>
            <p>${sceltaUtente.toUpperCase()} ${userIcon} batte ${mossaComputer.toUpperCase()} ${pcIcon}</p>
        `;
        vittorie++;
        localStorage.setItem('vittorie', vittorie);
    } else {
        risultato.innerHTML = `
            <p>${nomeGiocatore}, hai perso! 😢</p>
            <p>${mossaComputer.toUpperCase()} ${pcIcon} batte ${sceltaUtente.toUpperCase()} ${userIcon}</p>
        `;
        sconfitte++;
        localStorage.setItem('sconfitte', sconfitte);
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
    let vittorie = localStorage.getItem('vittorie') || 0;
    let pareggi = localStorage.getItem('pareggi') || 0;
    let sconfitte = localStorage.getItem('sconfitte') || 0;

    alert(`Risultati:\nVittorie: ${vittorie}\nPareggi: ${pareggi}\nSconfitte: ${sconfitte}`);
}

function pulisciLocalStorage() {
    localStorage.clear();
}
