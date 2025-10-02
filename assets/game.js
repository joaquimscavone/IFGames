function createElement(tag, classAttr, content) {
  const element = document.createElement(tag);
  element.classList.add(classAttr);
  if (content)
    element.appendChild(content);
  return element;
}



balao = function (color) {

  this.passo = 2;
  this.x = 0;
  this.y = 0;
  this.h = 0;
  this.w = 0;
  this.start = false;
  const self = this;
  const som = document.getElementById("som");

  const reset = function () {
    self.luck();
    element.querySelectorAll('.particle').forEach(element => {
      element.remove();
    });
    element.classList.remove('pop');
    this.start = true;
  }


  this.pop = function () {
    this.start = false;
    element.classList.add('pop');
    if (element.classList.contains(getGeralColor())) {
      document.querySelector('.acertos span').innerHTML = ++acertos;
    } else {
      document.querySelector('.erros span').innerHTML = ++erros;
    }
    som.play().catch(e => console.warn("Autoplay bloqueado:", e));
    // Criar partículas de estouro
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const angle = Math.random() * 2 * Math.PI;
      const distance = 60 + Math.random() * 30;
      particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
      particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
      element.appendChild(particle);
    }
    setTimeout(() => reset(), 1000);

  }



  const createBallon = function (color) {
    const element = createElement('div', 'balloon-container', createElement('div', 'string'));
    element.classList.add(color);
    element.appendChild(createElement('div', 'balloon', createElement('div', 'knot')));
    element.addEventListener('click', () => self.pop());
    document.body.appendChild(element);
    return element;
  }



  const element = createBallon(color);



  this.setPosition = function (x, y) {
    element.style.bottom = `${y}px`;
    element.style.left = `${x}px`;

  }


  this.run = function () {
    if (this.start) {
      if (this.y - this.h > window.innerHeight) {
        this.luck();
      }
      this.y += this.passo
      this.setPosition(this.x, this.y);
    }
  }



  this.luck = function () {
    this.h = element.offsetHeight;
    this.w = element.offsetWidth;
    this.y = randomInt(0 - this.h, -4000 - this.h);
    this.x = randomInt(0, window.innerWidth - this.w);
    this.setPosition(this.x, this.y);
  }


  this.luck();




}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const balloonColors = [
  "pink",       // original
  "red",
  "orange",
  "yellow",
  "green",
  "turquoise",
  "blue",
  "indigo",
  "purple",
  "gray",
  "black"
];

const baloes_por_cor = 4;
const tempo_em_cor = 30;
const milisegundos = 10;
const timergame = 5;
let color;
let acertos = 0;
let erros = 0;


function getTimer(loop) {
  return Math.ceil(30 - (loop * milisegundos / 1000));
}

function getGeralColor() {
  return color;
}

function sortColor() {
  const oldcolor = color;
  color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  if(color == oldcolor)
    sortColor();
  document.querySelector('.ceu').classList.remove("border-" + oldcolor);
  document.querySelector('.ceu').classList.add("border-" + color);
  return color;
}

function setClock(milisegundos) {
  let minutos = Math.floor(milisegundos / 60000);
  let segundos = Math.floor((milisegundos % 60000) / 1000);
  if ((segundos + "").length == 1) {
    segundos = "0" + segundos;
  }
  document.querySelector('.clock span').innerHTML = minutos + ":" + segundos;
}

window.onload = function () {
  const timerelement = document.querySelector('.timer');
  const baloes = [];
  balloonColors.forEach(color => {
    for (let cont = 1; cont <= baloes_por_cor; cont++) {
      baloes.push(new balao(color));
    }
  })

  let loop = 0;
  let timer = 30;
  let clock = timergame * 1000 * 60;
  sortColor();
  let intervalo = setInterval(
    () => {

      baloes.forEach(
        balao => {
          balao.start = true;
          balao.run();
        });
      let atualtimer = getTimer(++loop);
      if (timer != atualtimer) {
        timer = atualtimer;
        timerelement.innerHTML = timer;
      }
      if (timer == 0) {
        timer = 30;
        loop = 0;
        sortColor();
      }
      clock -= milisegundos;
      setClock(clock);

    }
    , milisegundos);

    

}

