$("canvas").ready(function() {
    let canvas = $("canvas")[0];
    let context = canvas.getContext("2d");
    let drawnings = [], drawn = [], lines = [], desenhando = false;

    configCanvas();

    $("canvas").on("mousedown", function(evt) {
        let rect = this.getBoundingClientRect();
        desenhando = true;
        lines.push({x: evt.clientX - rect.left, y: evt.clientY - rect.top});
        context.moveTo(evt.clientX - rect.left, evt.clientY - rect.top);
    });

    $("canvas").on("mouseup", () => {
        desenhando = false;
        drawn.push(lines);
        lines = [];
    });

    $("canvas").on("mousemove", function(evt) {
        if (desenhando) {
            let rect = this.getBoundingClientRect();
            lines.push({x: evt.clientX - rect.left, y: evt.clientY - rect.top});
            context.lineTo(evt.clientX - rect.left, evt.clientY - rect.top);
            context.stroke();
        }
    });

    $("button").click(function(){
        if ($(this).attr("class").includes("limpa"))
            limparCanvas();

        else if ($(this).attr("class").includes("grava")) {
            let aux = {
                nome: prompt("Digite o nome do desenho: "),
                desenho: drawn
            };

            drawnings = JSON.parse(localStorage.getItem("desenhos"));

            if (!drawnings)
                drawnings = [];

            drawnings.push(aux)
                 
            localStorage.setItem("desenhos",JSON.stringify(drawnings));
            limparCanvas();

        } else if ($(this).attr("class").includes("ler")) {
            limparCanvas();
            drawnings = JSON.parse(localStorage.getItem("desenhos"));
            if(drawnings) {
                let nome = prompt("Digite o nome do desenho cadastrado: ");
                for (let i = 0; i < drawnings.length; i++) {
                    if (drawnings[i].nome == nome) {
                        drawn = drawnings[i].desenho;
                        break;
                    }
                }

                if (drawn.length > 0) {
                    for (let i = 0; i < drawn.length; i++) {
                        context.moveTo(drawn[i][0].x, drawn[i][0].y);
    
                        for (let j = 1; j < drawn[i].length; j++) {
                            context.lineTo(drawn[i][j].x, drawn[i][j].y);
                            context.stroke();
                        }
                    }
    
                    drawn = [];
                } else
                    alert("Desenho não encontrado");
                    
            } else
                alert("Não há desenho salvo");

        } else {
            alert("Botão não cadastrado");
        }
    })

    function limparCanvas() {
        drawn = []; 
        lines = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
    }

    function configCanvas() {
        canvas.style.width  = "100%";
        canvas.style.height = "100%";
        canvas.width        = canvas.offsetWidth;
        canvas.height       = canvas.offsetHeight;
    };
});