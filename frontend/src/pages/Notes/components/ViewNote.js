import React from 'react'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'

 //Modal Style
 const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%',
      borderRadius: '15px'
    },
  };

Modal.setAppElement("body");

const ViewNote = ({ notes, modalOpen, onEdit, onDelete, toggle, singleNoteId, clientId }) => {
    const [note, setNote] = useState({})

    useEffect(() => {
        const fetchNote = async () => {
            const res = await fetch(`http://localhost:5002/api/notes/633b6a81145c9d79405c54ea/${clientId}/${singleNoteId}`);
            const data = await res.json();

            setNote(data);
        };

        fetchNote();
    }, []);


    return (
        <div className = "single-note-details">
            <Modal
                isOpen = {modalOpen}
            >
            <div className="single-note-btns">
                <button onClick={() => toggle(false)}>Close</button>
                <button onEdit={onEdit}>Edit</button>
                <button onClick={() => onDelete(notes.id)} >Delete</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            </Modal>
        </div>
    )

}

export default ViewNote