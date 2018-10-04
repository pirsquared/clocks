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

  function hex(s, m, h) {
    let s_ = pad((Math.floor(s) + 196).toString(16), 2);
    let m_ = pad((Math.floor(m) + 196).toString(16), 2);
    let h_ = pad((Math.floor(h % 12 * 5) + 196).toString(16), 2);
    return "#" + s_ + m_ + h_;
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

    let o = {
      c: {s: '#200', m: '#020', h: '#002', t: 'black'},
      r: {s: .15 * D, m: .25 * D, h: .35 * D},
      x: .5 * D, y: .5 * D, w: .08 * W, cap: 'butt', blur: .03 * W,
    };


    // Background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, W, H);

    // common
    ctx.lineWidth   = o.w;
    ctx.lineCap     = o.cap;
    ctx.shadowBlur  = o.blur;
    ctx.shadowColor = shadowColor;

    // Hours
    let hf = hours_ < 12;
    let hp = hours_ % 12 * 30 + 270;
    let hb = hf ? hp : 270;
    let he = hf ? 270 : hp;

    arc(o.x, o.y, o.r.h, hb, he, o.c.h);

    // Minutes
    let mf = hours % 2 === 0;
    let mp = minutes_ * 6 - 90;
    let mb = mf ? mp : 270;
    let me = mf ? 270 : mp;

    arc(o.x, o.y, o.r.m, mb, me, o.c.m);

    // Seconds
    let sf = minutes % 2 === 0;
    let sp = seconds_ * 6 - 90;
    let sb = sf ? sp : 270;
    let se = sf ? 270 : sp;

    arc(o.x, o.y, o.r.s, sb, se, o.c.s);

    // Text
    let hmod = hours % 12;
    let htxt = pad(hmod === 0 ? 12 : hmod, 2);
    let time = htxt + ":" + pad(minutes, 2);
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let stxt = pad(seconds, 2);

    ctx.fillStyle = o.c.t;

    // Time
    ctx.font = 'bold ' + Math.floor(.24 * D) + 'px Courier';
    ctx.fillText(time, .06 * D, .46 * D);
    ctx.font = 'bold ' + Math.floor(.1 * D) + 'px Courier';
    ctx.fillText(ampm, .8 * D, .39 * D);
    ctx.fillText(stxt, .8 * D, .46 * D);

    // Date
    ctx.font = 'bold ' + Math.floor(.092 * D) + 'px Courier New';
    ctx.fillText(today, .092 * D, .58 * D);
  }

  setInterval(renderTime, 40)
}
