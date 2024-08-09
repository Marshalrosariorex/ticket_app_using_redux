import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Select } from "antd";
import { fetchTickets, updateTicketStatus, updateTicketStatusOnData } from '../redux/ticketSlice';

const TicketTable = () => {
    const { tickets, status, error } = useSelector((state) => state.ticketform); // Ensure correct state slice
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [ticket_status, setTicketStatus] = useState('');

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);
    console.log("Tickets state:", tickets);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ticket Number',
            dataIndex: 'ticket_number',
            key: 'ticketNumber',
        },
        {
            title: 'Device Ref Number',
            dataIndex: 'device_ref_number',
            key: 'deviceRefNumber',
        },
        {
            title: 'Complaint',
            dataIndex: 'complaint',
            key: 'complaint',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => {
                switch (text) {
                    case '1':
                        return 'Laptop';
                    case '2':
                        return 'CPU';
                    case '3':
                        return 'Monitor';
                    default:
                        return text;
                }
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case '1':
                        return 'Open';
                    case '2':
                        return 'Processing';
                    case '3':
                        return 'Hold';
                    case '4':
                        return 'Completed';
                    default:
                        return text;
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                record.status !== '4' && (
                    <Button
                        type="primary"
                        onClick={() => {
                            setCurrentTicket(record);
                            setTicketStatus(record.status);
                            setIsModalVisible(true);
                        }}
                    >
                        Update Status
                    </Button>
                )
            ),
        },
    ];

    const handleOk = () => {
        if (currentTicket) {
            // dispatch(updateTicketStatusOnData({ ticketNumber: currentTicket.ticket_number, status: ticket_status }));
            // dispatch(updateTicketStatus({ ticketNumber: currentTicket.ticket_number, status: ticket_status }));
            dispatch(updateTicketStatusOnData({ ticketNumber: currentTicket.ticket_number, status: ticket_status }));
            dispatch(updateTicketStatus({ ticketNumber: currentTicket.ticket_number, status: ticket_status }));
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {status === 'loading' && <p>Loading tickets...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <Table dataSource={tickets} columns={columns} rowKey="ticket_number" />
            )}
            <Modal
                title="Update Ticket Status"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Device Ref Number: {currentTicket?.deviceRefNumber}</p>
                <p>Complaint: {currentTicket?.complaint}</p>
                <p>Category: {currentTicket?.category}</p>
                <Select
                    value={ticket_status}
                    onChange={setTicketStatus}
                    style={{ width: '100%' }}
                    options={[
                        { value: '1', label: 'Open' },
                        { value: '2', label: 'Processing' },
                        { value: '3', label: 'Hold' },
                        { value: '4', label: 'Completed' },
                    ]}
                />
            </Modal>
        </>
    );
};

export default TicketTable;
