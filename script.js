let paletteCounter = 1; // Перемещаем переменную на верхний уровень

document.addEventListener('DOMContentLoaded', () => {
    let colorBoxes = document.querySelectorAll('.color');
    let container = document.querySelector('.container');
    let header = document.querySelector('header');
    let generateBtn = document.getElementById('generate-btn');
    let saveBtn = document.getElementById('save-btn');
    let showPalettesBtn = document.getElementById('show-palettes-btn');
    let savedPalettesContainer = document.getElementById('saved-palettes');
    let modal = document.getElementById('saved-palettes-modal');
    let closeBtn = document.querySelector('.close-btn');
    let lockButtons = document.querySelectorAll('.lock-btn');
  
    function getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    function generateColors() {
      let colors = [];
  
      colorBoxes.forEach((box, index) => {
        let randomColor;
        if (!box.classList.contains('locked')) { // Проверяем, не заблокирован ли цвет
          randomColor = getRandomColor();
          while (colors.includes(randomColor)) {
            randomColor = getRandomColor();
          }
        } else {
          randomColor = box.querySelector('.color-code').textContent; // Если цвет заблокирован, берем сохраненный
        }
        box.style.backgroundColor = randomColor;
        box.querySelector('.color-code').textContent = randomColor;
        colors.push(randomColor);
      });
  
      let headerColor = colors.shift();
      let buttonColor = colors.shift();
  
      header.style.backgroundColor = headerColor;
      generateBtn.style.backgroundColor = buttonColor;
      container.style.color = getRandomColor(); 
    }
  
    function savePalette() {
      let palette = Array.from(colorBoxes).map(box => box.querySelector('.color-code').textContent);
      displaySavedPalette(palette);
    }
  
    function displaySavedPalette(palette) {
      let paletteElement = document.createElement('div');
      paletteElement.className = 'saved-palette';
  
      let paletteNumber = document.createElement('span');
      paletteNumber.textContent = paletteCounter + '. ';
      paletteElement.appendChild(paletteNumber);
      paletteCounter++;
  
      palette.forEach(color => {
        let colorElement = document.createElement('div');
        colorElement.className = 'color';
        colorElement.style.backgroundColor = color;
        colorElement.textContent = color;
        paletteElement.appendChild(colorElement);
      });
  
      savedPalettesContainer.appendChild(paletteElement);
    }
  
    function showModal() {
      modal.style.display = 'block';
    }
  
    function closeModal() {
      modal.style.display = 'none';
    }
  
    function toggleLock() {
      this.classList.toggle('locked'); // Переключаем класс locked при клике
    }
  
    generateBtn.addEventListener('click', generateColors);
    saveBtn.addEventListener('click', savePalette);
    showPalettesBtn.addEventListener('click', showModal);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        closeModal();
      }
    });
  
    lockButtons.forEach(button => {
      button.addEventListener('click', toggleLock);
    });
  
    generateColors();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    let lockButtons = document.querySelectorAll('.lock-btn');
  
    function toggleLock() {
      let colorBox = this.parentElement; // Получаем родительский элемент цвета
      colorBox.classList.toggle('locked'); // Переключаем класс locked для цвета
    }
  
    lockButtons.forEach(button => {
      button.addEventListener('click', toggleLock);
    });
  });
  
  
