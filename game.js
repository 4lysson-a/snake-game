window.onload = function () {
    var mensagem = document.getElementById("frase");
    var stage = document.getElementById("stage");
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 90);
    var pontos = document.getElementById("pontos");
    let points = 0;
    const speed = 0.5;
    var speedX = (speedY = 0);
    var positionX = 10;
    var positionY = 15;
    var tp = 30;
    var qp = 20;
    var appleX = (appleY = 15);
    var trail = [];
    tail = 1;
    var head = trail[0];

    function gameOver() {
        points = 0;
        pontos.textContent = points;
        tail = 1;
        mensagem.textContent = "Perdeu :(";
    }

    function game() {
        mensagem.textContent = "";
        positionX += speedX;
        positionY += speedY;
        if (positionX < 0) {
            positionX = qp - 1;
        }
        if (positionX > qp - 1) {
            positionX = 0;
        }
        if (positionY < 0) {
            positionY = qp - 1;
        }
        if (positionY > qp - 1) {
            positionY = 0;
        }

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "#edf044";
        ctx.fillRect(appleX * tp, appleY * tp, tp, tp);

        ctx.fillStyle = "#000";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
            if (trail[i].x == positionX && trail[i].y == positionY) {
                gameOver();
            }
        }

        trail.push({x: positionX, y: positionY});
        while (trail.length > tail) {
            trail.shift();
        }

        if (appleX == positionX && appleY == positionY) {
            tail++;
            points++;
            pontos.textContent = points;
            appleX = Math.floor(Math.random() * qp);
            appleY = Math.floor(Math.random() * qp);
        }
    }

    function keyPush(event) {
        switch (event.keyCode) {
            case 65: // Left
                speedX = -speed;
                speedY = 0;
                break;
            case 87: // up
                speedX = 0;
                speedY = -speed;
                break;
            case 68: // right
                speedX = speed;
                speedY = 0;
                break;
            case 83: // down
                speedX = 0;
                speedY = speed;
                break;
            default:
                break;
        }
    }
};
