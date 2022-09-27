//creating a class quiz containing the three parameters
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
//to get the question number
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
//to check if the answer is right or not
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
     //incrementing the score if the answer is correct
        this.score++;
    }
    //incrementing the question number
    this.questionIndex++;
}
//to check if the test is ended or not
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
//giving three parameters for the quiz
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
//checking if the choice made by user is correct or not
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
// Displaying the question
function displayQuestion() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // showing question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options and checking the number of choices
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        //function to check the progress
        showProgress();
    }
};
//to check if the guess made is correct or not
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};
//to chech the question number and progress of the user
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};
function showScores() {
    //using jquery to to display the score of the quiz
    let quizEndHTML = 
    `
    <h1>Quiz Completed</h1>
    <h2 id='score'> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="project.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "How many sizes of headers are available in HTML by default?", 
        ["5", "1","3", "6"], "6"
    ),
    new Question(
        "How can we change the background color of an element?", 
        ["background-color", "color", "Both a and b", "None"], "background-color"
    ),
    new Question(
        "Javascript is what type of a language?", 
        ["Object-Based", "Object-Oriented","Procedural", "None of the above"], "Object-Oriented"
        ),
    new Question(
        "How to create an ordered list in HTML using <> brackets?", 
        ["ul", "li", "ol", "All of the above"], "ol"
        ),
    new Question(
        "Which HTML tag is used to declare internal CSS?", 
        ["style","link","script", "Both a and c"], "style"
        ),
    new Question(
        "What keyword is used to check whether a given property is valid or not?", 
        ["is in", "in","exists", "lies"], "in"
        ),
    new Question(
        "How to display preformatted text in HTML using <> brackets?", 
        ["p", "hr","pre", "None of these"], "pre"
        ),
    new Question(
        "How can we write comments in CSS?", 
        ["@", "*","//", "/* */"], "/* */"
        ),   
    new Question(
        "When an operators value is NULL, the typeof returned by the unary operator is?", 
        ["object", "undefined","integer", "boolean"], "object"
        ), 
    new Question(
        "Which of the following are valid ways to represent a colour in CSS?", 
        ["A valid colour name", "RGB value","HEX value", "All of the above"], "All of the above"
        ) 
];



// create quiz
let quiz = new Quiz(questions);

// display quiz
displayQuestion();

// Add A CountDown for the Quiz
//taking the timer to 1 sec
let time = 1;
//converting hours to minutes
let quizTimeInMinutes = time * 60 * 60;
//converting minutes to seconds
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown(){
    //using setinterval 
    let quizTimer = setInterval(function(){
    if(quizTime <= 0) {
        clearInterval(quizTimer);
        showScores();
    } else {
        //for decrementing the time each second
        quizTime--;
        //for converting the time to min and sec
        let sec = Math.floor(quizTime % 60);
        let min = Math.floor(quizTime / 60) % 60;
        //using jquery to display the time 
        counting.innerHTML = `TIME: ${min} : ${sec}`;   
    } 
    //for changing the time each second
},1000);
}
//function call for starting the timer
startCountdown();