import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from '/imports/api/notes';

export const App = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const notes = useTracker(() => {
    Meteor.subscribe('notes');
    return Notes.find({}, { sort: { createdAt: -1 } }).fetch();
  });

  const addNote = () => {
    if (!title.trim() || !body.trim()) return;
    Notes.insert({ title, body, createdAt: new Date() });
    setTitle('');
    setBody('');
  };

  const deleteNote = (id) => {
    Notes.remove(id);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>Notes</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px', boxSizing: 'border-box' }}
        />
        <textarea
          placeholder="Write your note..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px', boxSizing: 'border-box' }}
        />
        <button onClick={addNote} style={{ padding: '8px 16px' }}>Add Note</button>
      </div>

      {notes.map((note) => (
        <div key={note._id} style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '16px', marginBottom: '12px' }}>
          <h3 style={{ margin: '0 0 8px' }}>{note.title}</h3>
          <p style={{ margin: '0 0 12px' }}>{note.body}</p>
          <button onClick={() => deleteNote(note._id)} style={{ padding: '4px 12px', color: 'red', cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      ))}

      {notes.length === 0 && <p style={{ color: '#999' }}>No notes yet. Add one above.</p>}
    </div>
  );
};