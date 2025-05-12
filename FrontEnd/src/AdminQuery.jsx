import axios from "axios";
import { useEffect } from "react";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from "react-bootstrap";
import AdminNavbar from "./AdminNavBar";


function AdminQuery() {

    const [queries, setEvent] = useState([]);

    async function getEventssData() {
        try {
            const response = await axios.get("http://localhost:3000/query");
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
                <h1 className="text-center mb-3 mt-3" style={{ color: "green" }}>Customer Queries</h1>
                <Table striped bordered hover responsive>
                    <thead className="text-center">
                        <tr>
                            <th>Host Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Query</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            queries.map((query) => {
                                return (
                                    <tr key={query.email}>
                                        <td className="text-center">{query.fname}</td>
                                        <td className="text-center">{query.email}</td>
                                        <td className="text-center">{query.subject}</td>
                                        <td className="text-justify">{query.query}</td>
                                        <td className="text-center"><Button variant="outline-success" size="sm" className="me-2"><a className="text-decoration-none" style={{ color: "black" }} href={`mailto:${query.email}`}>Resolve</a></Button></td>
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

export default AdminQuery;