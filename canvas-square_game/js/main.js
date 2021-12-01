$("#canvas-1").ready(function() {
    let canvas = $("#canvas-1")[0];
    let context = canvas.getContext("2d");
    let placar = 0, coord, rect, drawnings = [];

    // Configurações
    let minSize = 10, maxSize = 25; // Tamanhos que o retângulo (alvo) pode assumir.
    let size = 40; // Tamanho do quadrado de explosão

    configCanvas();

    let interval = generateRects();

    $("#canvas-1").click(function(e) {
        let bound = this.getBoundingClientRect();

        let coordClick = {
            x: e.clientX - bound.left,
            y: e.clientY - bound.top
        }

        if (verifyClick(coordClick, coord, rect)) {
            placar += 10;
            $("#placar").html("Placar: " + placar);

            deleteTarget();
            coord = null;
            rect = null;

            clearInterval(interval);
            interval = generateRects();
        }

        showHitEffect(coordClick);
    });

    function generateRects() {
        return setInterval(function() {
            deleteTarget();

            rect = getRandomRect();
            coord = getRandomPosition();

            let object = {
                name: "rect",
                path: [],
                color: getRandomColor(),
                width: rect.b,
                height: rect.h,
                visible: true
            };

            object = buildSquare(object, coord);
            pushDrawn(object);
            drawn();

        }, 3000);
    };

    function showHitEffect(coord) {
        coord.x = coord.x - size/2;
        coord.y = coord.y - size/2;

        let object = {
            name: "hit",
            path: coord,
            width: size,
            height: size,
            visible: true
        };

        pushDrawn(object);
        drawn();

        setTimeout(function() {
            drawnings.forEach(aux => {
                if (aux.name == "hit") {
                    aux.visible = false;
                    drawn();
                    return;
                }
            });
        }, 500);
    };

    function buildSquare(object, coord) {
        object.path.push({x: coord.x, y: coord.y}); // Posição inicial
        object.path.push({x: coord.x + object.width, y: coord.y}); // Linha para a direita
        object.path.push({x: coord.x + object.width, y: coord.y}); // Move para direita
        object.path.push({x: coord.x + object.width, y: coord.y + object.height}); // Linha para baixo
        object.path.push({x: coord.x, y: coord.y}); // Retorna para posição inicial
        object.path.push({x: coord.x, y: coord.y + object.height}); // Linha para baixo
        object.path.push({x: coord.x, y: coord.y + object.height}); // Move para baixo
        object.path.push({x: coord.x + object.width, y: coord.y + object.height}); // Linha para a direita

        return object;
    }

    function drawn() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawnings.forEach(drawn => {
            if (drawn.visible) {
                if (drawn.name == "hit") {
                    let img = new Image();
                    img.onload = function() {
                        context.drawImage(img, drawn.path.x, drawn.path.y, size, size);
                    };
                    img.src = './img/explosion.png';
                } else {
                    context.beginPath();

                    for (let i = 0; i < drawn.path.length; i+=2) {
                        context.moveTo(drawn.path[i].x, drawn.path[i].y);
                        context.lineTo(drawn.path[i].x, drawn.path[i].y);
                    }
    
                    context.fillStyle = drawn.color;
                    context.fillRect(drawn.path[0].x, drawn.path[0].y, drawn.width, drawn.height);
                    context.stroke();
                    context.closePath();
                }
            }
        });
    };

    function pushDrawn(object) {
        for (let i = 0; i < drawnings.length; i++) {
            if (drawnings[i].name == object.name) {
                drawnings.splice(i,1);
                break;
            }
        }

        drawnings.push(object);
    };

    function deleteTarget() {
        for (let i = 0; i < drawnings.length; i++) {
            if (drawnings[i].name == "rect") {
                drawnings[i].visible = false;
                drawn();
                break;
            }
        };
    }

    function getRandomPosition() {
        let coord = {
            x: 0,
            y: 0
        };

        do {
            coord.x = Math.floor(Math.random() * canvas.width);
            coord.y = Math.floor(Math.random() * canvas.height);
        } while (coord.x < 50 || coord.y < 50 || coord.x > canvas.width - 50 || coord.y > canvas.height - 50);

        return coord;
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
            b: Math.floor(Math.random() * minSize + maxSize+1), 
            h: Math.floor(Math.random() * minSize + maxSize+1)
        };
    };
    
    function getRandomColor() {
        return "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
    };
});