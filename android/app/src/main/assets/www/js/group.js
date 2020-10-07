/* Do not remove
MIT License

Copyright (c) 2020 Mani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/*
  Not a good implementation for creating group element.
  Help wanted for improving the codes.
*/

var selectedElement = "";
var svgGroup = "";
var addedList = [];
document.addEventListener('click', function (e) {
    //console.log(e.target.id);
    selectedElement = e.target.id;


    document.getElementById("addState").onclick = function () {
        if (document.getElementById("addState").value == "false") {
            document.getElementById("addState").value = true;
            document.getElementById("iconGroup").style.color = "#FF6F00";

            createOrigSvg();

        } else {
            document.getElementById("addState").value = false;
            document.getElementById("iconGroup").style.color = "#607d8b";

            if (svgGroup != "") {
                createQuesSvg();
                //createGroup(addedList)
            }
        }
    }

    if (document.getElementById("addState").value == "true") {

        document.getElementById("done-btn").style.display = "none";

        if (document.getElementById(selectedElement).tagName == "rect") {
            svgGroup = "added";

            var c = hexToRgb(originalColor);
            var color = "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";
            if (document.getElementById(selectedElement).style.fill == "" || document.getElementById(selectedElement).style.fill == color) {
                document.getElementById(selectedElement).style.fill = questionColor;
                addedList.push(selectedElement);
            } else {

                // if again tap then remove from list
                for (i = 0; i < addedList.length; i++) {
                    if (selectedElement == addedList[i]) {
                        document.getElementById(selectedElement).style.fill = originalColor;
                        addedList.splice(i, 1);
                        break;
                    }
                }
                if (addedList.length == 0) {
                    svgGroup = "";
                }
            }
        }
    } else {
        document.getElementById("done-btn").style.display = "block";
    }

}, false);

function confirmCreate() {
    createGroup(addedList);
}

/* https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var note_num = 1;
var originalImageName;
var draw;
var rect;
/*SVG.on(document, 'DOMContentLoaded', function () {
    draw = SVG('drawing')
            .height(600)
            .width(600)

    rect = draw.rect(100, 100).move(100, 50).fill('#f06')

    rect
        .on('click', function () {
            this
                .draggable()
                .selectize()
                .resize()
        })
})*/
var rec;
function drawRect() {
    try {
        document.getElementById("drawRectId").style.color = "#fdd835";

        draw.rect().draw().fill(originalColor)
            .on('drawstop', function () {
                document.getElementById("drawRectId").style.color = "#009688";
            })
            .on('click', function () {
                this
                    .draggable()
                    .selectize()
                    .resize()
            });

    } catch (e) {
        console.log(e);
        showSnackbar("Add image first");
        document.getElementById("drawRectId").style.color = "#009688";
    }
}

function addRect() {
    try {
        draw.rect(200, 50).move(100, 50).fill(originalColor)
            .on('click', function () {
                this
                    .draggable()
                    .selectize()
                    .resize()
            })
    } catch (e) {
        console.log(e);
        showSnackbar("Add image first");
    }

}

function removeRect() {
    try {
        if (document.getElementById(selectedElement).tagName == "rect") {
            var svgEle = SVG.adopt(document.getElementById(selectedElement));
            svgEle.selectize(false);

            // remove from list also
            for (i = 0; i < addedList.length; i++) {
                if (selectedElement == addedList[i]) {
                    addedList.splice(i, 1);
                    break;
                }
            }

            svgEle.remove();
        }
    } catch (e) {
        console.log(e);
        showSnackbar("Select a rectangle");
    }
}

var imgHeight;
var imgWidth;
function addImage() {
    scaleVar = 1.0;
    try {
        document.getElementById("drawing").innerHTML = "<img id='uploadPreview'/>";

        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("uploadPreview");
        imgtag.title = selectedFile.name;

        originalImageName = imgtag.title;

        reader.onload = function (event) {
            imgtag.src = event.target.result;

            imgtag.onload = function () {
                // access image size here 
                //console.log(this.width);
                //console.log(this.height);

                imgHeight = this.height;
                imgWidth = this.width;

                draw = SVG('drawing')
                    .height(imgHeight)
                    .width(imgWidth)
                    .id("SVG101")
            };
        };

        reader.readAsDataURL(selectedFile);
    } catch (e) {
        console.log(e);
        showSnackbar("Image import error");
    }

};

var origSVG = "";
function createOrigSvg() {
    var child = document.getElementById("SVG101").childNodes;

    for (j = 0; j < child.length; j++) {

        if (child[j].tagName == "rect") {
            origSVG += child[j].outerHTML;
        }
    }
}

var svgQues = "";
function createQuesSvg() {
    var child = document.getElementById("SVG101").childNodes;

    for (j = 0; j < child.length; j++) {
        if (child[j].tagName == "rect") {
            svgQues += child[j].outerHTML;
        }
    }
}

/* Download */
async function createGroup(list) {

    var child = document.getElementById("SVG101").childNodes;

    var csvLine = "";
    var svgAns = "";

    // remove selection
    for (i = 0; i < child.length; i++) {
        try {
            if (child[i].tagName == "rect") {
                var svgEle = SVG.adopt(document.getElementById(child[i].id))
                svgEle.selectize(false);
            }
        } catch (e) {
            console.log("error");
        }
    }

    var removedSvgList = [];
    // remove selected rect to create answer mask
    for (j = 0; j < list.length; j++) {
        document.getElementById(list[j]).style.fill = originalColor;
        removedSvgList.push(document.getElementById(list[j]).outerHTML);
        document.getElementById(list[j]).outerHTML = "";
    }

    // add remaining to answer mask
    for (j = 0; j < child.length; j++) {
        if (child[j].tagName == "rect") {
            svgAns += child[j].outerHTML;
        }
    }

    // add removed svg again to svg main
    for (i = 0; i < removedSvgList.length; i++) {
        document.getElementById("SVG101").innerHTML += removedSvgList[i];
    }

    removedSvgList = [];

    // again allow selection
    for (i = 0; i < child.length; i++) {
        try {
            if (child[i].tagName == "rect") {
                var svgEle = SVG.adopt(document.getElementById(child[i].id))
                svgEle.selectize(true);
                svgEle.draggable(true);
                svgEle.resize(true);
            }
        } catch (e) {
            console.log("error");
        }
    }

    // add time stamp
    var timeStamp = new Date().getTime();

    // origin mask
    //console.log("orig " + origSVG);
    var origFileName = "cordova-img-occ-orig-" + timeStamp;
    await saveSVG(origFileName, origSVG, imgHeight, imgWidth);
    oneTime = false;
    origSVG = "";

    // Question Mask
    var quesFileName = "cordova-img-occ-ques-" + timeStamp;
    //console.log("Ques " + svgQues);

    await saveSVG(quesFileName, svgQues, imgHeight, imgWidth);
    svgQues = "";

    // Answer mask
    var ansFileName = "cordova-img-occ-ans-" + timeStamp;
    //console.log("ans " + svgAns);

    await saveSVG(ansFileName, svgAns, imgHeight, imgWidth);

    // get all input note from form
    getNoteFromForm();

    var noteId = "cordova-img-occ-note-" + timeStamp;

    /*csvLine += noteId +
        "\t" + noteHeader +
        "\t" + "<img src='" + originalImageName + "'></img>" +
        "\t" + "<img src='" + quesFileName + ".svg'></img>" +
        "\t" + noteFooter +
        "\t" + noteRemarks +
        "\t" + noteSources +
        "\t" + noteExtra1 +
        "\t" + noteExtra2 +
        "\t" + "<img src='" + ansFileName + ".svg'></img>" +
        "\t" + "<img src='" + origFileName + ".svg'></img>" + "\n";*/

    //var f = "output-note" + note_num + ".txt";
    //exportFile(csvLine, f);
    //note_num++;

    var origImgSVG = "<img src='" + originalImageName + "'></img>";
    var quesImgSVG = "<img src='" + quesFileName + ".svg'></img>";
    var ansImgSVG = "<img src='" + ansFileName + ".svg'></img>";
    var origFile = "<img src='" + origFileName + ".svg'></img>";

    var cardData = [noteId, noteHeader, origImgSVG, quesImgSVG, noteFooter, noteRemarks, noteSources, noteExtra1, noteExtra2, ansImgSVG, origFile];

    addCardToAnkiDroid(cardData);

    // add to view note side bar
    //addCsvLineToViewNote(csvLine);
    //document.getElementById("noteData").innerHTML = csvLine;

    //reset all
    svgGroup = "";
    addedList = [];
}

/* https://stackoverflow.com/questions/53560991/automatic-file-downloads-limited-to-10-files-on-chrome-browser */
function pause(msec) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(resolve, msec || 1000);
        }
    );
}

var svgNS = "http://www.w3.org/2000/svg";
var xmlns = "http://www.w3.org/2000/svg";

async function saveSVG(name, rect, height, width) {

    await pause(50);

    var svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute("xmlns", xmlns);
    svg.setAttributeNS(null, "height", height);
    svg.setAttributeNS(null, "width", width);

    var g = document.createElementNS(svgNS, "g");
    g.innerHTML = rect;

    svg.append(g);

    var svgData = svg.outerHTML;

    var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

    var svgUrl = URL.createObjectURL(svgBlob);
    /*var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();*/

    saveFile(name+".svg", svgBlob);
}

function resetTitle() {
    document.getElementById('menu-icon').innerHTML = "menu";
    document.getElementById("page-title-id").innerHTML = "Group Cloze";
    document.getElementById("done-btn").style.display = "block";
}