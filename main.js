let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

const cells = document.querySelectorAll("td");
const answers = document.getElementsByClassName("answer");

// Obtiene todas las preguntas de la API
fetch('https://6687332d0bc7155dc016f1d5.mockapi.io/acentuacion')
    .then(response => response.json())
    .then(data => {
        window.questions = data;
        console.log('Preguntas obtenidas:', data); // Verifica que las preguntas se obtienen correctamente
});

// Función para obtener una pregunta aleatoria
const mockAPI = () => {
  if (window.questions && window.questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * window.questions.length);
    return window.questions[randomIndex];
  } else {
      console.error('No se han cargado las preguntas aún.');
      return null;
  }
};

// Función para agregar el evento clic de cada celda
function addClickEvent() {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
});
  console.log("Eventos clic agregados a cada celda.")
};

// Función para remover el evento clic de cada celda
function removeClickEvent() {
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
 console.log("Eventos clic removidos de cada celda.");
}

function handleClick(event) {
  const cellIndex = Array.from(cells).indexOf(event.target);
  console.log(cellIndex);

  if (board[cellIndex] != "") {
    return;
  }

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    console.log("Ganaste");
  }

  currentPlayer = currentPlayer == "X" ? "O" : "X";
}

function checkWin() {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // veticales
    [0, 4, 8],
    [2, 4, 6], // diagonales
  ];

  for (let index = 0; index < winCondition.length; index++) {
    const winElement = winCondition[index];
    let isWin = true;
    for (let index2 = 0; index2 < winElement.length; index2++) {
      const posWin = winElement[index2];
      if (board[posWin] != currentPlayer) {
        isWin = false;
      }
    }
    if (isWin) {
      return true;
    }
  }

  return false;

  return winConditions.some((condition) => {
    return condition.every((index) => board[index] === currentPlayer);
});
}

//Botón jugar
const botonJugar = document.getElementById('jugar');
botonJugar.addEventListener('click', (e) => {
  resetGame();
  // Mostrar pregunta
  showQuestion();
});

const questionContainerX = document.getElementById("question-container-X");
const questionContainerO = document.getElementById("question-container-O");
    
// Reinicia el juego: limpia el tablero, el jugador es X y cambia la leyenda del botón
const resetGame = () => {
  botonJugar.textContent = 'Reiniciar';
  board = Array(9).fill(null);
  cells.forEach(cell => cell.textContent = '');
  questionContainerO.classList.add('hidden');
  questionContainerX.classList.add('hidden');
  currentPlayer = 'X';
};


// Mostrar una pregunta en el panel del currentPlayer
const showQuestion = () => {
    const questionData = mockAPI();
    console.log(questionData); //muestra la pregunta elegida
    if (currentPlayer === 'X'){
      questionContainerO.classList.add('hidden');
      questionContainerX.classList.remove('hidden');
    }else{
      questionContainerX.classList.add('hidden');
      questionContainerO.classList.remove('hidden');
    }
    const question = document.getElementById('question');  
    question.textContent = questionData.Pregunta;
    
    answer.forEach((btn, index) => {
    //btn.textContent = questionData[`Respuesta${index + 1}`];
    btn.onclick = () => checkAnswer(index + 1, questionData.Verdadera);
    });
    
  };

 // Verificar la respuesta
 const checkAnswer = (selectedAnswer, correctAnswer) => {
  questionContainer.classList.add('hidden');
  if (selectedAnswer === correctAnswer) {
    addClickEvent();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    removeClickEvent()
  } else {
    alert('Respuesta incorrecta - Turno del otro jugador.');
  }
};
