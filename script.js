const imageFolder = 'images/';
const imageList = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '16.jpg'
  // add all your filenames here
];

const table = document.getElementById('table');
const wrapper = document.querySelector('.table-wrapper');
const rect = wrapper.getBoundingClientRect();

// This offset pushes photos DOWN so they sit on the table surface
const topOffset = 120; // adjust if needed

// Create draggable photos
imageList.forEach((file, i) => {
  const img = document.createElement('img');
  img.src = imageFolder + file;
  img.className = 'photo';

  // random scatter INSIDE the table surface area
  const maxX = rect.width - 200;  
  const maxY = rect.height - 200 - topOffset;

  img.style.left = Math.random() * maxX + 'px';
  img.style.top = topOffset + Math.random() * maxY + 'px';
  img.style.transform = `rotate(${(Math.random()*20 - 10)}deg)`;

  // click to fullscreen
  img.addEventListener('click', () => openFullscreen(img));

  makeDraggable(img);
  table.appendChild(img);
});

function makeDraggable(el) {
  let offsetX, offsetY;

  el.addEventListener('mousedown', e => {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;

    function move(e) {
      el.style.left = e.clientX - offsetX + 'px';
      el.style.top = e.clientY - offsetY + 'px';
    }

    document.addEventListener('mousemove', move);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', move);
    }, { once: true });
  });
}

function openFullscreen(img) {
  const fs = document.createElement('div');
  fs.id = 'fullscreen';
  fs.style.display = 'flex';

  const big = document.createElement('img');
  big.src = img.src;

  fs.appendChild(big);
  document.body.appendChild(fs);

  fs.addEventListener('click', () => {
    fs.remove();
    img.remove(); // remove from table
    checkIfDone();
  });
}

function checkIfDone() {
  if (document.querySelectorAll('.photo').length === 0) {
    const box = document.getElementById('message-box');
    box.classList.remove('hidden');
    setTimeout(() => box.style.opacity = 1, 50);
  }
}
