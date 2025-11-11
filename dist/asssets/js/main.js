// 背景色をランダムに決める関数（重複削除済み）
function getRandomColor() {
  const colors = ['#D9D9D9', '#CCCCCC'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ハンバーガーメニューの動作
const hamburger = document.getElementById("hamburger");
const menuPanel = document.getElementById("menuPanel");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menuPanel.classList.toggle("active");
  hamburger.innerHTML = hamburger.classList.contains("active") ? "&times;" : "&#9776;";
});

// 背景図形のランダム配置（重なりを回避）
const shapeTypes = ['circle', 'square', 'triangle'];
const background = document.getElementById('background');
const placedShapes = [];

// 重なりチェック関数
function isOverlapping(x, y, size) {
  for (const shape of placedShapes) {
    const dx = shape.x - x;
    const dy = shape.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < (shape.size + size) / 2 + 10) { // 少し余白を持たせる
      return true;
    }
  }
  return false;
}

// 図形をランダムに20個配置
for (let i = 0; i < 20; i++) {
  const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
  const size = Math.floor(Math.random() * 40) + 80;
  const color = getRandomColor();

  let x, y, tries = 0;
  do {
    x = Math.random() * (window.innerWidth - size);
    y = Math.random() * (window.innerHeight - size);
    tries++;
  } while (isOverlapping(x, y, size) && tries < 100);

  if (tries >= 100) continue;

  const shape = document.createElement('div');
  shape.classList.add('shape', type);
  shape.style.position = 'absolute';
  shape.style.left = `${x}px`;
  shape.style.top = `${y}px`;

  if (type === 'triangle') {
    shape.style.width = '0';
    shape.style.height = '0';
    shape.style.borderLeft = `${size / 2}px solid transparent`;
    shape.style.borderRight = `${size / 2}px solid transparent`;
    shape.style.borderBottom = `${size}px solid ${color}`;
  } else {
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.backgroundColor = color;
  }

  // ランダムに回転角度を決めて適用（←ここを追加）
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const randomAngle = angles[Math.floor(Math.random() * angles.length)];
  shape.style.transform = `rotate(${randomAngle}deg)`;

  background.appendChild(shape);
  placedShapes.push({ x, y, size });
}

document.getElementById("contactBtn").addEventListener("click", function () {
  window.location.href = "contact.html";
});