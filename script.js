var numBoxes = 2000;

function createBoxes() {
    console.log('Creating ' + numBoxes + ' boxes...');

    const container = document.getElementById('box-pool');

    for (var i = 0; i <  numBoxes; i++) {
        const newBox = createBox();
        container.appendChild(newBox);
    }

    document.addEventListener('keydown', event => {
        if (event.code == 'Space') {
            event.preventDefault();
            console.log("Space pressed");

            const boxToOpen = document.querySelector('.box[data-opened=false]');
            if (boxToOpen) {
                var clickEvent = new Event('click');
                boxToOpen.dispatchEvent(clickEvent);
            }            
        }
    });
}

function createBox() {    
    const newBox = document.createElement('div');
    newBox.className = 'box';
    newBox.setAttribute('data-opened', 'false');
    newBox.setAttribute('data-content', assignContent());

    newBox.addEventListener('click', event => {
        if (newBox.getAttribute('data-opened') === 'true') {
            console.log("Box already opened.");
        } else {
            newBox.setAttribute('data-opened', 'true');
        }
    });

    return newBox;
}

function assignContent() {
    const legendary = 0.002;
    const r = Math.random();

    if (r <= legendary) {
        return 'legendary';
    }

    
    return 'nothing';
}
