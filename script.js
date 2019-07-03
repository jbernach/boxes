var numBoxes = 2000;

const createBoxes = () => {
    console.log("Creating " + numBoxes + " boxes...");

    const container = document.getElementById('box-pool');

    for (var i = 0; i <  numBoxes; i++) {
        var newBox = document.createElement("div");
        newBox.className = 'box';
        container.appendChild(newBox);
    }
};