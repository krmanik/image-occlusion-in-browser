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
                createGroup(addedList)
            }
        }
    }

    if (document.getElementById("addState").value == "true") {
        if (document.getElementById(selectedElement).tagName == "rect") {
            svgGroup = "added";

            if (document.getElementById(selectedElement).style.fill == "" || document.getElementById(selectedElement).style.fill == hexToRgb(originalColor)) {
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
            }
        }
    }

}, false);

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

function drawRect() {
    try {
        document.getElementById("drawing").style.zoom = "100%";
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

    // remove selected rect to create answer mask
    for (j = 0; j < list.length; j++) {
        document.getElementById(list[j]).outerHTML = "";
    }

    // add remaining to answer mask
    for (j = 0; j < child.length; j++) {
        if (child[j].tagName == "rect") {
            svgAns += child[j].outerHTML;
        }
    }

    // add time stamp
    var timeStamp = new Date().getTime();

    // origin mask
    //console.log("orig " + origSVG);
    var origFileName = "img-occ-orig-" + timeStamp;
    await saveSVG(origFileName, origSVG, imgHeight, imgWidth);
    oneTime = false;
    origSVG = "";

    // Question Mask
    var quesFileName = "img-occ-ques-" + timeStamp;
    //console.log("Ques " + svgQues);

    await saveSVG(quesFileName, svgQues, imgHeight, imgWidth);
    svgQues = "";

    // Answer mask
    var ansFileName = "img-occ-ans-" + timeStamp;
    //console.log("ans " + svgAns);

    await saveSVG(ansFileName, svgAns, imgHeight, imgWidth);

    // get all input note from form
    getNoteFromForm();

    var noteId = "img-occ-note-" + timeStamp;

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

    var f = "output-note" + note_num + ".txt";
    exportFile(csvLine, f);
    note_num++;

    // add to view note side bar
    addCsvLineToViewNote(csvLine);
    //document.getElementById("noteData").innerHTML = csvLine;

    //reset all
    svgGroup = "";
    addedList = [];
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

    await pause(600);

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
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
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

var zoomVar = 100;
function zoomOut() {
    zoomVar -= 10;
    document.getElementById("drawing").style.zoom = zoomVar + "%";
}

function zoomIn() {
    zoomVar += 10;
    document.getElementById("drawing").style.zoom = zoomVar + "%";
}


function resetZoom() {
    document.getElementById("drawing").style.zoom = "100%";
    zoomVar = 100;
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
    document.getElementById("settingsSideNav").style.height = "0";
    document.getElementById("statusMsg").innerHTML = "";

    settings();
    // check if valid hex value, set to default if not valid
    if (!/^#[0-9A-F]{6}$/i.test(questionColor)) {
        questionColor = "#F44336";
        document.getElementById("settingsSideNav").style.height = "100%";
        document.getElementById("statusMsg").innerHTML = "Not a valid color";
    }

    if (!/^#[0-9A-F]{6}$/i.test(originalColor)) {
        originalColor = "#fdd835";
        document.getElementById("settingsSideNav").style.height = "100%";
        document.getElementById("statusMsg").innerHTML = "Not a valid color";
    }
}

// assign to input
var questionColor = "#F44336";
var originalColor = "#fdd835";
// change if value changed by user
function settings() {
    questionColor = document.getElementById("QColor").value;
    originalColor = document.getElementById("OColor").value;
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