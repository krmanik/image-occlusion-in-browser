// The `initSqlJs` function is globally provided by all of the main dist files if loaded in the browser.
// We must specify this locateFile function if we are loading a wasm file from anywhere other than the current html page's folder.
config = {
    locateFile: filename => `js/genanki/sql/sql-wasm.wasm`
}

var SQL;
initSqlJs(config).then(function (sql) {
    //Create the database
    SQL = sql;
});

const m = new Model({
    name: MODEL_NAME,
    id: "2156341623643",
    flds: FIELDS,
    css: CSS1,
    req: [
        [0, "all", [0]],
    ],
    tmpls: [
        {
            name: "Card 1",
            qfmt: QFMT1,
            afmt: AFMT1,
        }
    ],
})

const d = new Deck(1347617346765, deckName)
const p = new Package()

function addImageToDeck(fname, blob) {
    p.addMedia(blob, fname);
}

// add note to deck
var addedCount = 0;
function addNoteToDeck() {
    var container = document.getElementById("noteData");

    var textToExport = "";
    for (i = 0; i < container.childElementCount; i++) {
        textToExport += container.children[i].value;
    }

    if (textToExport == "") {
        showSnackbar("Add notes to deck first");
        return;
    }

    // console.log(textToExport);

    var lines = textToExport.split("\n");
    for (l of lines) {
        var noteData = l.split("\t");
        // this deck have 11 fields view config.js for more
        if (noteData.length == 11) {
            addedCount++;
            d.addNote(m.note(noteData))
        }
    }
}

// add deck to package and export
function _exportDeck() {
    p.addDeck(d)
    p.writeToFile('Anki-Deck-Export.apkg')
}

function exportDeck() {
    showSnackbar("Wait... deck is exporting");
    addNoteToDeck();
    _exportDeck();
}