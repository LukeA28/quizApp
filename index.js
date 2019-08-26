let questionNumber = 0;
let score = 0;

//generate question html
function questionContent() {
  if (questionNumber < STORE.length) {
    return `
    <div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
      <form class="form">
      <fieldset>
        <label class="answerOption">
          <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" class="radioButton" required>
          <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
          <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" class="radioButton" required>
          <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
          <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" class="radioButton" required>
          <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
          <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" class="radioButton" required>
          <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" tabindex="0" class="submitButton">Submit</button>
      </fieldset>
      </form>
    </div>
    `;
  } else {
    displayResults();
    restartQuiz();
    $('.questionNumber').text(10);
  }
}

//increment question number
function increaseQuestionNumber() {
    questionNumber++;
  $('.questionNumberContent').text(questionNumber + 1);
}

//increment score
function changeScore() {
  score++;
}

//start quiz
//on startQuizButton click home page div
//unhide question form div
function startQuiz() {
  $('.startText').on('click', '.begin', function(event) {
    $('.startText').remove();
    $('.questionForm').css('display', 'block');
    $('.questionNumberContent').text(1);
});
}

// render question in DOM
function renderQuestion() {
  $('.questionForm').html(questionContent());
}

//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('form').on('submit', function(event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionForm').html(`
  <div class="textBox correctFeedback">
    <h2 class="answerFeedback"><b>CORRECT!<br>GREAT FORM!</b></h2>
    <button type="button" class="nextButton">Next</button>
  </div>
  `);
}

//user feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionForm').html(`
  <div class="textBox incorrectFeedback">
    <h2 class="answerFeedback"><b>INCORRECT!<br>KEEP GOING!</b></h2>
    <button type="button" class="nextButton">Next</button>
  </div>
  `);
}

//update score text
function updateScore () {
  changeScore();
  $('.scoreCount').text(score);
}

//when quiz is over this is the html for the page
function displayResults () {
  if (score >= 8) {
    $('.main').html(`<div class="textBox highScore"><h2 class="highScoreText">YOU GOT <br>THE GOLD!</h2><button class="nextButton restart">Restart Quiz</button></div>`);
    $('.questionNumberContent').text('10');
  } else if (score < 8 && score >= 5) {
    $('.main').html(`<div class="textBox midScore"><h2 class="midScoreText">YOU ALMOST MADE <br>THE PODIUM!</h2><button class="nextButton restart">Restart Quiz</button></div>`);
    $('.questionNumberContent').text('10');
  } else {
    $('.main').html(`<div class="textBox lowScore"><h2 class="lowScoreText">YOU PULLED <br>A HAMSTRING</h2><button class="nextButton restart">Restart Quiz</button></div>`);
    $('.questionNumberContent').text('10');
  }
}

//what happens when the user clicks next
function renderNextQuestion () {
  $('.questionForm').on('click', '.nextButton', function() {
      console.log('renderNextQuestion ran');
      event.preventDefault;
      increaseQuestionNumber();
      renderQuestion();
      userSelectAnswer();
  });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  console.log('restartQuiz ran')
  $('main').on('click', '.restart', function (event) {
    location.reload();
  });
}

//run quiz functions
function enableQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(enableQuiz);