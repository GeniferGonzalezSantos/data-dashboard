"use client"
import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import Card from './components/card/card';
import Dialog from './components/modal/modal'

export default function BoardKanban() {

  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const [ card, setCard ] = useState([
    { id: 'todo', title: 'A Fazer', tasks: [] },   
    { id: 'inprogress', title: 'Em Andamento', tasks: [] },
    { id: 'impediment', title: 'Impedimento', tasks: [] },
    { id: 'done', title: 'Concluído', tasks: [] },         
    { id: 'protocoled', title: 'Protocolado', tasks: [] }, 
  ]);


  const handleAddTask = () => {
    if (editTask) {
      const updatedCards = card.map((c) => {
        if (c.id === editTask.cardId) {
          return {
            ...c,
            tasks: c.tasks.map((task) =>
              task === editTask.task
                ? { ...task, title: newTaskTitle, description: newTask }
                : task
            ),
          };
        }
        return c;
      });
      
      setCard(updatedCards);
      setEditTask(null);
    } else {
      const updatedCards = card.map((c) => {
        if (c.id === 'todo') {
          return {
            ...c,
            tasks: [...c.tasks, { title: newTaskTitle, description: newTask }],
          };
        }
        return c;
      });
      setCard(updatedCards);
    }
  
    setNewTask('');
    setNewTaskTitle('');
    handleClose(); 
  };
  
  
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDropTask = (e, cardId) => {
    e.preventDefault();

    const updatedCards = card.map((c) => {
      if (c.id === cardId) {
        return { ...c, tasks: [...c.tasks, draggedTask] };
      }
      if (c.tasks.includes(draggedTask)) {
        return { ...c, tasks: c.tasks.filter((task) => task !== draggedTask) };
      }
      return c;
    });

    setCard(updatedCards);
    setDraggedTask(null);
  };

  const handleEditTask = (task, cardId) => {
    setEditTask({ task, cardId });
    setNewTaskTitle(task.title);
    setNewTask(task.description);
    handleShow();
  };

  const handleRemoveTask = (task, cardId) => {
    const updatedCards = card.map((c) => {
      debugger
      if (c.id === cardId) {
        return {
          ...c,
          tasks: c.tasks.filter((t) => t !== task),
        };
      }
      return c;
    });

    setCard(updatedCards);
    handleClose(); 
  };

  return (
    <div className={'container text-center' + styles.container}>
      <div className={styles.kanbanHeading}>
            <strong className={styles.kanbanHeadingText}>Kanban card</strong>
        </div>
        <div className="col mb-3">
              <button type="button" className="btn btn-primary" onClick={handleShow}>
                  Criar Tarefa
              </button>
          </div>
          {show && (
        <Dialog 
          show={show} 
          onHide={handleClose} 
          onAddTask={handleAddTask} 
          newTask={newTask} 
          setNewTask={setNewTask}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle} 
          handleRemoveTask={handleRemoveTask}
        />
      )}
        <div className="row">
        {card.map((card) => (
          <Card 
            key={card.id} 
            id={card.id} 
            title={card.title} 
            tasks={card.tasks} 
            onDropTask={handleDropTask} 
            onDragStart={handleDragStart}
            onEditTask={handleEditTask} 
          />
        ))}
      </div>
    </div>
  );
}
