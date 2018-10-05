document.addEventListener('DOMContentLoaded', domloaded, false);

function domloaded() {
  const numbers = [
      [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
  ];
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  function pad(num, size) {
    let s = "00" + num;
    return s.substr(s.length-size);
  }

  function hex(s, m, h) {
    let s_ = pad((Math.floor(s) * 2 + 136).toString(16), 2);
    let m_ = pad((Math.floor(m) * 2 + 136).toString(16), 2);
    let h_ = pad((Math.floor(h % 12 * 5) * 2 + 136).toString(16), 2);
    return "#" + s_ + m_ + h_;
  }

  function renderTime() {
    let now     = new Date();
    let hours   = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // stuff
    let W = canvas.width;
    let H = canvas.height;
    let w = W / 16;
    let p = Math.round(w * .72)
    let h = .8 * w;
    let b = Math.floor((H - 6 * h) / 2);
    let mid_x = Math.floor(W / 2);

    ctx.textBaseline = 'middle';

    // Background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = hex(seconds, minutes, hours);
    ctx.lineWidth = .6 * w;
    ctx.beginPath();
    ctx.lineCap = 'butt';
    ctx.moveTo(mid_x, 2 * h + b);
    ctx.lineTo(mid_x, 4 * h + b);
    ctx.stroke();

    ctx.font = 'bold ' + p + 'px Courier';
    ctx.textAlign = 'center';
    ctx.fillStyle = hours >= 12 ? '#222' : '#fff';
    ctx.fillText('AM', mid_x, h + b);
    ctx.fillStyle = hours >= 12 ? '#fff' : '#222';
    ctx.fillText('PM', mid_x, 5 * h + b);

    for (let i0 = 0; i0 < 60; i0++) {
      ctx.font = 'bold ' + p + 'px Courier';
      ctx.fillStyle = '#333';
      let g0 = Math.floor(i0 / 30);
      let i1 = i0 % 30;
      let g1 = Math.floor(i1 / 15);
      let i2 = i1 % 15;
      let r = Math.floor(i2 / 3);
      let c = i2 % 3;

      let dig = g1 + g0 * 2;
      let sign = g0 === 0 ? -1 : 1;
      let acol = dig * 3 + c ;
      let amul = Math.abs(acol - 5.5) + .5 * (g0 === g1) + 1.5;

      let hour_ = hours % 12 === 0 ? 12 : hours % 12;
      let digits  = [
          Math.floor(hour_ / 10),
          hour_ % 10,
          Math.floor(minutes / 10),
          minutes % 10
      ];

      let isnow = i0 === seconds;
      let isnum = !!numbers[digits[dig]][i2]
      ctx.fillStyle = !isnum ? '#222' : isnow ? '#ffa' : '#fff';
      ctx.shadowColor = isnow ? '#fff' : '#000';
      ctx.shadowBlur = isnow ? 30 : 0;
      ctx.textAlign = g0 === 0 ? 'left' : 'right';

      ctx.fillText(
        pad(i0, 2),
        mid_x + amul * sign * w,
        (r + 1) * h + b,
      );
    }
  }

  // renderTime()
  setInterval(renderTime, 40)
}
