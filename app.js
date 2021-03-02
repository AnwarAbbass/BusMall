'use strict';

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const imageSection = document.getElementById('imageSection');
const leftImage = document.getElementById('leftImage');
const centertImage = document.getElementById('centertImage');
const rightImage = document.getElementById('rightImage');
let list = document.getElementById('list');
let button = document.getElementById('button');


let leftimgIndex = 0;
let rightimgIndex = 0;
let centerimgIndex = 0;
const clickCounter = 24;
let previous = [, ,];
let shownArray = [];

let imgArray = [
    'bag.jpg',
    'banana.jpg',
    'boots.jpg',
    'bathroom.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.jpg',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.jpg',
    'water-can.jpg',
    'wine-glass.jpg'];

function extractImageName(name) {
    return name.split('.').slice(0, -1).join('.');
}

function busMall(name) {
    this.name = extractImageName(name);
    this.path = `./img/${name}`;
    this.shown = 0;
    this.click = 0;
    busMall.all.push(this);
}

busMall.all = [];
busMall.counter = 0;
for (let i = 0; i < imgArray.length; i++) {
    new busMall(imgArray[i]);
}


function render() {
    busMall.innerHTML = '';
    let include;

    do {
        leftimgIndex = randomNumber(0, busMall.all.length - 1);

        do {
            centerimgIndex = randomNumber(0, busMall.all.length - 1);
        } while (centerimgIndex === leftimgIndex);



        do {
            rightimgIndex = randomNumber(0, busMall.all.length - 1);
        } while (leftimgIndex === rightimgIndex || centerimgIndex === rightimgIndex);

        include = includeElement();

    } while (include);

    leftImage.src = busMall.all[leftimgIndex].path;
    centertImage.src = busMall.all[centerimgIndex].path;
    rightImage.src = busMall.all[rightimgIndex].path;

    busMall.all[leftimgIndex].shown++;
    busMall.all[centerimgIndex].shown++;
    busMall.all[rightimgIndex].shown++;

    previous[0] = leftimgIndex;
    previous[1] = centerimgIndex;
    previous[2] = rightimgIndex;


}

function includeElement() {
    let include = false;
    for (let index = 0; index < previous.length; index++) {
        if (previous[index] === leftimgIndex || previous[index] === centerimgIndex || previous[index] === rightimgIndex) {
            include = true;
            break;
        }
    }
    return include;
}


function handelClick(event) {

    if (busMall.counter <= clickCounter) {
        const clickedElement = event.target;
        if (clickedElement.id == 'leftImage' || clickedElement.id == 'rightImage' || clickedElement.id == 'centertImage') {
            if (clickedElement.id == 'leftImage') {
                busMall.all[leftimgIndex].click++;
            }

            if (clickedElement.id == 'centertImage') {
                busMall.all[centerimgIndex].click++;
            }

            if (clickedElement.id == 'rightImage') {
                busMall.all[rightimgIndex].click++;
            }
            busMall.counter++;
            render();
        }
    }
    else {
        localStorage.setItem('busMall', JSON.stringify(busMall.all));
        renderChart();
    }
}

imageSection.addEventListener('click', handelClick);
button.addEventListener('click', viewResults);


function viewResults(event) {
    let ulElement = document.createElement('ul');
    list.appendChild(ulElement);
    let liElement;
    for (let i = 0; i < busMall.all.length; i++) {
        liElement = document.createElement('li');
        ulElement.appendChild(liElement);
        liElement.textContent = `${busMall.all[i].name} had ${busMall.all[i].click} votes, and was seen ${busMall.all[i].shown} times.`;
    }
    button.removeEventListener('click', handelClick);
    button.textContent = 'Reset';
    button.onclick = function (event) {
        location.reload();
    };
}


function renderChart() {

    let nameArray = [];
    let clickArray = [];
    let shownArray = [];

    for (let i = 0; i < busMall.all.length; i++) {
        nameArray.push(busMall.all[i].name);
        clickArray.push(busMall.all[i].click);
        shownArray.push(busMall.all[i].shown);

    }

    let ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nameArray,
            datasets: [
                {
                    label: '# of Votes',
                    data: clickArray,
                    backgroundColor: '#75cfb8',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 3
                },
                {
                    label: '# of shown',
                    data: shownArray,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                    borderColor: '#75cfb8',
                    borderWidth: 3
                }
            ]
        },

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// function saveData() {

//     if (result) {
//         for (let index = 0; index < busMall.all.length; index++) {
//             busMall.all[index].click += parseInt(result[index].click);
//             console.log(busMall.all[index].click, result[index].click)
//             busMall.all[index].shown += result[index].shown;

//         }
//         render();
//     }
// }


function getData() {
    const data = localStorage.getItem('busMall');
    if (data) {
        const objData = JSON.parse(data);
        busMall.all = objData;
        render();
    }
}
getData();