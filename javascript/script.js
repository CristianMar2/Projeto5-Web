// Obtém o elemento de display onde os números e resultados serão exibidos
const display = document.getElementById('display');

// Seleciona todos os botões com a classe 'button'
const buttons = document.querySelectorAll('.button');

// Adiciona um ouvinte de evento para capturar entradas do teclado
document.addEventListener('keydown', entradaDoTeclado);

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
    const result = Math.pow(parseFloat(display.value), 2);
    display.value = result; 
  } catch (error) {
    display.value = 'Error';
  }
}

// Calcula o resultado da expressão exibida no display
function calcularResultado() {
  try {
    const expressaoInfixa = display.value;
    const expressaoPosfixa = infixaParaPosFixa(expressaoInfixa);
    const result = calcularPosfixa(expressaoPosfixa);
    display.value = result; 
  } catch (error) {
    display.value = 'Error';
  }
}

// Captura e manipula entradas do teclado
function entradaDoTeclado(event) {
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

// Converte a expressão infixa para pós-fixa
function infixaParaPosFixa(expression) {
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  const stack = [];
  const output = [];
  const tokens = expression.match(/(\d+(\.\d+)?|[+\-*/()])/g);

  tokens.forEach(token => {
    if (!isNaN(token)) {
      // Números vão diretamente para a saída
      output.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      stack.pop(); // Remove '('
    } else {
      // Operadores
      while (
        stack.length > 0 &&
        precedence[token] <= precedence[stack[stack.length - 1]]
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  });

  while (stack.length > 0) {
    output.push(stack.pop());
  }

  return output;
}

// Avalia a expressão pós-fixa
function calcularPosfixa(postfix) {
  const stack = [];

  postfix.forEach(token => {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
        default:
          throw new Error('Invalid operator');
      }
    }
  });

  return stack.pop();
}
