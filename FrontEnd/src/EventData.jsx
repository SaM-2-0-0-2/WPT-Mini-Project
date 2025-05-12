import axios from "axios";
import { useEffect } from "react";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from "react-bootstrap";
import AdminNavbar from "./AdminNavBar";
import './components/styles/eform.css';


export function EventsData() {

    const [events, setEvent] = useState([]);

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

    useEffect(() => {
        getEventssData();
    }, []

    );

    return (
        <div className="body">
            <AdminNavbar />
            <div className="ms-5 me-5">
                <h1 className="text-center mb-3 mt-3" style={{color:"green"}}>List of events</h1>
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
                                        <td><Button variant="outline-primary" size="sm" className="me-2">Edit</Button><Button variant="outline-danger" size="sm">Delete</Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );


}