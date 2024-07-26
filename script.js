document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const nextButton = document.getElementById('nextButton');
    const restartButton = document.getElementById('restartButton');
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');
    const resultScreen = document.querySelector('.result-screen');
    const scoreScreen = document.querySelector('.score-screen');
    const cells = document.querySelectorAll('.cell');
    const timerElement = document.querySelector('.timer');
    const progressElement = document.querySelectorAll('.progress');
    const feedbackElement = document.querySelector('.feedback');
    const progressBarFill = document.querySelectorAll('.progress-bar-fill');
    const finalScoreElement = document.getElementById('finalScore');
    const finalTimeElement = document.getElementById('finalTime');

    let timeLeft = 90; // 1:30 in seconds
    let timerInterval;
    let correctAnswers = 0;
    let questions = [
        {
            images: ['images/ques1odd.png', 'images/ques1even.png', 'images/ques1even.png', 'images/ques1even.png'],
            oddIndex: 0
        },
        {
            images: ['images/ques2even.png', 'images/ques2even.png', 'images/ques2odd.png', 'images/ques2even.png'],
            oddIndex: 2
        },
        {
            images: ['images/ques3even1.png', 'images/ques3even2.png', 'images/ques3even3.png', 'images/ques3odd.png'],
            oddIndex: 3
        },
        {
            images: ['images/ques4even1.png', 'images/ques4odd.png', 'images/ques4even2.png', 'images/ques4even3.png'],
            oddIndex: 1
        },
        {
            images: ['images/ques5even1.png', 'images/ques5odd.png', 'images/ques5even2.png', 'images/ques5even3.png'],
            oddIndex: 1
        },
        {
            images: ['images/ques6odd.png', 'images/ques6even1.png', 'images/ques6even2.png', 'images/ques6even3.png'],
            oddIndex: 0
        },
        {
            images: ['images/ques7even1.png', 'images/ques7even2.png', 'images/ques7odd.png', 'images/ques7even3.png'],
            oddIndex: 2
        },
        {
            images: ['images/ques8even1.png', 'images/ques8even2.png', 'images/ques8even3.png', 'images/ques8odd.png'],
            oddIndex: 3
        },
        {
            images: ['images/ques9even1.png', 'images/ques9even2.png', 'images/ques9even3.png', 'images/ques9odd.png'],
            oddIndex: 3
        },
        {
            images: ['images/ques10even1.png', 'images/ques10even2.png', 'images/ques10even3.png', 'images/ques10odd.png'],
            oddIndex: 3
        },
    ];
    
    let currentQuestionIndex = 0;
    let totalTimeTaken = 0;

    startButton.addEventListener('click', () => {
        showScreen(gameScreen);
        startTimer();
        loadQuestion();
    });

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            showScreen(gameScreen);
        } else {
            showScoreScreen();
        }
    });

    restartButton.addEventListener('click', () => {
        resetGame();
    });

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (index === questions[currentQuestionIndex].oddIndex) {
                feedbackElement.textContent = 'Correct!';
                feedbackElement.classList.add('correct');
                feedbackElement.classList.remove('wrong');
                correctAnswers++;
            } else {
                feedbackElement.textContent = 'Wrong!';
                feedbackElement.classList.add('wrong');
                feedbackElement.classList.remove('correct');
            }
            setTimeout(() => {
                showScreen(resultScreen);
                updateProgressBar(); // Update the progress bar when showing the result screen
                updateProgressText(); // Update the progress text when showing the result screen
            }, 1000);
        });
    });

    function startTimer() {
        timerElement.textContent = '01:30'; // Initial display
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showScoreScreen();
                return;
            }
            timeLeft--;
            totalTimeTaken++;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000); // Update every second
    }

    function updateProgressBar() {
        const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBarFill.forEach(bar => {
            bar.style.width = `${progressPercent}%`;
        });
    }

    function updateProgressText() {
        const progressText = `Progress ${currentQuestionIndex + 1}/${questions.length}`;
        progressElement.forEach(progress => {
            progress.textContent = progressText;
        });
    }

    function showScreen(screen) {
        document.querySelectorAll('.container').forEach(container => {
            container.classList.add('hidden');
        });
        screen.classList.remove('hidden');
        
        if (screen === startScreen) {
            startButton.style.display = 'block';
        } else {
            startButton.style.display = 'none';
        }
        
        if (screen === resultScreen) {
            nextButton.style.display = 'block';
        } else {
            nextButton.style.display = 'none';
        }

        // Timer should continue running; no need to reset it here
    }    

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        cells.forEach((cell, index) => {
            cell.querySelector('img').src = question.images[index];
        });
        updateProgressText(); // Ensure progress text is updated on the game screen
        updateProgressBar(); // Ensure progress bar is updated on the game screen
    }

    function showScoreScreen() {
        finalScoreElement.textContent = `Score: ${correctAnswers}/${questions.length}`;
        const minutes = Math.floor(totalTimeTaken / 60);
        const seconds = totalTimeTaken % 60;
        finalTimeElement.textContent = `Time Taken: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        showScreen(scoreScreen);
    }

    function resetGame() {
        clearInterval(timerInterval);
        currentQuestionIndex = 0;
        timeLeft = 90;
        totalTimeTaken = 0;
        correctAnswers = 0;
        updateProgressText(); // Reset progress text to 1/x at the start
        timerElement.textContent = '01:30'; // Reset timer display
        showScreen(startScreen); // Use showScreen to reset visibility
        updateProgressBar(); // Reset the progress bar to 0% at the start
    }
});