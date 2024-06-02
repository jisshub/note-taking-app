import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const NoteForm = ({ addNote, editNote, currentNote, setCurrentNote, notes }) => {
  const [note, setNote] = useState({ id: null, title: '', content: '', tag: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (currentNote) {
      setNote({
        id: currentNote.id,
        title: currentNote.title,
        content: currentNote.content,
        tag: currentNote.tag
      });
    } else {
      setNote({ id: null, title: '', content: '', tag: '' });
    }
  }, [currentNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content) {
      setAlertMessage('Title and Content are required.');
      setShowAlert(true);
      return;
    }

    if (notes.some(existingNote => existingNote.title === note.title && existingNote.id !== note.id)) {
      setAlertMessage('A note with this title already exists.');
      setShowAlert(true);
      return;
    }

    if (note.id) {
      editNote(note);
    } else {
      note.id = Date.now();
      addNote(note);
    }
    setCurrentNote(null);
    setNote({ id: null, title: '', content: '', tag: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="content"
          value={note.content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tag</Form.Label>
        <Form.Control
          as="select"
          name="tag"
          value={note.tag}
          onChange={handleChange}
          required
        >
          <option value="">Select Tag</option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
          <option value="CSS">CSS</option>
          <option value="General">General</option>
        </Form.Control>
      </Form.Group>
      <Button className="mb-3" variant="primary" type="submit">
        {note.id ? 'Update Note' : 'Add Note'}
      </Button>
    </Form>
  );
};

export default NoteForm;
