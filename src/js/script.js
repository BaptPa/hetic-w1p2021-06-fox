
oxo.inputs.listenKeyOnce('enter', function () {
  oxo.screens.loadScreen('game', game);
});

function game() {

  var cube;
  var size = 40; // The size of a game square
  var xSquares = 1280 / 40; // Number of square on x axis
  var ySquares = 800 / 40; // Number of square on y axis

  var cube = document.getElementById('cube'); // Get the cube element
  oxo.inputs.listenKeys(['left', 'right'], function (key) {   // Move the balloon on right or left
    var position = oxo.animation.getPosition(cube);
    console.log(position);
    if (key === 'left' && position.x > 0) {
      oxo.animation.move(cube, 'left', 20);
    }
    if (key === 'right' && position.x < 1280) {
      oxo.animation.move(cube, 'right', 20);
    }
  });

  function addBonus() {
    // Add a bonus element to the screen at a random position
    var bonus = oxo.elements.createElement({
      class: 'square__ennemy',
      styles: {
        transform:
          'translate(' +
          oxo.utils.getRandomNumber(0, xSquares - 1) * size +
          'px, 0px)',
      },
    });
    setTimeout(addBonus, 2000);
    setInterval(move, 2000);
  }

  addBonus();

  function move() {

    var bonus = document.querySelectorAll('.square__enemy');
    for (let i = 0; 1 < bonus.length; i++) {
      oxo.animation.move(bonus[i], 'down', 1); // Move 10px to the right
    };
  };
};
