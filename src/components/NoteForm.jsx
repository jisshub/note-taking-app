import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';

const NoteForm = ({ addNote, editNote, currentNote, setCurrentNote }) => {
    const [note, setNote] = useState({ id: null, title: '', content: '' });

     useEffect(() => {
       if (currentNote) {
         setNote({
           id: currentNote.id,
           title: currentNote.title,
           content: currentNote.content
         });
       } else {
         setNote({ id: null, title: '', content: '' });
       }
     }, [currentNote]);

     const handleChange = (e) => {
       const { name, value } = e.target;
       setNote({ ...note, [name]: value });
     };

     const handleSubmit = (e) => {
       e.preventDefault();
       if (note.id) {
         editNote(note);
       } else {
         note.id = Date.now();
         addNote(note);
       }
       setCurrentNote(null);
       setNote({ id: null, title: '', content: '' });
     };
  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className='mb-2'>
      <Form.Label>Title</Form.Label>
      <Form.Control 
        type="text" 
        name="title" 
        value={note.title} 
        onChange={handleChange} 
        required 
      />
    </Form.Group>
    <Form.Group className='mb-2'>
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
    <Button 
      variant="primary" 
      type="submit"
      >
      {note.id ? 'Update Note' : 'Add Note'}
    </Button>
  </Form>
  )
}

export default NoteForm
