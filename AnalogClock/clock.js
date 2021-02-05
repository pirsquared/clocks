document.addEventListener('DOMContentLoaded', domloaded, false);

function domloaded() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  function degToRad(degree) {
    let factor = Math.PI / 180;
    return degree * factor
  }

  function pad(num, size) {
      let s = "00" + num;
      return s.substr(s.length-size);
  }

  function arc(cx, cy, r, b, e, fill) {
    ctx.strokeStyle = fill;
    ctx.beginPath();
    ctx.arc(cx, cy, r, degToRad(b), degToRad(e));
    ctx.stroke();
    ctx.closePath();
  }

  function face(cx, cy, r, fill) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, degToRad(360));
    ctx.fillStyle = fill;
    ctx.fill();
  }

  function tick(cx, cy, r, t, w, s, fill) {
    ctx.lineWidth = s;
    ctx.strokeStyle = fill;
    ctx.beginPath();
    ctx.arc(cx, cy, r, degToRad(t - 90 - w), degToRad(t - 90 + w));
    ctx.stroke();
    ctx.closePath();
  }

  function hex(s, m, h) {
    let s_ = pad((Math.floor(s) + 196).toString(16), 2);
    let m_ = pad((Math.floor(m) + 196).toString(16), 2);
    let h_ = pad((Math.floor(h % 12 * 5) + 196).toString(16), 2);
    return "#" + s_ + m_ + h_;
  }

  function hand(x, y, a, l, w, c) {
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    r = degToRad(a - 90);
    ctx.beginPath();
    ctx.moveTo(x, y);
    x_ = x + Math.cos(r) * l;
    y_ = y + Math.sin(r) * l;
    ctx.lineTo(x_, y_);
    ctx.stroke();
  }

  function renderTime() {
    let now      = new Date();
    let today    = now.toDateString();
    let hours    = now.getHours();
    let minutes  = now.getMinutes();
    let seconds  = now.getSeconds();
    let mseconds = now.getMilliseconds();
    let seconds_ = seconds + mseconds / 1000;
    let minutes_ = minutes + seconds_ / 60;
    let hours_   = hours   + minutes_ / 60;

    let shadowColor = hex(seconds_, minutes_, hours_);

    // get shape
    W = canvas.width;
    H = canvas.height;
    D = Math.min(W, H);

    x = D * .5;
    y = D * .5;

    // Background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, W, H);

    ctx.lineWidth = .05 * W;
    face(x, y, D * .5, shadowColor);

    let tick_opt = {
      s: {c: "#555", l: .025 * W, w: .1},
      m: {c: "#F00", l: .035 * W, w: .3},
      l: {c: "#000", l: .045 * W, w: .5}
    };

    let t = {};
    r = D * .45;
    for (i = 0; i < 360; i += 6) {
      if (i % 90 == 0) {
        t = tick_opt.l;
      } else if (i % 30 == 0) {
        t = tick_opt.m;
      } else {
        t = tick_opt.s;
      }
      tick(x, y, r, i, t.w, t.l, t.c);
    }

    hand(x, y, hours_ * 30,  D * .25, W * .015, '#55A');
    hand(x, y, minutes_ * 6, D * .35, W * .010, '#5A5');
    hand(x, y, seconds_ * 6, D * .43, W * .005, '#A55');
    face(x, y, D * .015, "#000");


  }

  setInterval(renderTime, 40);
}
