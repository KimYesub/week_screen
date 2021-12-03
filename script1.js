window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();
var $;

var w;
var h;

var img;
var d;

var cracks = [];

var msX = window.innerWidth / 2;
var msY = window.innerHeight / 2;

window.onload = function() {
  var c = document.getElementById("canv");

  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;

  $ = c.getContext("2d");

  window.addEventListener("mousedown", msdn, false);
  window.addEventListener("touchstart", tcdn, false);
  window.addEventListener('load', resize);
  window.addEventListener('resize', resize, false);

  function resize() {
    c.width = w = window.innerWidth;
    c.height = h = window.innerHeight;
    c.style.position = 'absolute';
    c.style.left = (window.innerWidth - w) *
      .01 + 'px';
    c.style.top = (window.innerHeight - h) *
      .01 + 'px';
  }

  function msdn(e) {
    msX = e.clientX;
    msY = e.clientY;

    for (var i = 0; i < 50; i++) {
      cracks.push(new Crack(msX + rnd(5),
        msY + rnd(5),
        Math.random() * 360 * Math.PI / 180));
    }
  }

  function tcdn(e) {
    msX = e.touches[0].pageX;
    msY = e.touches[0].pageY;

    for (var i = 0; i < 50; i++) {
      cracks.push(new Crack(msX + rnd(5),
        msY + rnd(5),
        Math.random() * 360 * Math.PI / 180));
    }
  }

  for (var i = 0; i < 50; i++) {
    cracks.push(new Crack(msX + rnd(5),
      msY + rnd(5),
      Math.random() * 360 * Math.PI / 180));
  }
  run();
}

function run() {
  shatter();
  window.requestAnimFrame(run, 60);
}

function shatter() {
  img = $.getImageData(0, 0, w, h);
  d = img.data;

  for (var i = 0; i < cracks.length; i++) {
    var crack = cracks[i];
    crack.upd();

    if (!crack.done && Math.random() > 0.8 && cracks.length < 400) {
      cracks.push(new Crack(crack.x, crack.y, (Math.random() > 0.5 ? 90 : -90) * Math.PI / 180 +
        crack.ang));
    }
  }
}

function rnd(num) {
  return Math.random() * num - num * 0.7;
}

var Crack = function(x, y, ang) {
  this.x = x;
  this.y = y;

  this.ang = Math.pow(Math.random() * 10, 90) + ang;

  this.dx = Math.cos(this.ang);
  this.dy = Math.sin(this.ang);

  this.span = Math.random() * 100 + 100;
  this.done = false;
}

Crack.prototype.upd = function() {
  $.strokeStyle = 'hsla(0,0%,100%,1)';
  $.beginPath();
  $.moveTo(this.x, this.y);

  this.x += this.dx * 7; //실금 가로폭
  this.y += this.dy * 3; //실금 세로폭
  this.span -= 18; //금 퍼지는정도 (숫자가 클수록 좁게 퍼짐)

  $.lineTo(this.x, this.y);
  $.stroke();

  var idx = (Math.floor(this.x) + w * Math.floor(this.y)) * 4;

  if (this.span <= 0) {
    this.end();
  }
  if (d[idx + 3] > 0) {
    this.end();
  }

  if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
    this.end();
  }
}

Crack.prototype.end = function() {
  cracks.splice(cracks.indexOf(this), 1);
  this.done = true;
}

