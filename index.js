const questions = [
    {
        question: 'How to write an IF statement in JavaScript?',
        answers: [
            { text: 'if i = 5 then', correct: false },
            { text: 'if(i == 5)', correct: true },
            { text: 'if i == then', correct: false },
            { text: 'if i = 5', correct: false }
        ]
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        answers: [
            { text: 'if(i <> 5)', correct: false },
            { text: 'if i <> 5', correct: false },
            { text: 'if(i != 5)', correct: true },
            { text: 'if i = !5 then', correct: false }
        ]
    },
    {
        question: 'How does a FOR loop start?',
        answers: [
            { text: 'for(i = 0; i<= 5)', correct: false },
            { text: 'for(i <= 5; i++)', correct: false },
            { text: 'for(i = 0; i <= 5; i++)', correct: true },
            { text: 'for i = 1 to 5', correct: false }
        ]
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: [
            { text: 'var colors = "red", "green", "blue"', correct: false },
            { text: 'var color = (1:"red", 2:"green", 3:"blue")', correct: false },
            { text: 'var colors = ["red", "green", "blue"]', correct: true },
            { text: 'var color = 1 = ("red"), ("green"), ("blue")', correct: false }
        ]
    },
    {
        question: 'How do you find the number with the highest value of x and y?',
        answers: [
            { text: 'Math.max = (x, y)', correct: true },
            { text: 'Math.ceil(x, y)', correct: false },
            { text: 'ceil(x, y)', correct: false },
            { text: 'top(x, y)', correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const questionButtons = document.getElementById('questionButtons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState(); // Reset any previous buttons and states

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        questionButtons.appendChild(button);
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    // Clear previous answers and hide the next button
    nextButton.style.display = 'none';
    while (questionButtons.firstChild) {
        questionButtons.removeChild(questionButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true'; // This should compare correctly now

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect'); // Add red background
    }
    Array.from(questionButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    // After an answer is selected, show the next button
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
