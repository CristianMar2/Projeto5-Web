const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

document.addEventListener('keydown', handleKeyboardInput);

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === 'clear') {
      limparDisplay();
    } else if (action === 'delete') {
      deletarCaractere();
    } else if (action === 'square') {
      quadrado();
    } else if (action === 'equals') {
      calcularResultado();
    } else {
      adicionarDisplay(value);
    }
  });
});

function adicionarDisplay(value) {
  display.value += value;
}

function limparDisplay() {
  display.value = '';
}

function deletarCaractere() {
  display.value = display.value.slice(0, -1);
}

function quadrado() {
  try {
    const result = Math.pow(eval(display.value), 2);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

function calcularResultado() {
  try {
    const result = eval(display.value);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

function handleKeyboardInput(event) {
  const key = event.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
    adicionarDisplay(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calcularResultado();
  } else if (key === 'Backspace') {
    deletarCaractere();
  } else if (key === 'Escape') {
    limparDisplay();
  }
}