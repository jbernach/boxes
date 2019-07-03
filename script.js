var numBoxes = 2000;

function createBoxes() {
    console.log('Creating ' + numBoxes + ' boxes...');

    const container = document.getElementById('box-pool');

    for (var i = 0; i <  numBoxes; i++) {
        const newBox = createBox();
        container.appendChild(newBox);
    }
}

function createBox() {    
    const newBox = document.createElement('div');
    newBox.className = 'box';
    newBox.setAttribute('data-opened', 'false');
    newBox.setAttribute('data-content', 'nothing');

    newBox.addEventListener('click', event => {
        if (newBox.getAttribute('data-opened') === 'true') {
            console.log("Box already opened.");
        } else {
            newBox.setAttribute('data-opened', 'true');
        }
    });

    return newBox;
}
