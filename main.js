(() => {
  let playing = true,
    activeHole = 1;

  const stop = () => playing = true,
    getHole = index => document.getElementById(`hole${index}`),
    deactivateHole = index =>
      getHole( index ).className = 'hole',
    activateHole = index =>
      getHole( index ).className = 'hole hole_has-mole',
    next = () => setTimeout(() => {
      if ( !playing ) {
        return;
      }
      deactivateHole( activeHole );
      activeHole = Math.floor( 1 + Math.random() * 9 );
      activateHole( activeHole );
      next();
    }, 800 );

  next();
})();
// Получаем ссылки на элементы с помощью их id
const holeElements = document.querySelectorAll(".hole");

// Инициализируем переменные
let deadCount = 0;
let lostCount = 0;
let levelCount = 0;

// Функция для обработки события клика на элемент
function handleClick(event) {
  const element = event.target;

  // Проверяем, есть ли у элемента класс 'hole_has-mole'
  if (element.classList.contains("hole_has-mole")) {
    // Увеличиваем значение переменной deadCount на 1
    deadCount++;

    // Проверяем, делится ли deadCount на 50 без остатка
    if (deadCount % 50 === 0) {
      // Увеличиваем значение переменной levelCount на 1
      levelCount++;
    }
  } else {
    // Увеличиваем значение переменной lostCount на 1
    lostCount++;

    // Проверяем, превышает ли значение lostCount 10
    if (lostCount > 10) {
      // Сбрасываем значения переменных lostCount, levelCount, deadCount
      lostCount = 0;
      levelCount = 0;
      deadCount = 0;
    }
  }
  // Обновляем значения переменных в HTML
  document.getElementById("dead").textContent = deadCount;
  document.getElementById("lost").textContent = lostCount;
  document.getElementById("level").textContent = levelCount;
}

// Добавляем обработчик клика для каждого элемента
holeElements.forEach((element) => {
  element.addEventListener("click", handleClick);
});



