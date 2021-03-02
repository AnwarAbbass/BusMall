'use-strict';

var productSection = document.getElementById('all_product');
var leftImage = document.getElementById('left_img');
var centerImage = document.getElementById('center_img');
var rightImage = document.getElementById('right_img');
// var finalResult = document.getElementById('finalResult');

var allProduct = [];
var totalClicks = 0;

// var newJSONArray = [];

var currentLeftImage;
var currentRightImage;
var currentcenterImage;

var previousLeftImageIndex;
var previousMiddelImageIndex;
var previousrightImageIndex;

var productName = [];

function Product(name, url) {
    this.name = name;
    this.url = url;
    this.numberOfClicks = 0;
    this.timeShown = 0;
    allProduct.push(this);
    productName.push(this.name);
    // localStorage.setItem(this.name+"_Storage", JSON.stringify(this));
}


new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Sweep', 'img/sweep.jpg');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('Usb', 'img/usb.jpg');
new Product('Water can', 'img/water-can.jpg');
new Product('Wine glass', 'img/wine-glass.jpg');

function pickImages() {

    var imageBox = [];

    if (totalClicks > 0) {
        imageBox = [previousLeftImageIndex, previousMiddelImageIndex, previousrightImageIndex];
    }


    var leftIndex = generateRandomNumber(imageBox);
    imageBox.push(leftIndex);
    var centerIndex = generateRandomNumber(imageBox);
    imageBox.push(centerIndex);
    var rightIndex = generateRandomNumber(imageBox);


    previousLeftImageIndex = leftIndex;
    previousMiddelImageIndex = centerIndex;
    previousrightImageIndex = rightIndex;

    // while(leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex) {
    //     centerIndex = generateRandomNumber();
    //     rightIndex = generateRandomNumber();
    //     leftIndex = generateRandomNumber();
    // }

    leftImage.setAttribute('src', allProduct[leftIndex].url);
    centerImage.setAttribute('src', allProduct[centerIndex].url);
    rightImage.setAttribute('src', allProduct[rightIndex].url);

    currentLeftImage = allProduct[leftIndex];
    currentRightImage = allProduct[rightIndex];
    currentcenterImage = allProduct[centerIndex];


    currentLeftImage.timeShown = Number(localStorage.getItem(currentLeftImage.name+'_timeOfShown'));
    currentLeftImage.timeShown += 1;
    localStorage.setItem(currentLeftImage.name+'_timeOfShown', currentLeftImage.timeShown);

    currentcenterImage.timeShown = Number(localStorage.getItem(currentcenterImage.name+'_timeOfShown'));
    currentcenterImage.timeShown += 1;
    localStorage.setItem(currentcenterImage.name+'_timeOfShown', currentcenterImage.timeShown);

    currentRightImage.timeShown = Number(localStorage.getItem(currentRightImage.name+'_timeOfShown'));
    currentRightImage.timeShown += 1;
    localStorage.setItem(currentRightImage.name+'_timeOfShown', currentRightImage.timeShown);

}

function generateRandomNumber(imageBox) {
    var random;
    var allowed;
    do {

        random = Math.floor(Math.random() * allProduct.length);
        allowed = true;

        for (var i = 0; i < imageBox.length; i++) {


            if (imageBox[i] === random) {
                allowed = false;

            }

        }
    } while (!allowed);


    return random;

    // return Math.floor(Math.random() * allProduct.length);
}

pickImages();

productSection.addEventListener('click', handleClick);

function handleClick(event) {
    var txtCounter = document.getElementById('txtCounter');
    if (totalClicks < txtCounter.value) {

        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if (clickedElementId === 'left_img' || clickedElementId === 'center_img' || clickedElementId === 'right_img') {
            totalClicks++;

            if (clickedElementId === 'left_img') {
                currentLeftImage.numberOfClicks = Number(localStorage.getItem(currentLeftImage.name));
                currentLeftImage.numberOfClicks += 1;
                localStorage.setItem(currentLeftImage.name, currentLeftImage.numberOfClicks);
            }

            if (clickedElementId === 'center_img') {
                currentcenterImage.numberOfClicks = Number(localStorage.getItem(currentcenterImage.name));
                currentcenterImage.numberOfClicks += 1;
                localStorage.setItem(currentcenterImage.name, currentcenterImage.numberOfClicks);
            }

            if (clickedElementId === 'right_img') {
                currentRightImage.numberOfClicks = Number(localStorage.getItem(currentRightImage.name));
                currentRightImage.numberOfClicks += 1;
                localStorage.setItem(currentRightImage.name, currentRightImage.numberOfClicks);
            }

            pickImages();
        }
    } else {
        // for (var i = 0; i < allProduct.length; i++) {
        //     var listItem = document.createElement('li');
        //     listItem.textContent = allProduct[i].name + ' has ' + allProduct[i].numberOfClicks + ' clicks, and ' + allProduct[i].timeShown + ' time shown';
        //     finalResult.appendChild(listItem);
        // }

        localStorage.setItem('Products', JSON.stringify(allProduct));
        console.log(JSON.parse(localStorage.getItem('Products')));

        allProduct = JSON.parse(localStorage.getItem('Products'));
        // newJSONArray = JSON.parse(localStorage.getItem('Products'));

        productSection.removeEventListener('click', handleClick);
                drawChart();

    }


    // console.log(currentRightImage);
    // console.log(currentLeftImage);
    // console.log(currentcenterImage);
}

function drawChart() {

    var allClicks = [];
    var allShown = [];

    for (var i = 0; i < allProduct.length; i++) {
        allClicks.push(allProduct[i].numberOfClicks);
    }

    for (var x = 0; x < allProduct.length; x++) {
        allShown.push(allProduct[x].timeShown);
    }

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productName,
            datasets: [{
                    label: '# of Clicks',
                    data: allClicks,
                    backgroundColor: '#a0c1b8',
                    borderColor: '#f4ebc1',
                    borderWidth: 1
                },
                {
                    label: '# of Shows',
                    data: allShown,
                    backgroundColor: '#709fb0',
                    borderColor: '#f4ebc1',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    }
                }]
            }
        }
    });
}