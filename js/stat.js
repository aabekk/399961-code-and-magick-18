'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADOW_X = CLOUD_X + 10;
var SHADOW_Y = CLOUD_Y + 10;
var GAP = 50;
var FONT_GAP = 20;
var HIST_X = CLOUD_X + FONT_GAP;
var HIST_Y = CLOUD_Y + FONT_GAP * 3;
var HIST_WIDTH = CLOUD_WIDTH - FONT_GAP;
var HIST_HEIGHT = 150;
var BAR_WIDTH = 40;
var COLOR_BLACK = '#000';
var COLOR_WHITE = '#fff';
var COLOR_RED = 'rgba(255, 0, 0, 1)';
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
var GENERAL_FONT = '16px PT Mono';
var GENERAL_BASELINE = 'hanging';
var TEXT_CONGRATULATION = 'Ура вы победили!';
var TEXT_CONGRATULATION_X = CLOUD_X + FONT_GAP;
var TEXT_CONGRATULATION_Y = CLOUD_Y + FONT_GAP;
var TEXT_RESULTS = 'Список результатов:';
var TEXT_RESULTS_X = TEXT_CONGRATULATION_X;
var TEXT_RESULTS_Y = TEXT_CONGRATULATION_Y + FONT_GAP;
var USERNAME = 'Вы';

var getRandomColor = function (ctx) {
  var random = 100 * Math.random();
  ctx.fillStyle = 'hsl(240, ' + random + '%, 50%)';
};

var fillBarColor = function (name, ctx) {
  if (name === USERNAME) {
    ctx.fillStyle = COLOR_RED;
  } else {
    ctx.fillStyle = getRandomColor(ctx);
  }
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  ctx.strokeRect(SHADOW_X, SHADOW_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, SHADOW_X, SHADOW_Y, COLOR_SHADOW);
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_WHITE);
  ctx.fillRect(HIST_X, HIST_Y, HIST_WIDTH, HIST_HEIGHT);
  ctx.font = GENERAL_FONT;
  ctx.textBaseline = GENERAL_BASELINE;
  ctx.fillStyle = COLOR_BLACK;
  ctx.fillText(TEXT_CONGRATULATION, TEXT_CONGRATULATION_X, TEXT_CONGRATULATION_Y);
  ctx.fillText(TEXT_RESULTS, TEXT_RESULTS_X, TEXT_RESULTS_Y);

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
    fillBarColor(names[i], ctx);
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
  }
};
