import React, {useState, useEffect} from 'react'
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.scss';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
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
        <NoteList 
          notes={notes} 
          setCurrentNote={setCurrentNote} 
          deleteNote={deleteNote} 
        />
      </Col>
      <Col md={8}>
        <NoteForm 
          addNote={addNote} 
          editNote={editNote} 
          currentNote={currentNote} 
          setCurrentNote={setCurrentNote} 
        />
      </Col>
    </Row>
  </Container>
  );
}

export default App;
