import React from "react";
import { Modal, Button, Form } from 'react-bootstrap';

const Dialog = ({ show, onHide, onAddTask, newTask, setNewTask, setNewTaskTitle, newTaskTitle, handleRemoveTask }) => {
    return (
      <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <Form.Control 
        size="lg" 
        type="text" 
        className="mb-3" 
        placeholder="Nome da tarefa" 
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}/>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descrição da tarefa</Form.Label>
        <Form.Control 
          as="textarea" 
          type="button" 
          rows={3} 
          value={newTask}        
          onChange={(e) => setNewTask(e.target.value)}
          />
      </Form.Group>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onAddTask}>
          Criar
        </Button>
        <Button variant="danger" onClick={handleRemoveTask}>
            Remover Tarefa
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default Dialog;