import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Datetime from 'react-datetime';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('body');

const AddEvent = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [type, setType] = useState('')
    const [clients, setClients] = useState([])
    const [clientId, setClientId] = useState()
    
    useEffect(() => {
        const getClients = async () => {
            const res = await fetch(`http://localhost:5000/api/clients/${props.userId}`)
            const data = await res.json()

            console.log(data)

            setClients(data)
        }

        getClients()
    }, [ props.userId, props.modalOpen ])

    // const fetchClients = async () => {
    //     const res = await fetch(`http://localhost:5000/api/clients/${props.userId}`)
    //     const data = await res.json()

    //     return data
    // }

    const submitForm = (event) => {
        event.preventDefault()

        console.log(title, description, start, end, type, clientId)
    }

    return (
        <div>
            <Modal
                isOpen={props.modalOpen}
                onRequestClose={() => props.onToggle(false)}
                style={customStyles}
                contentLabel="Add Event"
            >
                <button onClick={() => props.onToggle(false)}>Close</button>
                <h2>Add Event</h2>
                <form className="addEventForm" onSubmit={submitForm}>
                    <div className="input-wrapper">
                        <label htmlFor="title">Event name</label>
                        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="startdate">Start</label>
                        <Datetime initialValue={props.onDateClick} onChange={date => setStart(date)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="enddate">End</label>
                        <Datetime value={end} onChange={date => setEnd(date)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="eventtype">Event Type</label>
                        <select id="eventtype" defaultValue={type || ''} onChange={e => setType(e.target.value) || ''}>
                            <option value=""></option>
                            <option value="meeting">Meeting</option>
                            <option value="birthday">Birthday</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="clientlist">Client</label>
                        <select id="clientlist" value={clientId || ''} onChange={e => setClientId(e.target.value) || ''}>
                            <option value=""></option>
                            {clients.map((client, i) => (
                                <option key={i} value={client._id}>{client.firstname} {client.lastname}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <input type="submit" value="Add New Event" />
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddEvent