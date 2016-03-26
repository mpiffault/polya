'use strict';

function polya() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var iterations = 1000;
    var duration = 3000;
    var urn = ['#69D2E7','#A7DBD8','#E0E4CC', '#F38630','#FA6900'];

    var startTime;
    var lastTime = undefined;
    var epsilon = 0;

    var currentIteration = 0;

    function drawWithReinforcement() {
        var randIndex = Math.floor(Math.random() * urn.length);
        urn.push(urn[randIndex]);
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

    function drawGraphs() {
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

    function step(timestamp) {

        if (!lastTime) {
            lastTime = timestamp;
            startTime = timestamp;
        }

        var elapsedTime = timestamp - lastTime;
        epsilon += elapsedTime % 1;

        var nbIterations = (elapsedTime * iterations) / duration;

        for (var i = 0 ; (currentIteration < iterations) && (i < nbIterations) ; i++) {
            drawWithReinforcement();
            currentIteration++;
        }

        drawGraphs();


        lastTime = performance.now();
        if (currentIteration < iterations) {
            window.requestAnimationFrame(step)
        } else {
            console.log("Total elapsed time = ", (lastTime - startTime) + epsilon);
            console.log("Last iteration = ", currentIteration);
        }
    }

    window.requestAnimationFrame(step);
}

document.getElementById('launch').onclick = polya;

polya();