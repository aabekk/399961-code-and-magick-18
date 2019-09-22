'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var HIST_HEIGHT = 150;
var BAR_WIDTH = 40;
var GAP = 50;
var FONT_GAP = 20;
var COLOR_BLACK = '#000';
var COLOR_WHITE = '#fff';
// var COLOR_RED = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var renderHistogram = function (ctx, x, y) {
  ctx.fillRect(x, y, CLOUD_WIDTH - FONT_GAP, HIST_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  if (arr.length === 0) {
    return ('Ничего нет :(');
  }
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getCongratulationText = function (ctx, text, x, y) {
  ctx.fillText(text, x + FONT_GAP, y);
};
// var getStrokeRect = function (ctx, x, y) {
//   ctx.strokeRect(75, 0, 150, 150);
// };
// var renderColorsHistogram = function (ctx, color) {
//   ctx.fillStyle = color;
// };

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  ctx.strokeStyle = COLOR_BLACK;
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_WHITE);
  renderHistogram(ctx, CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 3);
  ctx.font = ' 16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = COLOR_BLACK;
  getCongratulationText(ctx, 'Ура вы победили!', CLOUD_X, CLOUD_Y + FONT_GAP);
  getCongratulationText(ctx, 'Список результатов:', CLOUD_X, CLOUD_Y + FONT_GAP * 2);
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2);
    ctx.fillRect(CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_Y + HIST_HEIGHT - FONT_GAP * 4,
        BAR_WIDTH, (HIST_HEIGHT * times[i]) / maxTime);
  }
};
