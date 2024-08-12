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
    let demoQuestions = [
        {
            images: ['images/ques3even1.png', 'images/ques3even2.png', 'images/ques3even3.png', 'images/ques3odd.png'],
            oddIndex: 3
        },
        {
            images: ['images/ques9even1.png', 'images/ques9even2.png', 'images/ques9even3.png', 'images/ques9odd.png'],
            oddIndex: 3
        },
    ];
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
    let isDemo = true; // Flag to indicate if in demo mode

    startButton.addEventListener('click', () => {
        showScreen(gameScreen);
        loadQuestion();
    });

    nextButton.addEventListener('click', () => {
        if (isDemo) {
            currentQuestionIndex++;
            if (currentQuestionIndex < demoQuestions.length) {
                loadDemoQuestion();
            } else {
                alert("Demo completed! Click OK to start the main quiz.");
                isDemo = false; // Switch to main quiz mode
                currentQuestionIndex = 0; // Reset index for main quiz
                startTimer();
                loadQuestion();
            }
        } else {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showScoreScreen();
            }
        }
    });

    restartButton.addEventListener('click', () => {
        resetGame();
    });

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (isDemo) {
                handleDemoAnswer(index);
            } else {
                handleMainQuizAnswer(index);
            }
        });
    });

    function loadDemoQuestion() {
        const question = demoQuestions[currentQuestionIndex];
        cells.forEach((cell, index) => {
            cell.classList.remove('correct', 'wrong');
            cell.querySelector('.feedback-icon').classList.add('hidden');
            cell.querySelector('img').src = question.images[index];
        });
        updateProgressText();
    }

    function loadQuestion() {
        const question = isDemo ? demoQuestions[currentQuestionIndex] : questions[currentQuestionIndex];
        cells.forEach((cell, index) => {
            cell.classList.remove('correct', 'wrong');
            cell.querySelector('.feedback-icon').classList.add('hidden');
            cell.querySelector('img').src = question.images[index];
        });
        updateProgressText();
        updateProgressBar();
    }

    function handleDemoAnswer(index) {
        const question = demoQuestions[currentQuestionIndex];
        if (index === question.oddIndex) {
            cells[index].classList.add('correct');
            correctAnswers++;
        } else {
            cells[index].classList.add('wrong');
            const correctCell = cells[question.oddIndex];
            correctCell.classList.add('correct');
        }
        setTimeout(() => {
            nextButton.click(); // Trigger next button click after 1 second
        }, 1000);
    }

    function handleMainQuizAnswer(index) {
        const question = questions[currentQuestionIndex];
        if (index === question.oddIndex) {
            cells[index].classList.add('correct');
            correctAnswers++;
        } else {
            cells[index].classList.add('wrong');
            const correctCell = cells[question.oddIndex];
            correctCell.classList.add('correct');
        }
        setTimeout(() => {
            nextButton.click(); // Trigger next button click after 1 second
        }, 1000);
    }

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
        const progressPercent = ((currentQuestionIndex + 1) / (isDemo ? demoQuestions.length : questions.length)) * 100;
        progressBarFill.forEach(bar => {
            bar.style.width = `${progressPercent}%`;
        });
    }

    function updateProgressText() {
        let progressText;
        if (isDemo) {
            progressText = `Demo ${currentQuestionIndex + 1}/${demoQuestions.length}`;
        } else {
            progressText = `Progress ${currentQuestionIndex + 1}/${questions.length}`;
        }
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
    }    

    function showScoreScreen() {
        finalScoreElement.textContent = `Score: ${correctAnswers}/${questions.length}`;
        const minutes = Math.floor(totalTimeTaken / 60);
        const seconds = totalTimeTaken % 60;
        finalTimeElement.textContent = `Time Taken: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        // Send the score to the server (same as before)
        const currentDate = new Date().toISOString();
        const username = localStorage.getItem('username');
        console.log(`Saving score for user: ${username}, score: ${correctAnswers}, date: ${currentDate}`);
        
        fetch('/save-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                scoretest2: correctAnswers,
                date: currentDate
            })
        }).then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
            }
        }).catch(error => console.error('Error:', error));
    
        // Show the score screen
        showScreen(scoreScreen);
    }    

    const backToDashboardButton = document.getElementById('back-to-dashboard-button');
    const username = localStorage.getItem('username');
    if (backToDashboardButton) {
        backToDashboardButton.addEventListener('click', function() {
            window.location.href = `/dashboard?username=${username}`;
        });
    }

   
});