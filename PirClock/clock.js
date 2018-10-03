document.addEventListener('DOMContentLoaded', domloaded, false);

function domloaded() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  let o = {
    c: {s: '#200', m: '#020', h: '#002', t: 'black'},
    r: {s: 75, m: 125, h: 175},
    x: 250, y: 250, w: 40, cap: 'butt', blur: 15,
  };

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
    let now          = new Date();
    let today        = now.toDateString();
    let hours        = now.getHours();
    let minutes      = now.getMinutes();
    let seconds      = now.getSeconds();
    let milliseconds = now.getMilliseconds();
    let seconds_     = seconds + milliseconds / 1000;
    let minutes_     = minutes + seconds_ / 60;
    let hours_       = hours + minutes_ / 60;

    let shadowColor  = hex(seconds_, minutes_, hours_);

    // Background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 500);

    // common
    ctx.lineWidth = o.w;
    ctx.lineCap = o.cap;
    ctx.shadowBlur = o.blur;
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
    ctx.font = 'bold 120px Courier';
    ctx.fillText(time, 30, 230);
    ctx.font = 'bold 50px Courier';
    ctx.fillText(ampm, 400, 185);
    ctx.fillText(stxt, 400, 230);

    // Date
    ctx.font = 'bold 46px Courier New';
    ctx.fillText(today, 46, 290);
  }

  setInterval(renderTime, 40)
}
