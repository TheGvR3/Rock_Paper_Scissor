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
    choseBtn.forEach(choseBtn => {
        choseBtn.classList.add("playing");
    });
    informazioni.classList.remove("notPlaying");
    informazioni.classList.add("Playing");
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
    choseBtn.forEach(choseBtn => {
        choseBtn.classList.remove("playing");
    })
    informazioni.classList.add("notPlaying");
    informazioni.classList.remove("playing");
    resultBtn.classList.add("playing");
    pcMove()
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


function verdetto() {
    let vittorie = localStorage.getItem('vittorie') || 0;
    let pareggi = localStorage.getItem('pareggi') || 0;
    let sconfitte = localStorage.getItem('sconfitte') || 0;

    if (mossaComputer === sceltaUtente) {
        risultatoHTML();
        risultato.innerHTML = `${nomeGiocatore} a quanto pare hai PAREGGIATO!`;
        pareggi++;
        localStorage.setItem('pareggi', pareggi);
    }
    else if ((mossaComputer === 'sasso' && sceltaUtente === 'carta') ||
        (mossaComputer === 'carta' && sceltaUtente === 'forbici') ||
        (mossaComputer === 'forbici' && sceltaUtente === 'sasso')) {
        risultatoHTML();
        risultato.innerHTML = `${nomeGiocatore} hai Vinto, il PC ha scelto ${mossaComputer}`;
        vittorie++;
        localStorage.setItem('vittorie', vittorie);
    } else if ((mossaComputer === 'sasso' && sceltaUtente === 'forbici') ||
        (mossaComputer === 'carta' && sceltaUtente === 'sasso') ||
        (mossaComputer === 'forbici' && sceltaUtente === 'carta')) {
        risultatoHTML();
        risultato.innerHTML = `${nomeGiocatore} hai Perso, il PC ha scelto ${mossaComputer}`;
        sconfitte++;
        localStorage.setItem('sconfitte', sconfitte);
    };
}

function resetGame() {
    sceltaUtente = null;
    mossaComputer = null;
    risultato.innerHTML = '';
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