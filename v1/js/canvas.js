let mousePressed = false;
let lastX, lastY;
let ctx;

function InitThis()
{
    let canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    //   ctx.fillStyle = "white";
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });
    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

$(function () {
    InitThis();
})

$('#deleteButton').on('click', function () {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
});

function triggerDownload(imgURI, name) {
    let a = document.createElement('a');
    a.setAttribute('download', name);
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');
    // a.dispatchEvent(evt);
    a.click();
    a.remove();
}

$('.downloadPng').on('click', function () {
    let canvas = document.getElementById('myCanvas');
    let imgURI = canvas
        .toDataURL('image/png');
    triggerDownload(imgURI, 'myCanvas.png');
});