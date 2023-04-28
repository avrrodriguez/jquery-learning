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

var notes = [
  { id: 1, body: "This is a First Test", timestamp: Date.now() - 30000000000 },
  { id: 2, body: "This is ", timestamp: Date.now() - 20000000000 },
  { id: 3, body: "This is a third test", timestamp: Date.now() - 10000000000 },
  { id: 4, body: "This is a fourth test", timestamp: Date.now() },
];

var htmlString = "";

transformNotes(notes).forEach(function (note) {
  htmlString += `
        <div class="note-selector active" id=${note.id}>
          <p class="note-selector-title">${formatTitle(note.body)}</p>
          <p class="note-selector-timestamp">${formatTimestamp(note.timestamp)}</p>
        </div>
  `;
});

document.querySelector(".note-selectors").innerHTML = htmlString;
