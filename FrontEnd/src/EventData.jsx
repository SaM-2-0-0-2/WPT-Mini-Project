import axios from "axios";
import { useEffect } from "react";
import { useState } from 'react';
import { Button, Container, Table, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "./AdminNavBar";
import './components/styles/eform.css';


export function EventsData() {

    const [events, setEvent] = useState([]);
    const [deleteDialVis, setDeleteDiagVis] = useState(false);
    const [eventId, setEventId] = useState();

    const closeDiaglog = () => {
        setDeleteDiagVis(false);
    }

    async function getEventssData() {
        try {
            const response = await axios.get("http://localhost:3000/geteventdetails");
            console.log(response);
            const result = await response.data.result;
            setEvent(result);
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleEventDelete = async (id) => {
        console.log("Trying to delete event with ID:", id);
        try {
            const response = await axios.delete(`http://127.0.0.1:3000/deleteevent/${id}`);
            if (response.status == 200) {
                toast.success("Event removed");
                setDeleteDiagVis(false);
                getEventssData();
            }
        } catch (error) {
            console.log("Error deleting event:", error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getEventssData();
    }, []

    );

    return (
        <div className="body">
            <AdminNavbar />
            <div className="ms-5 me-5">
                <h1 className="text-center mb-3 mt-3" style={{ color: "green" }}>List of events</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Link</th>
                            <th>EventName</th>
                            <th>Venue</th>
                            <th>EventDate</th>
                            <th>HostName</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map((event) => {
                                return (
                                    <tr key={event.eventid}>
                                        <td>{event.link}</td>
                                        <td>{event.eventname}</td>
                                        <td>{event.venue}</td>
                                        <td>{event.eventdatetime}</td>
                                        <td>{event.hostname}</td>
                                        <td><Button variant="outline-danger" size="sm" onClick={() => {
                                            setEventId(event.eventid);
                                            setDeleteDiagVis(true);
                                        }}>Delete</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <Modal show={deleteDialVis} onHide={closeDiaglog} centered>
                                <Modal.Header closeButton >
                                    <Modal.Title>Confirmation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete event with id: {eventId}?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" className="btn-sm" onClick={() => handleEventDelete(eventId)}>
                                        Yes
                                    </Button> &nbsp;&nbsp;
                                    <Button variant="danger" className="btn-sm" onClick={closeDiaglog}>
                                        No
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                
                            <ToastContainer position="top-center" autoClose={2000} theme="colored" />
                
            </div>
        </div>
    );


}