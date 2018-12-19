
oxo.inputs.listenKey('space', function () {
  if (oxo.screens.getCurrentScreen !== 'game') {
    oxo.screens.loadScreen('game', game);
  }
});

function game() {

  var cube;
  var size = 40; // The size of a game square
  var xSquares = 1280 / 40; // Number of square on x axis

  oxo.player.setScore(0);
  timer = setInterval(function () {
    oxo.player.addToScore(1);
  }, 500);

  var cube = document.getElementById('square'); // Get the cube element
  oxo.inputs.listenKeys(['left', 'right'], function (key) {   // Move the balloon on right or left
    var position = oxo.animation.getPosition(cube);
    console.log(position);
    if (key === 'left' && position.x > 0) {
      oxo.animation.move(cube, 'left', 10);
    }
    if (key === 'right' && position.x < 10000) {
      oxo.animation.move(cube, 'right', 10);
    }
  });

  function addBonus() {
    var bonus = oxo.elements.createElement({
      class: 'square__ennemy',
      styles: {
        transform:
          'translate(' +
          oxo.utils.getRandomNumber(0, xSquares - 1) * size +
          'px, 0px)',
      },
    });
    setTimeout(addBonus, 1000);
    setInterval(function () {
      oxo.animation.move(bonus, 'down', 1); // Move 10px to the right
    }, 5);
    var cube = document.getElementById('square');
    oxo.elements.onCollisionWithElement(cube, bonus, function () {
      oxo.screens.loadScreen('end', end);
    });
  }
  addBonus();
}

function end() {

}
