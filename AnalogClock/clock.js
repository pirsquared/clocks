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
    return s.substr(s.length - size);
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
    ctx.lineWidth = w;
    ctx.strokeStyle = fill;
    theta = degToRad(t - 90);
    var x = cx + Math.cos(theta) * r;
    var y = cy + Math.sin(theta) * r;
    var x_ = cx + Math.cos(theta) * (r - s);
    var y_ = cy + Math.sin(theta) * (r - s);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x_, y_);
    ctx.closePath();
    ctx.stroke();
  }

  function sector(cx, cy, r, a, b, fill) {
  	ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, degToRad(a), degToRad(b));
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.fill();
  }

  function hex(s, m, h) {
    let s_ = pad((Math.floor(s) + 196).toString(16), 2);
    let m_ = pad((Math.floor(m) + 196).toString(16), 2);
    let h_ = pad((Math.floor(h % 12 * 5) + 196).toString(16), 2);
    return "#" + s_ + m_ + h_;
  }

  function hand(cx, cy, a, l, w, c) {
    r = degToRad(a - 90);
    x_ = cx + Math.cos(r) * l;
    y_ = cy + Math.sin(r) * l;
    
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x_, y_);
    ctx.stroke();
  }

  function handOutsidePointer(cx, cy, a, l, c) {
    r = degToRad(a - 90);
    x_ = cx + Math.cos(r) * l;
    y_ = cy + Math.sin(r) * l;
    
    sector(x_, y_, 50, a - 105, a - 75, c);
  }

  function renderTime() {
    let now = new Date();
    let today = now.toDateString();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let mseconds = now.getMilliseconds();
    let seconds_ = seconds + mseconds / 1000;
    let minutes_ = minutes + seconds_ / 60;
    let hours_ = hours + minutes_ / 60;

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
    face(x, y, D * .5, '#000');


    let t = {};
    r = D * .45;
    for (i = 0; i < 360; i++) {
      if (i % 90 == 0) {
        tick(x, y, D * 0.47, i, D * .005, D * .03, 'white');
      } else if (i % 30 == 0) {
        tick(x, y, D * 0.47, i, D * .005, D * .03, 'red');
      } else if (i % 6 == 0) {
        tick(x, y, D * 0.47, i, D * .003, D * .02, 'white');
      } else {
        tick(x, y, D * 0.47, i, D * .0015, D * .02, 'gray');
      }
    }
    
    
    ctx.shadowBlur  = .03 * W;
    ctx.shadowColor = shadowColor;
    for (i = 1; i <= 12; i++) {
        ctx.shadowBlur  = .03 * W;
        ctx.shadowColor = shadowColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.font = 'bold ' + Math.floor(.05 * D) + 'px Courier';

        var theta = degToRad(i * 30 - 90);
        var cx = D * 0.5;
        var cy = D * 0.5;
        var tr = D * 0.4;
				txt_x = cx + Math.cos(theta) * tr;
        txt_y = cy + Math.sin(theta) * tr;
        ctx.fillText(i, txt_x, txt_y);
    }
    ctx.shadowBlur = 0;
    

    hand(x, y, hours_ * 30, D * 0.22, W * .015, '#55A');
    hand(x, y, minutes_ * 6, D * 0.3, W * .010, '#5A5');
    hand(x, y, seconds_ * 6, D * 0.38, W * .005, '#A55');
    face(x, y, D * .03, shadowColor);
    
    handOutsidePointer(x, y, hours_ * 30, D * 0.47, '#55A')
    handOutsidePointer(x, y, minutes_ * 6, D * 0.47, '#5A5')
    handOutsidePointer(x, y, seconds_ * 6, D * 0.47, '#A55')
    



  }

  setInterval(renderTime, 40);
}
