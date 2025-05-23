// import React, { useState,useEffect } from 'react';
// import { Button, Card, Table, Form, Badge, Dropdown } from 'react-bootstrap';
// import { AlertCircle, RefreshCcw, Filter, ChevronDown } from 'lucide-react';
// import axios from 'axios';


// export default function ComplaintLog() {
//   const [complaints, setComplaints] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');


//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await axios.get('http://localhost:8001/complaintslogs/all');
//         console.log(response.data);
//         setComplaints(response.data);
//       } catch (error) {
//         console.error('Error fetching complaints:', error);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   const handleStatusUpdate = async (complaintId, newStatus) => {
//     try {
//       const updateData = { status: newStatus };
//       if (newStatus === 'Resolved') {
//         updateData.isArchived = true;
//       }
  
//       await axios.put(`http://localhost:8001/complaintslogs/${complaintId}`, { status: newStatus });
//       setComplaints(complaints.map(complaint =>
//         complaint._id === complaintId ? { ...complaint, status: newStatus,isArchived: newStatus === 'Resolved'  } : complaint
//       ));
//     } catch (error) {
//       console.error('Error updating complaint status:', error);
//     }
//   };






//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'Under Review':
//         return <Badge bg="danger">Under Review</Badge>;
//       case 'Assigned':
//         return <Badge bg="warning" text="dark">Assigned</Badge>;
//       case 'Resolved':
//         return <Badge bg="success">Resolved</Badge>;
//       default:
//         return <Badge>{status}</Badge>;
//     }
//   };

//   const filteredComplaints = complaints.filter(complaint =>
//     (statusFilter === 'All' || complaint.status === statusFilter) &&
//     (complaint._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//      complaint.type?.toLowerCase().includes(searchTerm.toLowerCase()))
//   );
  

//   return (
//     <Card className="w-100 mx-auto my-3">
//       <Card.Header className="d-flex justify-content-between align-items-center">
//         <h5>Complaint Status Update</h5>
//         <Button variant="outline-secondary" size="sm">
//           <RefreshCcw className="h-4 w-4" />
//         </Button>
//       </Card.Header>
//       <Card.Body>
//         <div className="d-flex justify-content-between mb-4">
//           <div className="d-flex align-items-center">
//             <Form.Label htmlFor="status-filter" className="me-2">Filter by Status:</Form.Label>
//             <Form.Select
//               id="status-filter"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="w-auto"
//             >
//               <option value="All">All Statuses</option>
//               <option value="Open">Open</option>
//               <option value="Assigned">Assigned</option>
//               <option value="Resolved">Resolved</option>
//               <option value="Under Review">Under Review</option>
//             </Form.Select>
//           </div>
//           <div className="d-flex align-items-center">
//             <Form.Control
//               type="text"
//               placeholder="Search by ID or type..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="me-2"
//             />
//             <Button variant="outline-secondary" size="sm">
//               <Filter className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Complaint ID</th>
//               <th>Category</th>
//               <th>Current Status</th>
//               <th>Department</th>
//               <th>Auto Desc</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredComplaints.map((complaint) => (
//               <tr key={complaint._id}>
//                 <td>{complaint._id}</td>
//                 <td>{complaint.category}</td>
//                 <td>{getStatusBadge(complaint.status)}</td>
//                 <td>
//                   {complaint.department}
//                 </td>
//                 <td>
//                   {complaint.complaint_description}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card.Body>
//     </Card>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Form, Badge } from 'react-bootstrap';
import { RefreshCcw, Filter } from 'lucide-react';
import axios from 'axios';
import './ComplaintLog.css'; // Import the CSS file for custom styles

export default function ComplaintLog() {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8001/complaintslogs/all');
        console.log(response.data);

        // Add random urgency to each complaint
        const complaintsWithUrgency = response.data.map(complaint => ({
          ...complaint,
          urgency: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)]
        }));

        setComplaints(complaintsWithUrgency);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusUpdate = async (complaintId, newStatus) => {
    try {
      const updateData = { status: newStatus };
      if (newStatus === 'Resolved') {
        updateData.isArchived = true;
      }

      await axios.put(`http://localhost:8001/complaintslogs/${complaintId}`, { status: newStatus });
      setComplaints(complaints.map(complaint =>
        complaint._id === complaintId ? { ...complaint, status: newStatus, isArchived: newStatus === 'Resolved' } : complaint
      ));
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Under Review':
        return <Badge bg="danger">Under Review</Badge>;
      case 'Assigned':
        return <Badge bg="warning" text="dark">Assigned</Badge>;
      case 'Resolved':
        return <Badge bg="success">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'high':
        return <Badge bg="danger">High</Badge>;
      case 'medium':
        return <Badge bg="warning" text="dark">Medium</Badge>;
      case 'low':
        return <Badge bg="success">Low</Badge>;
      default:
        return <Badge>{urgency}</Badge>;
    }
  };

  const filteredComplaints = complaints.filter(complaint =>
    (statusFilter === 'All' || complaint.status === statusFilter) &&
    (complaint._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="w-100 mx-auto my-3" style={{maxWidth:"60vw"}}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5>Complaint Status Update</h5>
        <Button variant="outline-secondary" size="sm">
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex align-items-center">
            <Form.Label htmlFor="status-filter" className="me-2">Filter by Status:</Form.Label>
            <Form.Select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Assigned">Assigned</option>
              <option value="Resolved">Resolved</option>
              <option value="Under Review">Under Review</option>
            </Form.Select>
          </div>
          <div className="d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Search by ID or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
            />
            <Button variant="outline-secondary" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Category</th>
              
              <th>Department</th>
              <th>Auto Desc</th>
              <th>Urgency</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr
                key={complaint._id}
              >
                <td>{complaint._id}</td>
                <td>{complaint.category}</td>
                
                <td>{complaint.department}</td>
                <td>{complaint.complaint_description}</td>
                <td>{getUrgencyBadge(complaint.urgency)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
