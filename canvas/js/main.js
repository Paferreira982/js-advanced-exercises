$("canvas-1").ready(function() {
    let context = $("#canvas-1")[0].getContext("2d");

    let initialPosition, finalPosition;

    $("#canvas-1").click(function(e){
        let rect = this.getBoundingClientRect();

        if (initialPosition) {
            if (finalPosition)
                initialPosition = finalPosition;
            
            finalPosition = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }

            context.beginPath();
            context.moveTo(initialPosition.x, initialPosition.y);
            context.lineTo(finalPosition.x, finalPosition.y);
            context.strokeStyle = getRandomColor();
            context.stroke();

        } else {
            initialPosition = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        };
    });

    $("#canvas-1").contextmenu(function(e) {
        e.preventDefault();
        initialPosition = null;
        finalPosition = null;
    });
});

function getRandomColor() {
    let R = Math.floor(Math.random() * 256);
    let G = Math.floor(Math.random() * 256);
    let B = Math.floor(Math.random() * 256);
    return "rgb(" + R + "," + G + "," + B + ")";
};