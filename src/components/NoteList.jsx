import React, { useState, useEffect } from "react";
import { ListGroup, Button, Badge, Form } from "react-bootstrap";

const NoteList = ({ notes, setCurrentNote, deleteNote }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        const filtered = notes.filter(note =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNotes(filtered);
      } else {
        setFilteredNotes(notes);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, notes]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="searchNotes">
        <Form.Control
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <i className="bi bi-search"></i>
      </Form.Group>
      <ListGroup>
        {filteredNotes.map((note) => (
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
    </>
  );
};

export default NoteList;
