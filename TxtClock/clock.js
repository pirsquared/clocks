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
    let today   = now.toDateString();
    let hours   = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let digits  = [Math.floor(hours % 12 / 10), hours % 12 % 10, Math.floor(minutes / 10), minutes % 10];

    // stuff
    let W = canvas.width;
    let H = canvas.height;
    let w = .05 * W;
    let h = .8 * w;
    let b = Math.floor((H - 5 * h) / 2);
    let mid_x = Math.floor(W / 2);

    // Background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = hex(seconds, minutes, hours);
    ctx.lineWidth = .02 * W;
    ctx.beginPath();
    ctx.setLineDash([.005 * W, .01 * W]);
    ctx.lineCap = 'butt';
    ctx.moveTo(mid_x, 1.5 * h + b);
    ctx.lineTo(mid_x, 4 * h + b);
    ctx.stroke();

    ctx.font = 'bold ' + Math.floor(.036 * W) + 'px Courier';
    ctx.textAlign = 'center';
    ctx.fillStyle = hours < 12 ? 'DarkSlateGray' : '#fff';
    ctx.fillText('AM', mid_x, h + b);
    ctx.fillStyle = hours < 12 ? '#fff' : 'DarkSlateGray';
    ctx.fillText('PM', mid_x, 5 * h + b);

    for (let i0 = 0; i0 < 60; i0++) {
      ctx.font = 'bold ' + Math.floor(.036 * W) + 'px Courier';
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

      ctx.fillStyle = i0 === seconds ? 'Maroon' : !numbers[digits[dig]][i2] ? 'DarkSlateGray' : '#fff';
      ctx.textAlign = g0 === 0       ? 'left' : 'right';

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
