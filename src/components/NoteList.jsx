import React from "react";
import { ListGroup, Button, Badge } from "react-bootstrap";

const NoteList = ({ notes, setCurrentNote, deleteNote }) => {
  return (
    <ListGroup>
      {notes.map((note) => (
        <ListGroup.Item key={note.id}>
          <div>
            {note.title} <Badge variant="secondary">{note.tag}</Badge>
          </div>
          <div>
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
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default NoteList;
