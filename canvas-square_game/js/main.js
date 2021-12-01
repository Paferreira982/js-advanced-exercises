$("#canvas-1").ready(function() {
    let canvas = $("#canvas-1")[0];
    let context = canvas.getContext("2d");
    let placar = 0, coord, rect;

    configCanvas();

    let interval = generateRects();

    $("#canvas-1").click(function(e) {
        let bound = this.getBoundingClientRect();

        let coordClick = {
            x: e.clientX - bound.left,
            y: e.clientY - bound.top
        }

        if (verifyClick(coordClick, coord, rect)) {
            placar+=10;
            $("#placar").html("Placar: " + placar);
            context.clearRect(0, 0, canvas.width, canvas.height);
            coord = null;
            rect = null;
            clearInterval(interval);
            interval = generateRects();
        }
    });

    function generateRects() {
        return setInterval(function() {
            rect = getRandomRect();
            coord = getRandomPosition();
            let color = getRandomColor();

            context.clearRect(0, 0, canvas.width, canvas.height);

            context.beginPath();
            context.moveTo(coord.x, coord.y); // Posição inicial
            context.lineTo(coord.x + rect.b, coord.y); // Linha para a direita
            context.moveTo(coord.x + rect.b, coord.y); // Move para direita
            context.lineTo(coord.x + rect.b, coord.y + rect.h); // Linha para baixo
            context.moveTo(coord.x, coord.y); // Retorna para posição inicial
            context.lineTo(coord.x, coord.y + rect.h); // Linha para baixo
            context.moveTo(coord.x, coord.y + rect.h); // Move para baixo
            context.lineTo(coord.x + rect.b, coord.y + rect.h); // Linha para a direita

            context.fillRect(coord.x, coord.y, rect.b, rect.h);
            context.fillStyle = color;
            context.stroke();
        }, 3000);
    };

    function getRandomPosition() {
        return {
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height)
        };
    };

    function configCanvas() {
        canvas.style.width  = "100%";
        canvas.style.height = "100%";
        canvas.width        = canvas.offsetWidth;
        canvas.height       = canvas.offsetHeight;
    };

    function verifyClick(coordClick, coordRect, rect) {
        if (coordRect) {
            if ((coordClick.x >= coordRect.x && coordClick.x <= coordRect.x + rect.b) &&
                (coordClick.y >= coordRect.y && coordClick.y <= coordRect.y + rect.h))
                return true
        }
        return false
    };
    
    function getRandomRect() {
        return {
            b: Math.floor(Math.random() * 10 + 26), 
            h: Math.floor(Math.random() * 10 + 26)
        };
    };
    
    function getRandomColor() {
        return "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
    };
});