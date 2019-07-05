const availableBrawlers = [
    {
        id: 'elprimo',
        name: 'EL PRIMO',
        quality: 'special'
    },
    {
        id: 'barley',
        name: 'BARLEY',
        quality: 'special'        
    },
    {
        id: 'poco',
        name: 'POCO',
        quality: 'special',        
    },
    {
        id: 'rosa',
        name: 'ROSA',
        quality: 'special'
    },
    {
        id: 'rico',
        name: 'RICO',
        quality: 'superspecial'
    },
    {
        id: 'darryl',
        name: 'DARRYL',
        quality: 'superspecial'
    },
    {
        id: 'penny',
        name: 'PENNY',
        quality: 'superspecial'
    },
    {
        id: 'carl',
        name: 'CARL',
        quality: 'superspecial'
    },
    {
        id: 'piper',
        name: 'PIPER',
        quality: 'epic'
    },
    {
        id: 'pam',
        name: 'PAM',
        quality: 'epic'
    },
    {
        id: 'frank',
        name: 'FRANK',
        quality: 'epic'
    },
    {
        id: 'bibi',
        name: 'BIBI',
        quality: 'epic'
    },
    {
        id: 'mortis',
        name: 'MORTIS',
        quality: 'mythical'
    },
    {
        id: 'gene',
        name: 'GENE',
        quality: 'mythical'
    },
    {
        id: 'tara',
        name: 'TARA',
        quality: 'mythical'
    },
    {
        id: 'spike',
        name: 'SPIKE',
        quality: 'legendary'
    },
    {
        id: 'crow',
        name: 'CROW',
        quality: 'legendary'
    },
    {
        id: 'leon',
        name: 'LEON',
        quality: 'legendary'
    }    
];

const probabilities = {
    'special': 2.7168/100.0,
    'superspecial': 1.2069/100.0,
    'epic': 0.5472/100.0,
    'mythical': 0.2496/100.0,
    'legendary': 0.0768/100.0
};

const revealSounds = {
    'special': new Audio('sounds/reveal_special.mp3'),
    'superspecial': new Audio('sounds/reveal_superspecial.mp3'),
    'epic': new Audio('sounds/reveal_epic.mp3'),
    'mythical': new Audio('sounds/reveal_mythical.mp3'),
    'legendary': new Audio('sounds/reveal_legendary.mp3')    
};

var achieved = [];
var placedInBox = [];

function createBoxes(numBoxes) {
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
    var prize = assignBrawler();
    newBox.setAttribute('data-prize', prize);

    if (prize !== 'nothing') {
        var b = getBrawlerById(prize);
        newBox.setAttribute('data-quality', b.quality);
    }
    
    newBox.addEventListener('click', event => {
       openBox(newBox);
    });

    return newBox;
}

function assignBrawler() {
    for (var i = 0; i < availableBrawlers.length; i++) {
        var b = availableBrawlers[i];

        if (placedInBox.indexOf(b.id) === -1) {
            var r = Math.random();
            var prob = probabilities[b.quality];

            if (r <= prob) {
                placedInBox.push(b.id);
                return b.id;
            }
        }
    }

    return 'nothing';
}

function getBrawlerById(id) {
    for (var i = 0; i < availableBrawlers.length; i++) {
        if (availableBrawlers[i].id === id) {
            return availableBrawlers[i];
        }
    }

    return {};
}

function openBox(box) {
    if (box.getAttribute('data-opened') === 'true') {
        console.log("Box already opened.");
    } else {
        box.setAttribute('data-opened', 'true');

        var prize = box.getAttribute('data-prize');

        if (prize !== 'nothing') {
            var b = getBrawlerById(prize);

            revealSounds[b.quality].play();

            const prizeElement = document.createElement('div');
            prizeElement.className = 'brawler ' + prize;
            prizeElement.innerText = b.name;
            prizeElement.style.backgroundImage = "url('img/" + prize + ".png')";
            document.getElementById('prizes').appendChild(prizeElement);

            box.style.backgroundImage = prizeElement.style.backgroundImage;
        }
    }
}