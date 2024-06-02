
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './App.scss';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    // Load notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const addNote = (note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const editNote = (updatedNote) => {
    const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <NoteList notes={notes} setCurrentNote={setCurrentNote} deleteNote={deleteNote} />
        </Col>
        <Col md={8}>
          <NoteForm addNote={addNote} editNote={editNote} currentNote={currentNote} setCurrentNote={setCurrentNote} notes={notes} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;