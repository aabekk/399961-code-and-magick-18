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
var COLOR_RED = 'rgba(255, 0, 0, 1)';

var randColor = function (ctx) {
  var random = 100 * Math.random();
  ctx.fillStyle = 'hsl(240, ' + random + '%, 50%)';
};
var getRandomColor = function (names, i, ctx) {
  if (names[i] === 'Вы') {
    ctx.fillStyle = COLOR_RED;
  } else {
    ctx.fillStyle = randColor(ctx);
  }
};
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

window.renderStatistics = function (ctx, names, times) {
  ctx.strokeRect(CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_WHITE);
  renderHistogram(ctx, CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 3);
  ctx.font = ' 16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = COLOR_BLACK;
  getCongratulationText(ctx, 'Ура вы победили!', CLOUD_X, CLOUD_Y + FONT_GAP);
  getCongratulationText(ctx, 'Список результатов:', CLOUD_X, CLOUD_Y + FONT_GAP * 2);
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var rectWidth = BAR_WIDTH;
    var rectHeight = (HIST_HEIGHT * times[i]) / maxTime;
    var rectX = CLOUD_X + GAP + (GAP + BAR_WIDTH) * i;
    var rectY = CLOUD_HEIGHT - (rectHeight + GAP - FONT_GAP);
    var textRectX = CLOUD_X + GAP + (GAP + BAR_WIDTH) * i;
    var textRectY = CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2 + 10;
    var textTimeY = rectY - FONT_GAP;
    var timesRound = Math.round(times[i]).toString();
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(names[i], textRectX, textRectY);
    ctx.fillText(timesRound, textRectX, textTimeY);
    getRandomColor(names, i, ctx);
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
  }
};
