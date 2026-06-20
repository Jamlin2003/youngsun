const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

const questions = [
  '我目前有清楚想努力的方向。',
  '我有穩定的讀書或自我成長習慣。',
  '我會把目標拆成具體計畫。',
  '遇到困難時，我會主動調整方法。',
  '我願意影響或陪伴其他人一起成長。'
];
let current = 0;
let total = 0;
const stepEl = document.getElementById('quizStep');
const questionEl = document.getElementById('quizQuestion');
const resultEl = document.getElementById('quizResult');
const resetEl = document.getElementById('quizReset');
const optionWrap = document.querySelector('.quiz-options');

function resultText(score){
  if(score <= 7) return '🌱 探索者｜你正在尋找方向。推薦你從企圖心課程與社員故事開始，先看見自己想變好的理由。';
  if(score <= 12) return '🔥 行動者｜你已經開始努力。推薦你接觸 LOL 生命契約與時間管理，把行動變得更穩定。';
  if(score <= 16) return '🎯 規劃者｜你有目標也有計畫。推薦你加入自學小組與學習八法，讓計畫持續推進。';
  return '🚀 領航者｜你正在持續成長，也有機會帶動他人。推薦你挑戰帶領小組或參與幹部任務。';
}

document.querySelectorAll('.quiz-options button').forEach(btn => {
  btn.addEventListener('click', () => {
    total += Number(btn.dataset.score);
    current++;
    if(current < questions.length){
      stepEl.textContent = current + 1;
      questionEl.textContent = questions[current];
    } else {
      optionWrap.hidden = true;
      questionEl.textContent = '你的成長羅盤結果';
      resultEl.hidden = false;
      resultEl.textContent = resultText(total);
      resetEl.hidden = false;
    }
  });
});

resetEl?.addEventListener('click', () => {
  current = 0; total = 0;
  stepEl.textContent = '1';
  questionEl.textContent = questions[0];
  optionWrap.hidden = false;
  resultEl.hidden = true;
  resetEl.hidden = true;
});

document.querySelectorAll('.step').forEach(step => {
  step.addEventListener('click', () => {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    step.classList.add('active');
    document.getElementById('timelineDetail').textContent = step.dataset.detail;
  });
});

document.querySelectorAll('.course-picker button').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('courseResult').textContent = button.dataset.course;
  });
});

document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});
