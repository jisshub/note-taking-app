import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const NoteList = ({ notes, setCurrentNote, deleteNote }) => {
  return (
    <ListGroup>
      {notes.map((note) => (
        <ListGroup.Item key={note.id}>
          {note.title}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setCurrentNote(note)}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteNote(note.id)}
          >
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default NoteList;
