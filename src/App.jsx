import React, { useState } from 'react';
import { Container, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      // Menambahkan waktu pembuatan (Timestamp)
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  // Fitur Filter/Pencarian Task
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <div className="p-4 bg-light rounded-4 shadow-sm border">
        <Row className="align-items-center mb-4">
          <Col>
            <h2 className="fw-bold mb-0 text-primary">✨ My Task List</h2>
            <p className="text-muted mb-0">Kelola aktivitas harianmu dengan mudah!</p>
          </Col>
          <Col xs="auto">
            <Button variant="primary" className="rounded-pill px-4 shadow-sm" onClick={handleShowForm}>
              + Tambah Task
            </Button>
          </Col>
        </Row>

        <InputGroup className="mb-4 shadow-sm">
          <InputGroup.Text className="bg-white">🔍</InputGroup.Text>
          <Form.Control
            placeholder="Cari nama task..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-start-0 ps-0"
          />
        </InputGroup>

        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          showEditForm={showEditForm}
        />

        <TaskForm
          show={showForm}
          handleClose={handleCloseForm}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
        />
      </div>
    </Container>
  );
}

export default App;