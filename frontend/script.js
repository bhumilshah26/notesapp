const apiBaseUrl = 'http://localhost:3000/notes'; // Adjust based on your API endpoint

const addNote = async () => {
    const title = document.getElementById('noteTitle').value;
    const body = document.getElementById('noteBody').value;

    try {
        const response = await axios.post(apiBaseUrl, { title, body });
        if (response.status === 201) {
            alert('Note added successfully');
            loadNotes();
        }
    } catch (error) {
        alert('Error adding note');
        console.error(error);
    }
};

const loadNotes = async () => {
    try {
        const response = await axios.get(apiBaseUrl);
        const notes = response.data;

        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';

        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = `${note.title}: ${note.body}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeNote(note.title);
            li.appendChild(removeButton);
            notesList.appendChild(li);
        });
    } catch (error) {
        alert('Error loading notes');
        console.error(error);
    }
};

const removeNote = async (title) => {
    try {
        console.log(`Removing note with title: ${title}`); // Debugging line

        const response = await axios.delete(`${apiBaseUrl}/${encodeURIComponent(title)}`);
        if (response.status === 204) {
            alert('Note removed successfully');
            loadNotes();
        }
    } catch (error) {
        alert('Error removing note');
        console.error(error);
    }
};

window.onload = loadNotes;
