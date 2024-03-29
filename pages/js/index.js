let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
}


document.addEventListener('DOMContentLoaded', function() {
  // Select all the links in the navbar
  var links = document.querySelectorAll('.navbar a');

  // Add a tabindex attribute to each link
  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute('tabindex', i + 1);
  }

  // Set focus on the first link
  links[0].focus();

  // Listen for keydown events
  window.addEventListener('keydown', function(e) {
    // Get the currently focused element
    var focused = document.activeElement;

    // If the left arrow key is pressed
    if (e.key === 'ArrowLeft') {
      for (var i = 0; i < links.length; i++) {
        if (links[i] === focused && i > 0) {
          links[i - 1].focus();
          break;
        }
      }
    }
    // If the right arrow key is pressed
    else if (e.key === 'ArrowRight') {
      for (var i = 0; i < links.length; i++) {
        if (links[i] === focused && i < links.length - 1) {
          links[i + 1].focus();
          break;
        }
      }
    }
  });
});





const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 200,
  minimumDistanceBetweenStars: 70,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["48, 99, 142", "252, 254, 255", "139, 190, 232"], /*Colors of gamecontroler
  https://coolors.co/070707-edae49-d1495b-00798c-30638e*/
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;
  
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
      selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
      px = value => withUnit(value, "px"),
      ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
        diffY = b.y - a.y;
  
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
      removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createStar = position => {
  const star = document.createElement("span"),
        color = selectRandom(config.colors);
  
  star.className = "star fa fa-gamepad";
  
  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);
  
  appendElement(star);

  removeElement(star, config.starAnimationDuration);
}


const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);

const updateLastStar = position => {
  last.starTimestamp = new Date().getTime();

  last.starPosition = position;
}

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
  if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

window.onpointermove = e => {
  const mousePosition = { x: e.pageX, y: e.pageY }
  
  adjustLastMousePosition(mousePosition);
 
  
  const now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
        hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;
  
  if(hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);
    
    updateLastStar(mousePosition);
  }

  
  updateLastMousePosition(mousePosition);
}

document.addEventListener('DOMContentLoaded', function() {

  document.body.onmouseleave = () => updateLastMousePosition(originPosition);
});



window.onload = function() {
  fetch('pages/navbar/navbar.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('navbar').innerHTML = data;
      });
};