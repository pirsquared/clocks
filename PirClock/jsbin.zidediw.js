var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var o = {
  c: {s: '#200', m: '#020', h: '#002', t: 'black'},
  r: {s: 75, m: 125, h: 175},
  x: 250, y: 250, w: 40, cap: 'butt', blur: 15,
};

function degToRad(degree) {
  var factor = Math.PI / 180;
  return degree * factor
}

function pad(num, size) {
    var s = "00" + num;
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
  var s_ = pad((Math.floor(s) + 196).toString(16), 2);
  var m_ = pad((Math.floor(m) + 196).toString(16), 2);
  var h_ = pad((Math.floor(h % 12 * 5) + 196).toString(16), 2);
  return "#" + s_ + m_ + h_;
}

function renderTime() {
  var now          = new Date();
  var today        = now.toDateString();
  var hours        = now.getHours();
  var minutes      = now.getMinutes();
  var seconds      = now.getSeconds();
  var milliseconds = now.getMilliseconds();
  var seconds_     = seconds + milliseconds / 1000;
  var minutes_     = minutes + seconds_ / 60;
  var hours_       = hours + minutes_ / 60;
  
  var shadowColor  = hex(seconds_, minutes_, hours_);
  
  // Background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 500, 500);
  
  // common
  ctx.lineWidth = o.w;
  ctx.lineCap = o.cap;
  ctx.shadowBlur = o.blur;
  ctx.shadowColor = shadowColor;

  // Hours
  var hf = hours_ < 12;
  var hp = hours_ % 12 * 30 + 270;
  var hb = hf ? hp : 270;
  var he = hf ? 270 : hp;
  
  arc(o.x, o.y, o.r.h, hb, he, o.c.h);
  
  // Minutes
  var mf = hours % 2 === 0;
  var mp = minutes_ * 6 - 90;
  var mb = mf ? mp : 270;
  var me = mf ? 270 : mp;
  
  arc(o.x, o.y, o.r.m, mb, me, o.c.m);
  
  // Seconds
  var sf = minutes % 2 === 0;
  var sp = seconds_ * 6 - 90;
  var sb = sf ? sp : 270;
  var se = sf ? 270 : sp;
  
  arc(o.x, o.y, o.r.s, sb, se, o.c.s);

  // Text
  var time = pad(hours % 12, 2) + ":" + pad(minutes, 2);
  var ampm = hours >= 12 ? 'PM' : 'AM';
  var stxt = pad(seconds, 2);
 
  ctx.fillStyle = o.c.t;

  // Time
  ctx.font = 'bold 120px Courier';
  ctx.fillText(time, 30, 230);
  ctx.font = 'bold 50px Courier';
  ctx.fillText(ampm, 400, 185)
  ctx.fillText(stxt, 400, 230)
  
  // Date
  ctx.font = 'bold 46px Courier New';
  ctx.fillText(today, 46, 290);
}

setInterval(renderTime, 40)