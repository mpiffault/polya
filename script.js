'use strict';

function polya(){
    /*global console*/

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var iterations = 1000;
    var urn = ['#69D2E7','#A7DBD8','#E0E4CC', '#F38630','#FA6900'];

    function drawWithReinforcement(urn) {
        var randIndex = Math.floor(Math.random() * urn.length);
        urn.push(urn[randIndex]);
        // We return a copy of the array
        return urn.slice(0);
    }

    function countElementsInUrn(urn) {
        var countObject = {};
        urn.map(function (element) {
            var elementCount = countObject[element];
           countObject[element] = elementCount === undefined ? 1 : elementCount + 1;
        });
        return countObject;
    }

    function countDistinctElementsInResult(result) {
        var nbDistinctElements = 0;
        for (var element in result) {
            if (result.hasOwnProperty(element)) {
                nbDistinctElements++;
            }
        }
        return nbDistinctElements;
    }

    function drawGraphs(urn) {
        var result = countElementsInUrn(urn);
        context.clearRect(0, 0, canvas.width, canvas.height);
        var nbDistinctElements = countDistinctElementsInResult(result);
        var barWidth = canvas.width / nbDistinctElements;
        var start = 0;
        for (var element in result) {
            if (result.hasOwnProperty(element)) {
                var barHeight = (-1*result[element]) * (canvas.height / iterations);
                var color = element;
                context.beginPath();
                context.rect(start, canvas.height, barWidth, barHeight);
                context.fillStyle = color;
                context.fill();
                start += barWidth;
            }
        }
    }

    for (var i = 0 ; i < iterations ; i++) {
        // We use global urn to make the draw
        var localUrn = drawWithReinforcement(urn);

        // We use the copy returned after draw to do the graphics
        (function(localLocalUrn, i){
            setTimeout(function(){drawGraphs(localLocalUrn);}, 5 * i);
        })(localUrn, i);
    }
}

document.getElementById('launch').onclick = polya;

polya();