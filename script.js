const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click',() => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion() 
}

function setNextQuestion() {
    //resetState() to clear everything related to form question or body 
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer =>{
        const button = document.createElement('button')
        button.innerText= answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild)
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2+2 ?',
        answers:[
            {text: '4', correct: true},
            {text: '22', correct:false}
        ]
    },
    {
        question: 'Which language you use to code the most ?',
        answers:[
            {text: 'Java', correct: true},
            {text: 'C', correct: false},
            {text: 'C++', correct: true},
            {text: 'Python', correct: false}
        ]
    },
    {
        question: 'What is the name of your University ?',
        answers:[
            {text: 'Santa Clara University', correct: false},
            {text: 'San Jose State Unversity', correct:true},
            {text : 'Stanford University', correct:false},
            {text : 'New York University', correct: false}
        ]
    },
    {
        question: 'Is  Web Development fun ?',
        answers:[
            {text: 'yes', correct:true},
            {text : 'No', correct:false}
        ]
    },
    {
        question: 'What is 4 * 2 ?',
        answers:[
            {text: '8', correct: true},
            {text: '12', correct:false},
            {text : '42', correct:false},
            {text : 'None of them', correct: false}
        ]
    },
    {
        question: 'Where is san jose ?',
        answers:[
            {text: 'florida', correct: false},
            {text: 'nevada', correct:false},
            {text : 'california', correct:true},
            {text : 'chicago', correct: false}
        ]
    }

]