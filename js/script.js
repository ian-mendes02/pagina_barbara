const balloons = document.querySelectorAll('img[src^="img/svg/balloon"]');
const balloonsContainer = document.getElementById('balloons');
const prompt = document.getElementById('initial_prompt');
const pageContent = document.querySelector('.page-content');
const content = pageContent.children;
const timespan = document.getElementById('timespan');
const timespanText = timespan.querySelectorAll('span');
const messageBox = document.getElementById('message');
const viewWidth = window.innerWidth;

function revealPage() {
    setTimeout(() => {
        prompt.style.opacity = '0';
    }, 300);
    setTimeout(() => {
        prompt.remove();
    }, 600);
    setTimeout(releaseBalloons(), 700);
    let h1 = content[0];
    h1.classList.add('reveal');
    h1.addEventListener('animationend', function animationend() {
        h1.classList.remove('reveal');
        h1.classList.add('pulse');
        h1.removeEventListener('animationend', animationend);
    });
    setTimeout(() => {
        h1.classList.remove('pulse');
        h1.classList.add('vanish');
    }, 7000);
    setTimeout(() => {
        h1.remove();
        getTimeDelta();
    }, 10000);
};

let delta = {};

function getTimeDelta() {
    let birthDate = new Date('July 24, 1994').getFullYear();
    let currentYear = new Date().getFullYear();
    delta.anos = Math.round(currentYear - birthDate);
    delta.meses = Math.round(delta.anos * 12);
    delta.semanas = Math.round(delta.meses * 4);
    delta.dias = Math.round(delta.anos * 365);
    delta.horas = Math.round(delta.dias * 24);
    delta.minutos = Math.round(delta.horas * 60);
    delta.segundos = Math.round(delta.minutos * 60);
    displayDelta();
};


function releaseBalloons() {
    if (viewWidth > 768) {
        for (let i = 0; i < balloons.length; i++) {
            let j = Math.floor(Math.random() * (15 - 5) + 5);
            balloons[i].style.width = j + 'vw';
        }
    } else {
        for (let i = 0; i < balloons.length; i++) {
            let j = Math.floor(Math.random() * (45 - 25) + 25);
            balloons[i].style.width = j + 'vw';
        }
    }
    let floatBalloons = setInterval(() => {
        let i = Math.floor(Math.random() * balloons.length);
        balloons[i].classList.add('floatY');
    }, 50);
    setTimeout(() => {
        balloonsContainer.remove();
        clearInterval(floatBalloons);
    }, 10000);
}

function displayDelta() {
    let timespanTextSplice = Array.from(timespanText).splice(0, 5);
    timespan.firstElementChild.classList.add('fadein');
    let i = 0;
    let m = 0;
    let s = 0;
    var tick = setInterval(() => {
        s++;
        if (s == 60) { s = 0; m++; };
        timespanText[5].innerHTML = `${delta.minutos + m} minutos`;
        timespanText[6].innerHTML = `e ${delta.segundos + s} segundos.`;
        for (let j = 0; j < timespanTextSplice.length; j++) {
            let id = timespanText[j].getAttribute('id');
            timespanText[j].innerHTML = `${delta[id]} ${id},`;
        }
    }, 1000);
    var revealTimespan = setInterval(() => {
        timespanText[i].classList.add('fadein');
        i++;
        if (i == timespanText.length) { clearInterval(revealTimespan); }
    }, 1000);
    timespanText[timespanText.length - 1].addEventListener('animationend', function touchPrompt() {
        setTimeout(() => {
            timespan.lastElementChild.classList.add('blink');
            window.addEventListener('click', function clear() {
                timespan.classList.add('vanish');
                timespan.addEventListener('animationend', function removeTimespan() {
                    timespan.remove();
                    clearInterval(tick);
                    window.removeEventListener('click', clear);
                    timespan.removeEventListener('animationend', removeTimespan)
                    timespanText[timespanText.length - 1].removeEventListener('animationend', touchPrompt)
                    displayMessage()
                })
            });
        }, 1000);
    })

};

function displayMessage() {
    messageBox.style.display = "block";
    messageBox.classList.add('fadein')
}
