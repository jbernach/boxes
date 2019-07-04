const numBoxes = 2000;

const availableBrawlers = [
    {
        name: 'EL PRIMO',
        quality: 'special',
        resource: 'img/elprimo.png'
    },
    {
        name: 'BARLEY',
        quality: 'special',
        resource: 'img/barley.png'
    },
    {
        name: 'POCO',
        quality: 'special',
        resource: 'img/poco.png'
    },
    {
        name: 'ROSA',
        quality: 'special',
        resource: 'img/rosa.png'
    },
    {
        name: 'RICO',
        quality: 'superspecial',
        resource: 'img/rico.png'
    },
    {
        name: 'DARRYL',
        quality: 'superspecial',
        resource: 'img/darryl.png'
    },
    {
        name: 'PENNY',
        quality: 'superspecial',
        resource: 'img/penny.png'
    },
    {
        name: 'CARL',
        quality: 'superspecial',
        resource: 'img/carl.png'
    },
    {
        name: 'PIPER',
        quality: 'epic',
        resource: 'img/piper.png'
    },
    {
        name: 'PAM',
        quality: 'epic',
        resource: 'img/pam.png'
    },
    {
        name: 'FRANK',
        quality: 'epic',
        resource: 'img/frank.png'
    },
    {
        name: 'BIBI',
        quality: 'epic',
        resource: 'img/bibi.png'
    },
    {
        name: 'MORTIS',
        quality: 'mythical',
        resource: 'img/mortis.png'
    },
    {
        name: 'GENIO',
        quality: 'mythical',
        resource: 'img/genio.png'
    },
    {
        name: 'TARA',
        quality: 'mythical',
        resource: 'img/tara.png'
    },
    {
        name: 'SPIKE',
        quality: 'legendary',
        resource: 'img/spike.png'
    },
    {
        name: 'CROW',
        quality: 'legendary',
        resource: 'img/crow.png'
    },
    {
        name: 'LEON',
        quality: 'legendary',
        resource: 'img/leon.png'
    }    
];

const probabilities = {
    'special': 2.7168/100.0,
    'superspecial': 1.2069/100.0,
    'epic': 0.5472/100.0,
    'mythical': 0.2496/100.0,
    'legendary': 0.0768/100.0
};

var achieved = [];
var placedInBox = [];

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
    var price = assignBrawler();
    newBox.setAttribute('data-price', price);

    if (price !== 'nothing') {
        var b = getBrawlerByName(price);
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

        if (placedInBox.indexOf(b.name) === -1) {
            var r = Math.random();
            var prob = probabilities[b.quality];

            if (r <= prob) {
                placedInBox.push(b.name);
                return b.name;
            }
        }
    }

    return 'nothing';
}

function getBrawlerByName(name) {
    for (var i = 0; i < availableBrawlers.length; i++) {
        if (availableBrawlers[i].name === name) {
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

        var price = box.getAttribute('data-price');

        if (price !== 'nothing') {
            var b = getBrawlerByName(price);

            const priceElement = document.createElement('div');
            priceElement.innerText = b.name;
            document.getElementById('prices').appendChild(priceElement);
        }
    }
}