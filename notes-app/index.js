function transformNotes(notes) {
  return notes.slice().sort(function sortNotes(a, b) {
    return b.timestamp - a.timestamp;
  });
}

function formatTimestamp(timestamp) {
  return new Date(timestamp).toUTCString();
}

function formatTitle(body) {
  if (body.length === 0) {
    return "New Note";
  }

  if (body.length <= 20) {
    return body;
  } else if (body.length === 0) {
    return "New Note";
  } else {
    return body.substring(0, 17) + "...";
  }
}

function updateNote() {
  var body = this.value;
  var timestamp = Date.now();

  var $note = document.querySelector(".note-selector.active");
  $note.dataset.body = body;
  $note.dataset.timestamp = timestamp;

  document.querySelector(".note-editor-info").innerHTML = formatTimestamp(parseInt(timestamp));
  document.querySelector(".note-selector.active .note-selector-title").innerHTML = formatTitle(body);
  document.querySelector(".note-selector.active .note-selector-timestamp").innerHTML = formatTimestamp(
    parseInt(timestamp)
  );

  document.querySelector(".note-selectors").removeChild($note);
  document.querySelector(".note-selectors").prepend($note);
}

function createNote() {
  var note = { id: Date.now(), body: "", timestamp: Date.now() };
  var htmlString = `
        <div
          class="note-selector"
          onclick="selectNote(this)"
          data-body="${note.body}"
          data-timestamp="${note.timestamp}"
          >
          <p class="note-selector-title">${formatTitle(note.body)}</p>
          <p class="note-selector-timestamp">${formatTimestamp(note.timestamp)}</p>
        </div>
  `;
  document.querySelector(".note-selectors").insertAdjacentHTML("afterbegin", htmlString);
  document.querySelector(".note-selector").click();
}

function deleteNote() {
  var $note = document.querySelector(".note-selector.active");
  var $parent = document.querySelector(".note-selectors");
  $parent.removeChild($note);
}

function selectNote($note) {
  document.querySelector(".note-selector.active")?.classList.remove("active");
  $note.classList.add("active");

  document.querySelector(".note-editor-input").value = $note.dataset.body;
  document.querySelector(".note-editor-info").innerHTML = formatTimestamp(parseInt($note.dataset.timestamp));
}

var notes = [
  { id: 1, body: "This is a First Test", timestamp: Date.now() - 30000000000 },
  { id: 2, body: "This is ", timestamp: Date.now() - 20000000000 },
  { id: 3, body: "This is a third test", timestamp: Date.now() - 10000000000 },
  { id: 4, body: "This is a fourth test", timestamp: Date.now() },
];

var htmlString = "";

transformNotes(notes).forEach(function (note) {
  htmlString += `
        <div
          class="note-selector"
          onclick="selectNote(this)"
          data-body="${note.body}"
          data-timestamp="${note.timestamp}"
          >
          <p class="note-selector-title">${formatTitle(note.body)}</p>
          <p class="note-selector-timestamp">${formatTimestamp(note.timestamp)}</p>
        </div>
  `;
});

document.querySelector(".note-selectors").innerHTML = htmlString;
document.querySelector(".note-editor-input").addEventListener("input", updateNote);
document.querySelector(".toolbar-button-new").addEventListener("click", createNote);
document.querySelector(".toolbar-button-delete").addEventListener("click", deleteNote);
