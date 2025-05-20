let documents = JSON.parse(localStorage.getItem('documents')) || {};
let currentDoc = '';
function updateDropdown(){
    const selector = document.getElementById('docSelector');
    selector.innerHTML = '';
    for (let name in documents){
        const option = document.createElement('option');
        option.value = name;
        option.text = name;
        selector.appendChild(option);
    }
    selector.value = currentDoc;
}

function createNewDoc() {
    const name = prompt ("Name of new document:");
    if (name && !documents[name]) {
        documents[name] = '';
        currentDoc = name;
        updateDropdown();
        loadDoc();
        saveToStorage();
    } 
    else {
        alert("Invalid or duplicate name.")
    }
}

function loadDoc(){
    document.getElementById('textArea').value = documents[currentDoc] || '';
}

function saveDoc() {
    documents[currentDoc] = document.getElementById('textArea').value;
    saveToStorage();
}

//Fisher-Yates Algorithm
function shuffleTxt(){
    const textArea = document.getElementById('textArea');
    let lines = textArea.value.split('\n');
    for (let i = lines.length - 1; i>0; i--){
        const jrand = Math.floor(Math.random() *  (i+1));

        const temp = lines[i];
        lines[i] = lines[jrand];
        lines[jrand] = temp;
    }
    textArea.value = lines.join('\n');
}

function saveToStorage() {
    localStorage.setItem('documents', JSON.stringify(documents));
}

document.getElementById('docSelector').addEventListener('change', function (){
    currentDoc = this.value;
    loadDoc();
});

window.onload = () => {
    const keys = Object.keys(documents);
    if (keys.length > 0) {
        currentDoc = keys[0];
    }
    else {
        currentDoc = 'Default';
        documents[currentDoc] = '';
    }
    updateDropdown();
    loadDoc();
}