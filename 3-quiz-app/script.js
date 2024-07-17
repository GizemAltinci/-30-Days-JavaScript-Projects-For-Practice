const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephanet", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is smallest country in the world",
    answers: [
      { text: "Vatikan City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepan", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "Which is largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");

const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  //İndeks 0'dan başladığı için, sorunun insan okuyucular için 1'den başlaması amacıyla 1 eklenir.
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    //answers dizisindeki her bir answer için belirtilen işlevi çalıştırır.
    const button = document.createElement("button"); //yeni bir HTML button elementi oluşturur ve button adlı bir değişkene atar.
    button.innerHTML = answer.text;
    button.classList.add("btn"); // Bu metod, button elementine "btn" adlı bir CSS sınıfı ekler. Bu sınıf, butonun stilini belirledik.
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

//yeni bir soruya geçmeden önce kullanıcı arayüzünü temizlemek- next gizle - cevap butonları temizle
function resetState() {
  nextButton.style.display = "none"; // cevap verip next diyip diğer soruya atlandığında next butonu görünmez olur
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
    //ilk elemanı kaldırıyorum.answerButtons içindeki tüm çocuk elemanlar (cevap butonları) kaldırılana kadar devam eder.
  }
}

// Tüm butonları dolaşarak doğru cevabı gösterir ve butonları devre dışı bırakır
function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct"); //doğru cevabı işaretleyerek kullanıcıya gösterir. Yanlışı seçsen de.
    }
    button.disabled = true; //Bu işlem, butonu devre dışı bırakır, yani kullanıcı bu butona artık tıklayamaz.
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    //Bu kontrol, mevcut sorunun dizideki son sorudan önce olup olmadığını belirler.
    handleNextButton(); //daha yanıtlanacak sorular varsa), handleNextButton fonksiyonu çağrılır. bu fonks, bir sonraki soruya geçmek için gerekli işlemleri yapar.
  } else {
    startQuiz(); //Eğer currentQuestionIndex toplam soru sayısına eşit veya büyükse (yani tüm sorular yanıtlanmışsa), startQuiz fonksiyonu çağrılır
  }
});

startQuiz();
