function new_note() {
    var page = document.getElementById('page').value;
    if (page != '') {
        if (window.confirm('This will erase all unsaved changes. Are you sure you want to continue?')) {
            document.getElementById('page').value = '';
            localStorage.setItem('page', '');
        }
    }
    else {
        document.getElementById('page').value = '';
        localStorage.setItem('page', '');
    }
}

function save_note() {
    var page = document.getElementById('page').value;
    var fileName = 'note.txt';
    var blob = new Blob([page], { type: "text/plain;charset=utf-8" });
    var downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(blob);
    } else {
        // Firefox requires the link to be added to the DOM before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}
function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
}

function open_file(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var page = document.getElementById('page');
        page.value = e.target.result;
        localStorage.setItem('page', page.value);
    };
    reader.readAsText(file);
}

function save_state() {
    var page = document.getElementById('page').value;
    localStorage.setItem('page', page);
}

function load_state() {
    var page = localStorage.getItem('page');
    document.getElementById('page').value = page;
}

addEventListener('load', load_state);