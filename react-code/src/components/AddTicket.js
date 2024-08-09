import { useState } from "react";
import { Card, Form, Input, Select, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addTicket, saveTicketData } from "../redux/ticketSlice";
import TicketTable from "./TicketTable";

const AddTicket = () => {
    const dispatch = useDispatch();
    const generateTicketNumber = () => {
        return `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };
    const [currentTicket, setCurrentTicket] = useState({
        id: '',
        deviceRefNumber: '',
        complaint: '',
        category: '1',
        status: '1',
        ticketNumber: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTicket((prevTicketState) => ({
            ...prevTicketState,
            [name]: value
        }));
    }

    const handleCategoryChange = (value) => {
        setCurrentTicket((prevTicketState) => ({
            ...prevTicketState,
            category: value
        }))
    }
    const handleSubmit = () => {
        const ticketNumber = generateTicketNumber(); // Generate ticket number
        const ticketWithNumber = { ...currentTicket, ticketNumber };
        dispatch(saveTicketData(ticketWithNumber));
        dispatch(addTicket(ticketWithNumber));
        setCurrentTicket(
            {
                id: '',
                deviceRefNumber: '',
                complaint: '',
                category: '1',
                status: '1',
                ticketNumber: ''
            }
        );
    }
    return (
        <>
            <Card title="Create Ticket" style={{ marginTop: 16, background: 'lightgrey' }}>
                <Form
                    layout="vertical"
                    style={{ display: 'flex', justifyContent: 'center' }}
                    onFinish={handleSubmit}
                >
                    <div style={{ maxWidth: '400px', width: '100%' }}>
                        <Form.Item
                            name="device_ref_number"
                            label="Device Ref Number"
                            rules={[
                                { required: true, message: 'Please input the device reference number!' },
                            ]}
                            style={{ textAlign: 'center' }}
                        >
                            <Input
                                name="deviceRefNumber"
                                value={currentTicket.deviceRefNumber}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name="complaint"
                            label="Complaint"
                            rules={[
                                { required: true, message: 'Please describe the complaint!' },
                            ]}
                            style={{ textAlign: 'center' }}
                        >
                            <Input.TextArea
                                name="complaint"
                                value={currentTicket.complaint}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[
                                { required: true, message: 'Please select a category!' },
                            ]}
                            style={{ textAlign: 'center' }}
                        >
                            <Select
                                name="category"
                                value={currentTicket.category}
                                onChange={handleCategoryChange}
                                style={{ width: '100%' }}
                                options={[
                                    { value: '1', label: 'Laptop' },
                                    { value: '2', label: 'CPU' },
                                    { value: '3', label: 'Monitor' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button danger htmlType="reset">
                                    Reset
                                </Button>
                            </div>
                        </Form.Item>
                    </div>
                </Form>
            </Card>
            <TicketTable />
        </>
    );
}

export default AddTicket;
