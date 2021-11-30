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

            context.moveTo(initialPosition.x, initialPosition.y);
            context.lineTo(finalPosition.x, finalPosition.y);
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