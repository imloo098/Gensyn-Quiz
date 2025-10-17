const questions = [
  {
    q: 'What is Gensyn primarily building?',
    options: [
      'An AI chatbot platform',
      'A verifiable compute protocol for machine learning', // Correct
      'A centralized cloud provider',
      'An NFT marketplace'
    ],
    a: 1,
    e: 'Gensyn is focused on decentralized, verifiable compute for ML training.'
  },
  {
    q: 'What does the Verde system in Gensyn do?',
    options: [
      'Encrypts AI models',
      'Verifies ML work done by untrusted nodes', // Correct
      'Schedules compute jobs on AWS',
      'Stores models on-chain'
    ],
    a: 1,
    e: 'Verde is the core verification layer, ensuring the computation was done correctly.'
  },
  {
    q: 'What problem does Gensyn aim to solve?',
    options: [
      'AI model copyright disputes',
      'Centralized compute monopolies in AI training', // Correct
      'Image generation latency',
      'Quantum computing security'
    ],
    a: 1,
    e: 'The protocol aims to democratize AI training by breaking up compute monopolies.'
  },
  {
    q: 'Which of the following is NOT a core Gensyn component?',
    options: [
      'Judge',
      'NoLoCo',
      'Verde',
      'TensorVault' // Correct
    ],
    a: 3,
    e: 'Judge, NoLoCo, and Verde are core components. TensorVault is not.'
  },
  {
    q: 'What is the function of "Judge" in Gensyn?',
    options: [
      'Evaluates AI models transparently', // Correct
      'Hosts front-end apps',
      'Generates datasets',
      'Performs network routing'
    ],
    a: 0,
    e: 'The Judge is the mechanism for evaluating and verifying the results of the trained models.'
  },
  {
    q: 'What is unique about Gensyn’s training architecture (NoLoCo)?',
    options: [
      'Trains models without all-reduce operations', // Correct
      'Runs only on GPUs',
      'Uses blockchain for training data',
      'Requires offline syncing'
    ],
    a: 0,
    e: 'NoLoCo (No Local Communication) is a unique architecture designed to avoid traditional, communication-heavy "all-reduce" operations, making decentralized training viable.'
  },
  {
    q: 'What kind of network is Gensyn creating?',
    options: [
      'A centralized supercomputer',
      'A decentralized compute coordination layer', // Correct
      'A model marketplace',
      'A token staking protocol'
    ],
    a: 1,
    e: 'Gensyn is building a decentralized layer to coordinate distributed compute resources globally.'
  },
  {
    q: 'How does Gensyn ensure trust in compute results?',
    options: [
      'By using cryptographic verification of work', // Correct
      'By trusting large providers',
      'By keeping compute private',
      'By using cloud certification'
    ],
    a: 0,
    e: 'Cryptographic verification ensures the work was done correctly without having to trust the provider.'
  },
  {
    q: 'What type of resources can participants contribute to Gensyn?',
    options: [
      'Compute power and hardware', // Correct
      'Music and videos',
      'NFTs',
      'Advertising space'
    ],
    a: 0,
    e: 'Providers contribute their unused compute power, primarily GPUs and CPUs.'
  },
  {
    q: 'What is the ultimate goal of Gensyn?',
    options: [
      'To make AI training open, verifiable, and permissionless', // Correct
      'To build a closed AI platform',
      'To replace blockchain technology',
      'To centralize GPU access'
    ],
    a: 0,
    e: 'The mission is to create a fully open and permissionless AI training infrastructure.'
  }
];


// Global state variables are kept the same
let currentIndex = 0;
let score = 0;

// Get the root element once
const quizRoot = document.getElementById('quiz');

/**
 * Renders the current question and its options.
 */
function renderQuestion() {
  const current = questions[currentIndex];
  const total = questions.length;

  quizRoot.innerHTML = `
    <h2>Question ${currentIndex + 1} of ${total}</h2>
    <p class="question">${current.q}</p>
    <div class="options">
      ${current.options
        .map((opt, idx) => `<button class="btn" data-index="${idx}">${opt}</button>`) 
        .join('')}
    </div>
    <div class="explanation-box" id="explanation-box"></div>
  `;
}


/**
 * Renders the final quiz result.
 */
function renderResult() {
  quizRoot.innerHTML = `
    <h2>Quiz Complete 🎉</h2>
    <div class="score">Your Score: ${score} / ${questions.length}</div>
    <button class="btn accent" data-action="restart" id="restart">Restart Quiz</button>
    <div class="credits">Created by Lohith · <a href="https://x.com/k2sbhai" target="_blank" rel="noopener">@lohith0001</a></div>
  `;
}


/**
 * Handles the user's answer selection.
 * @param {Event} e - The click event object.
 */
function onAnswer(e) {
  const target = e.target;
  // Ensure the click was on an option button
  if (!target.classList.contains('btn') || target.hasAttribute('data-action')) {
    return;
  }
  
  const selectedIndex = Number(target.getAttribute('data-index'));
  const currentQuestion = questions[currentIndex];
  const correctIndex = currentQuestion.a;
  
  const buttons = quizRoot.querySelectorAll('button.btn');
  const explanationBox = document.getElementById('explanation-box');

  // Disable all option buttons immediately
  buttons.forEach((b) => b.disabled = true);

  // Apply feedback classes
  buttons.forEach((b) => {
    const idx = Number(b.getAttribute('data-index'));
    if (idx === correctIndex) {
      b.classList.add('correct');
    }
    if (idx === selectedIndex && idx !== correctIndex) {
      b.classList.add('incorrect');
    }
  });

  // Display explanation
  if (currentQuestion.e) {
    explanationBox.innerHTML = `<p><strong>Explanation:</strong> ${currentQuestion.e}</p>`;
  }

  // Update score
  if (selectedIndex === correctIndex) {
    score += 1;
  }

  // Proceed after short delay to show feedback
  setTimeout(() => {
    if (currentIndex + 1 < questions.length) {
      currentIndex += 1;
      renderQuestion();
    } else {
      renderResult();
    }
  }, 1500); // Increased delay slightly to 1.5s to read the explanation
}

/**
 * Initializes the quiz and sets up the main event listener (Event Delegation).
 */
function initializeQuiz() {
    quizRoot.addEventListener('click', (e) => {
        const target = e.target;
        
        // Handle answer selection
        if (target.classList.contains('btn') && target.hasAttribute('data-index')) {
            onAnswer(e);
        }

        // Handle restart button click
        if (target.id === 'restart' || target.getAttribute('data-action') === 'restart') {
            currentIndex = 0;
            score = 0;
            renderQuestion();
        }
    });

    // Initial render
    renderQuestion();
}


// Initialize the quiz
initializeQuiz();
