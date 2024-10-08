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
    <main className={styles.main}>
      <div className={styles.description}>
       <h1>teste
       </h1>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
