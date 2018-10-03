document.addEventListener('DOMContentLoaded', domloaded, false);

function domloaded() {
    const numbers = [
    	[1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], // 0
    	[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1], // 1
    	[1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1], // 2
    	[1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 3
    	[1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1], // 4
    	[1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 5
    	[1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1], // 6
    	[1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0], // 7
    	[1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // 8
    	[1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1]  // 9
    ];
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    function pad(num, size) {
        let s = "00" + num;
        return s.substr(s.length-size);
    }

    function renderTime() {
        let now     = new Date();
        let today   = now.toDateString();
        let hours   = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let digits  = [Math.floor(hours / 10), hours % 10, Math.floor(minutes / 10), minutes % 10]

        // stuff
        let w = 25;
        let h = 20;
        let W = 500;
        let mid_x = Math.floor(W / 2);
        let H = 500;
        let mid_y = Math.floor(H / 2);

        // Background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 500, 500);

        ctx.strokeStyle = '#ff0';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(mid_x, .0 * H);
        ctx.lineTo(mid_x, .2 * H);
        ctx.stroke();

        for (let i0 = 0; i0 < 60; i0++) {
            ctx.font = 'bold 18px Courier';
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
            let amul = Math.abs(acol - 5.5) + .5 * (g0 === g1) + 1;

            ctx.fillStyle = i0 === seconds ? '#0f0' : !numbers[digits[dig]][c * 5 + r] ? '#333' : '#fff';
            ctx.textAlign = g0 === 0       ? 'left' : 'right';

            ctx.fillText(
                pad(i0, 2),
                mid_x + amul * sign * w,
                (r + 1) * h,
            );
        }

    }

    // renderTime()
    setInterval(renderTime, 40)
}
