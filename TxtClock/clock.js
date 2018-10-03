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

        // Time
        // ctx.font = 'bold 120px Courier';
        // ctx.fillText(time, 30, 230);
        // ctx.font = 'bold 50px Courier';
        // ctx.fillText(ampm, 400, 185);
        //
        // Date
        // ctx.font = 'bold 46px Courier New';
        // ctx.fillText(today, 46, 290);

        ctx.font = 'bold 12px Courier';
        ctx.fillStyle = 'white';
        for (let i = 0; i < 60; i++) {
            let k = Math.floor(i / 15);
            let j = i % 15;
            let r = Math.floor(j / 3);
            let c = j % 3;
            ctx.fillText(
                pad(i, 2),
                50 + k * 100 + c * 25,
                50 + r * 25
            );
        }

    }

    renderTime()
    // setInterval(renderTime, 40)
}
