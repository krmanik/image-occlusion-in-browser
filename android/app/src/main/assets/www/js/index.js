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

var selectedElement = "";
document.addEventListener('click', function (e) {
    //console.log(e.target.id);
    selectedElement = e.target.id;
}, false);

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
        document.getElementById("statusMsg").innerHTML = "Add image first";
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
        document.getElementById("statusMsg").innerHTML = "";
    } catch (e) {
        console.log(e);
        document.getElementById("statusMsg").innerHTML = "Add image first";
    }
}

function removeRect() {
    try {
        if (document.getElementById(selectedElement).tagName == "rect") {
            var svgEle = SVG.adopt(document.getElementById(selectedElement))
            svgEle.selectize(false);
            svgEle.remove();
            document.getElementById("statusMsg").innerHTML = "";
        }
    } catch (e) {
        console.log(e);
        document.getElementById("statusMsg").innerHTML = "Select a rectangle";
    }
}

var imgHeight;
var imgWidth;
function addImage() {

    try {
        document.getElementById("drawing").innerHTML = "<img id='uploadPreview'/>";
        document.getElementById("tools-bar").style.position = "absolute";
        document.getElementById("tools-bar").style.padding = "10px";

        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("uploadPreview");
        imgtag.title = selectedFile.name;

        originalImageName = imgtag.title;
        console.log("Img Name "+ originalImageName );

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

                document.getElementById("statusMsg").innerHTML = "";

            };
        };

        reader.readAsDataURL(selectedFile);
    } catch (e) {
        console.log(e);
        document.getElementById("statusMsg").innerHTML = "Image import error";
    }

};

/* Download */
async function downloadNote() {

    var child = document.getElementById("SVG101").childNodes;

    var oneTime = true;
    var csvLine = "";



    for (i = 0; i < child.length; i++) {

        var origSVG = "";
        var svgQues = "";
        var svgAns = "";
        // don't add svg with 0 width and 0 height
        if (child[i].getBBox().height != 0 && child[i].getBBox().width != 0) {

            for (j = 0; j < child.length; j++) {

                if (child[j].tagName == "rect") {

                    child[j].style.fill = originalColor;

                    origSVG += child[j].outerHTML;

                    if (i == j) {

                        child[j].style.fill = questionColor;

                        svgQues += child[j].outerHTML;

                        child[j].style.fill = originalColor;

                    } else {

                        svgQues += child[j].outerHTML;
                        svgAns += child[j].outerHTML;
                    }
                }
            }

            // add time stamp
            var timeStamp = new Date().getTime();

            if (child[i].tagName == "rect") {

                if (oneTime) {
                    // origin mask
                    //console.log("orig " + origSVG);
                    var origFileName = "cordova-img-occ-orig-" + timeStamp;
                    saveSVG(origFileName, origSVG, imgHeight, imgWidth);
                    oneTime = false;
                }

                // Question Mask
                var quesFileName = "cordova-img-occ-ques-" + timeStamp;
                //console.log("Ques " + svgQues);

                await saveSVG(quesFileName, svgQues, imgHeight, imgWidth);

                // Answer mask
                var ansFileName = "cordova-img-occ-ans-" + timeStamp;
                //console.log("ans " + svgAns);

                await saveSVG(ansFileName, svgAns, imgHeight, imgWidth);

                // get all input note from form
                getNoteFromForm();

                var noteId = "cordova-img-occ-note-" + timeStamp;

                csvLine += noteId +
                    "\t" + noteHeader +
                    "\t" + "<img src='" + originalImageName + "'></img>" +
                    "\t" + "<img src='" + quesFileName + ".svg'></img>" +
                    "\t" + noteFooter +
                    "\t" + noteRemarks +
                    "\t" + noteSources +
                    "\t" + noteExtra1 +
                    "\t" + noteExtra2 +
                    "\t" + "<img src='" + ansFileName + ".svg'></img>" +
                    "\t" + "<img src='" + origFileName + ".svg'></img>" + "\n";


                var origImgSVG = "<img src='" + originalImageName + "'></img>";
                var quesImgSVG = "<img src='" + quesFileName + ".svg'></img>";
                var ansImgSVG = "<img src='" + ansFileName + ".svg'></img>";
                var origFile = "<img src='" + origFileName + ".svg'></img>";

                var cardData = [noteId, noteHeader, origImgSVG, quesImgSVG, noteFooter, noteRemarks, noteSources, noteExtra1, noteExtra2, ansImgSVG, origFile];

                addCardToAnkiDroid(cardData);

            }

        }
    }

    if (csvLine != "") {
        var f = "output-note" + note_num + ".txt";
        exportFile(csvLine, f);
        note_num++;

        // add to view note side bar
        addCsvLineToViewNote(csvLine);
        //document.getElementById("noteData").innerHTML = csvLine;
    }
}

function exportFile(csv, filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));

    //var filename = "output.txt";
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
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

    await pause(200);

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

var noteHeader;
var noteFooter;
var noteRemarks;
var noteSources;
var noteExtra1;
var noteExtra2;

function getNoteFromForm() {
    noteHeader = document.getElementById("noteHeader").value;
    noteFooter = document.getElementById("noteFooter").value;
    noteRemarks = document.getElementById("noteRemarks").value;
    noteSources = document.getElementById("noteSources").value;
    noteExtra1 = document.getElementById("noteExtra1").value;
    noteExtra2 = document.getElementById("noteExtra2").value;
}


var textare_id = 0;
function addCsvLineToViewNote(csv) {
    var container = document.getElementById("noteData");
    var textarea = document.createElement("textarea");
    textarea.id = "note-text-area-" + textare_id;
    textarea.setAttribute("style", "display: block; width:90%; height:10vh; margin-top:6px;");
    textarea.value = csv;
    container.appendChild(textarea);
    document.getElementById(textarea.id).readOnly = true;
    textare_id += 1;
}

function downloadAllNotes() {
    var container = document.getElementById("noteData");

    var textToExport = "";
    for (i = 0; i < container.childElementCount; i++) {
        textToExport += container.children[i].value;
    }

    exportFile(textToExport, "output-all-notes.txt");
}

function addNote() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function viewNote() {
    document.getElementById("viewNoteSideNav").style.width = "100%";
}

function closeViewNoteNav() {
    document.getElementById("viewNoteSideNav").style.width = "0";
}

var scaleVar = 1.0;
function zoomOut() {
    scaleVar -= 0.1;
    document.getElementById("SVG101").style.transform = "scale(" + scaleVar + ")";
    document.getElementById("uploadPreview").style.transform = "scale(" + scaleVar + ")";
}

function zoomIn() {
    scaleVar += 0.1;
    document.getElementById("SVG101").style.transform = "scale(" + scaleVar + ")";
    document.getElementById("uploadPreview").style.transform = "scale(" + scaleVar + ")";
}


function resetZoom() {
    document.getElementById("SVG101").style.transform = "scale(1.0)";
    document.getElementById("uploadPreview").style.transform = "scale(1.0)";
    scaleVar = 1.0;
}

function viewHelp() {
    document.getElementById("viewHelpSideNav").style.height = "100%";
}

function closeViewHelpNav() {
    document.getElementById("viewHelpSideNav").style.height = "0";
}

function viewSettings() {
    document.getElementById("settingsSideNav").style.height = "100%";
}

function closeSettingsNav() {
    settings();
    document.getElementById("settingsSideNav").style.height = "0";
}

// assign to input
var questionColor = "#F44336";
var originalColor = "#fdd835";
// change if value changed by user
function settings() {
    questionColor = document.getElementById("QColor").value;
    originalColor = document.getElementById("OColor").value;

    // check if valid hex value, set to default if not valid
    if (!/^#[0-9A-F]{6}$/i.test(questionColor)) {
        questionColor = "#F44336";
        viewSettings();
    }

    if (!/^#[0-9A-F]{6}$/i.test(originalColor)) {
        originalColor = "#fdd835";
        viewSettings();
    }
}

window.onbeforeunload = function () {
    return "Have you downloaded output-all-notes.txt?";
};

/* https://stackoverflow.com/questions/9334084/moveable-draggable-div */
window.onload = function () {
    var e = document.getElementById('tools-bar')
    draggable(e);

    touchDraggable(e);

    document.getElementById("QColor").value = questionColor;
    document.getElementById("OColor").value = originalColor;
}

function draggable(el) {
    el.addEventListener('mousedown', function (e) {
        var offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
        var offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);

        function mouseMoveHandler(e) {
            el.style.top = (e.clientY - offsetY) + 'px';
            el.style.left = (e.clientX - offsetX) + 'px';
        }

        function reset() {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', reset);
        }

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', reset);
    });
}

/* https://www.kirupa.com/html5/drag.htm */
function touchDraggable(el) {
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    el.addEventListener("touchstart", dragStart, false);
    el.addEventListener("touchend", dragEnd, false);
    el.addEventListener("touchmove", drag, false);

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
    }

    function drag(e) {
        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, el);
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}

// save to app directory
function saveFile (fileName, fileData) {
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (directoryEntry) {
        console.log(directoryEntry); 
        directoryEntry.getFile(fileName, { create: true, exclusive: false }, function (entry) {
            entry.createWriter(function (writer) {
                console.log("Writing..." + fileName);
                writer.write(fileData);
            }, function (error) {
                console.log("Error " + error.code);
            });
        });
     });
}

function success(result){
    alert("plugin result: " + result);
};

var added = true;
function addCardToAnkiDroid(cardData) {
    //console.log(cardData);
    // noteId, noteHeader, origImgSVG, quesImgSVG, noteFooter, noteRemarks, noteSources, noteExtra1, noteExtra2, ansImgSVG, origFile
    var note = {
        "noteId" : cardData[0],
        "header" : cardData[1],

        "origImgSvg" : cardData[2],
        "quesImgSvg" : cardData[3],

        "footer" : cardData[4],
        "remarks" : cardData[5],
        "sources" : cardData[6],

        "extra1" : cardData[7],
        "extra2" : cardData[8],

        "ansImgSvg" : cardData[9],
        "origImg" : cardData[10]
    }

    var noteData = JSON.stringify(note);

    cordova.plugins.addCard(noteData, function (result) {
            console.log(result);
        });
}