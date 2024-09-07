const questions = [
    {
        question: 'When was John the Baptist baptizing people?',
        answers: [
            { text: 'Jordan River', correct: true },
            { text: 'Euphrate River', correct: false },
            { text: 'Dead Sea', correct: false },
            { text: 'Sea of Galilee', correct: false }
        ]
    },
    {
        question: 'When a great storm threatened their ship, what were the disciples doing?',
        answers: [
            { text: 'Eating', correct: false },
            { text: 'Preaching', correct: false },
            { text: 'Sleeping', correct: true },
            { text: 'Praying', correct: false }
        ]
    },
    {
        question: 'How does this scripture end? "I have fought a good fight, I have finished my course..."',
        answers: [
            { text: 'I have overcome the world', correct: false },
            { text: 'Let freedom ring', correct: false },
            { text: 'Tomorrow belongs to me', correct: false },
            { text: 'I have kept the faith', correct: true }
        ]
    },
    {
        question: 'In 1 Samuel 8:5, the Israelites ask Samuel to appoint ________.',
        answers: [
            { text: 'A bishop', correct: false },
            { text: 'A king', correct: true },
            { text: 'A senator', correct: false },
            { text: 'A knight', correct: false }
        ]
    },
    {
        question: 'Who stopped Abraham from slaying his son?',
        answers: [
            { text: 'No one', correct: false },
            { text: 'Angel of the Lord', correct: true },
            { text: 'Satan', correct: false },
            { text: 'He stopped himself', correct: false }
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
