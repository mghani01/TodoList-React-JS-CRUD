import React, { useState } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  // State untuk melacak card mana yang sedang di-hover
  const [hoveredCard, setHoveredCard] = useState(null);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return <Badge bg="danger" className="px-3 py-2 rounded-pill shadow-sm">High</Badge>;
      case 'Medium': return <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill shadow-sm">Medium</Badge>;
      case 'Low': return <Badge bg="success" className="px-3 py-2 rounded-pill shadow-sm">Low</Badge>;
      default: return <Badge bg="secondary" className="px-3 py-2 rounded-pill shadow-sm">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Done': return <Badge bg="success" className="px-3 py-2 rounded-pill shadow-sm">Done</Badge>;
      case 'In Progress': return <Badge bg="info" className="px-3 py-2 rounded-pill shadow-sm">In Progress</Badge>;
      default: return <Badge bg="secondary" className="px-3 py-2 rounded-pill shadow-sm">To Do</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Done': return '🎉';
      case 'In Progress': return '🚀';
      default: return '📌';
    }
  };

  const getBorderColor = (priority) => {
    switch (priority) {
      case 'High': return '#dc3545'; // Merah
      case 'Medium': return '#ffc107'; // Kuning
      case 'Low': return '#198754'; // Hijau
      default: return '#dee2e6';
    }
  };

  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <div className="text-center text-muted my-5 py-5 bg-white rounded-4 shadow-sm border border-dashed">
          <div className="fs-1 mb-2">🍃</div>
          <h5 className="fw-bold text-secondary">Belum ada task</h5>
          <p className="mb-0">Mulai hari ini dengan menambahkan tugas baru!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <Card
            key={task.id}
            onMouseEnter={() => setHoveredCard(task.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transition: 'all 0.3s ease',
              transform: hoveredCard === task.id ? 'translateY(-5px)' : 'translateY(0)',
              boxShadow: hoveredCard === task.id ? '0 15px 30px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.05)',
              opacity: task.status === 'Done' ? 0.75 : 1,
              borderLeft: `6px solid ${getBorderColor(task.priority)}`,
              cursor: 'pointer'
            }}
            className="mb-4 border-0 rounded-4 overflow-hidden"
          >
            <Card.Body className="p-4 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3">
              
              <div className="d-flex align-items-center gap-4 w-100">
                {/* Ikon besar di sebelah kiri */}
                <div 
                  className="bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm flex-shrink-0" 
                  style={{ width: '65px', height: '65px', fontSize: '28px' }}
                >
                  {getStatusIcon(task.status)}
                </div>

                {/* Informasi Task */}
                <div>
                  <h4 className={`mb-1 ${task.status === 'Done' ? 'text-decoration-line-through text-muted' : 'fw-bold text-dark'}`}>
                    {task.name}
                  </h4>
                  <div className="text-muted small mb-2 fw-medium">
                    📅 {task.createdAt || 'Dibuat baru saja'}
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {getPriorityBadge(task.priority)}
                    {getStatusBadge(task.status)}
                  </div>
                </div>
              </div>

              {/* Tombol Aksi - Muncul lebih jelas saat di-hover */}
              <div 
                className="d-flex flex-row flex-sm-column gap-2 align-self-end align-self-sm-center mt-3 mt-sm-0"
                style={{
                  transition: 'opacity 0.3s ease',
                  opacity: hoveredCard === task.id || window.innerWidth < 576 ? 1 : 0.4
                }}
              >
                <Button
                  variant="light"
                  className="rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center border"
                  style={{ width: '40px', height: '40px' }}
                  onClick={() => showEditForm(task)}
                  title="Edit Task"
                >
                  ✏️
                </Button>
                <Button
                  variant="light"
                  className="rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center border"
                  style={{ width: '40px', height: '40px' }}
                  onClick={() => deleteTask(task.id)}
                  title="Delete Task"
                >
                  🗑️
                </Button>
              </div>

            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default TaskList;