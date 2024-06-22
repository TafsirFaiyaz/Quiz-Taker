const quizData = [
    {
        question: "What is the capital of France?",
        answers: {
            A: "Paris",
            B: "Berlin",
            C: "Madrid"
        },
        correctAnswer: "A"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: {
            A: "Earth",
            B: "Mars",
            C: "Jupiter"
        },
        correctAnswer: "B"
    },
    {
        question: "Who is the first person went to moon?",
        answers: {
            A: "Nelson Mendela",
            B: "Karl Marx",
            C: "Neil Armstrong"
        },
        correctAnswer: "C"
    },
    {
        question: "Who holds the most Ballondeor?",
        answers: {
            A: "Johan Cruyff",
            B: "Lionel Messi",
            C: "Cristiano Ronaldo"
        },
        correctAnswer: "B"
    },
    {
        question: "Who is currently the most famous figure in India?",
        answers: {
            A: "Shahrukh Khan",
            B: "Mahatma Gandhi",
            C: "APJ Abdul Kalam"
        },
        correctAnswer: "A"
    },
    {
        question: "Who is the best chess player in the world currently?",
        answers: {
            A: "Magnus Carlsen",
            B: "Hikado",
            C: "Lionel Messi"
        },
        correctAnswer: "A"
    },
    {
        question: "Which is the most valuable company right now?",
        answers: {
            A: "Microsoft",
            B: "Apple",
            C: "Nvidia"
        },
        correctAnswer: "C"
    },
    {
        question: "What planet is Elon Musk from?",
        answers: {
            A: "Earth",
            B: "Mars",
            C: "Jupiter"
        },
        correctAnswer: "A"
    },
    {
        question: "The best game of the year 2022 is?",
        answers: {
            A: "God of War",
            B: "A Plagues Tale",
            C: "Elden Ring"
        },
        correctAnswer: "C"
    },
    {
        question: "In what year was the first iPhone released?",
        answers: {
            A: "2000",
            B: "2007",
            C: "2010"
        },
        correctAnswer: "B"
    },
    {
        question: "Who came up with the theory of relativity?",
        answers: {
            A: "Newton",
            B: "Einstein",
            C: "Steven Hawking"
        },
        correctAnswer: "B"
    },

];

let totalQuestions = 0;
let correctAnswers = 0;
let answeredQuestions = []; // Array to store answered question numbers

// Function to start the quiz
function startQuiz() {
    // Reset quiz state
    totalQuestions = 0;
    correctAnswers = 0;
    answeredQuestions = []; // Reset answered questions array

    // Clear previous quiz results if any
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const selectedQuestions = getRandomQuestions(numQuestions);
    displayQuiz(selectedQuestions);
}

// Function to select random questions for the quiz
function getRandomQuestions(numQuestions) {
    // Shuffle quizData array to get random questions
    const shuffled = quizData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

// Function to display the quiz questions
function displayQuiz(questions) {
    const quizContainer = document.getElementById('quizContainer');
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = ''; // Clear previous questions

    totalQuestions = questions.length;

    questions.forEach((questionObj, index) => {
        const questionNumber = index + 1;
        const questionHTML = `
            <div class="question">
                <p><strong>Question ${questionNumber}:</strong> ${questionObj.question}</p>
                <form id="question${questionNumber}">
                    <label>
                        <input type="radio" name="answer${questionNumber}" value="A">
                        ${questionObj.answers.A}
                    </label><br>
                    <label>
                        <input type="radio" name="answer${questionNumber}" value="B">
                        ${questionObj.answers.B}
                    </label><br>
                    <label>
                        <input type="radio" name="answer${questionNumber}" value="C">
                        ${questionObj.answers.C}
                    </label><br>
                </form>
                <button onclick="checkAnswer(${questionNumber}, '${questionObj.correctAnswer}')">Submit Answer</button>
                <p id="result${questionNumber}"></p>
            </div>
        `;

        // Add the question to DOM only if it has not been answered before
        if (!answeredQuestions.includes(questionNumber)) {
            questionsDiv.innerHTML += questionHTML;
        }
    });

    quizContainer.style.display = 'block'; // Show the quiz container
}

// Function to check the user's answer
function checkAnswer(questionNumber, correctAnswer) {
    const form = document.getElementById(`question${questionNumber}`);
    const userAnswer = form.querySelector('input:checked');

    if (!userAnswer) {
        alert('Please select an answer.');
        return;
    }

    const userAnswerValue = userAnswer.value;

    const resultElement = document.getElementById(`result${questionNumber}`);
    if (userAnswerValue === correctAnswer) {
        resultElement.textContent = "CORRECT!";
        correctAnswers++;
    } else {
        resultElement.textContent = `INCORRECT. The correct answer is: ${correctAnswer}`;
    }

    // Add the answered question number to the array
    answeredQuestions.push(questionNumber);

    // Check if all questions have been answered
    if (totalQuestions === answeredQuestions.length) {
        showResults();
    }
}

// Function to display quiz results
function showResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Quiz Results</h2>
        <p>Total Questions: ${totalQuestions}</p>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Percentage: ${(correctAnswers / totalQuestions * 100).toFixed(2)}%</p>
    `;
}
