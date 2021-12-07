$("canvas").ready(function() {
    let canvas = $("canvas")[0];
    let context = canvas.getContext("2d");
    let drawnings = [], drawn = [], lines = [], desenhando = false;

    configCanvas(); // Configura altura e largura do canvas.

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
        console.log(drawn)
    });

    $("canvas").on("mousemove", function(evt) {
        if (desenhando) {
            let rect = this.getBoundingClientRect();
            lines.push({x: evt.clientX - rect.left, y: evt.clientY - rect.top});
            context.lineTo(evt.clientX - rect.left, evt.clientY - rect.top);
            context.stroke();
        }
    });

    // Função que configura altura e largura do canvas.
    function configCanvas() {
        canvas.style.width  = "100%";
        canvas.style.height = "100%";
        canvas.width        = canvas.offsetWidth;
        canvas.height       = canvas.offsetHeight;
    };
});