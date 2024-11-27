// Obtém o elemento de display onde os números e resultados serão exibidos
const display = document.getElementById('display');

// Seleciona todos os botões com a classe 'button'
const buttons = document.querySelectorAll('.button');

// Adiciona um ouvinte de evento para capturar entradas do teclado
document.addEventListener('keydown', handleKeyboardInput);

// Adiciona ouvintes de eventos de clique a cada botão
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;   

    // Define ações específicas para cada tipo de botão
    if (action === 'clear') {
      limparDisplay(); // Limpa o conteúdo do display
    } else if (action === 'delete') {
      deletarCaractere(); // Apaga o último caractere do display
    } else if (action === 'square') {
      quadrado(); // Calcula o quadrado do número no display
    } else if (action === 'equals') {
      calcularResultado(); // Calcula o resultado da expressão
    } else {
      adicionarDisplay(value); // Adiciona o valor ao display
    }
  });
});

// Adiciona o valor ao display
function adicionarDisplay(value) {
  display.value += value;
}

// Limpa o conteúdo do display
function limparDisplay() {
  display.value = ''; 
}

// Apaga o último caractere no display
function deletarCaractere() {
  display.value = display.value.slice(0, -1); 
}

// Calcula o quadrado do número exibido no display
function quadrado() {
  try {
    // Avalia a expressão atual no display e calcula o quadrado
    const result = Math.pow(eval(display.value), 2);
    display.value = result; 
  } catch (error) {
    display.value = 'Error';
  }
}

// Calcula o resultado da expressão exibida no display
function calcularResultado() {
  try {
    // Usa eval para avaliar a expressão matemática
    const result = eval(display.value);
    display.value = result; 
  } catch (error) {
    display.value = 'Error';
  }
}

// Captura e manipula entradas do teclado
function handleKeyboardInput(event) {
  const key = event.key;

  // Adiciona números e operadores válidos ao display
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
