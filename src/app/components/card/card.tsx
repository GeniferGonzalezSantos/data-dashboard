import React from "react";
import './layout/card.css'

const Card = ({ id, title, tasks, onDropTask, onDragStart, onEditTask }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="kanban-block col mt-3" 
      id={id}
      onDragOver={handleDragOver} 
      onDrop={(e) => onDropTask(e, id)}
    >
      <strong>{title}</strong>
      <ul
        className="col" 
      >
        {tasks.map((task, index) => (
          <li 
            key={index} 
            draggable 
            onDragStart={(e) => onDragStart(e, task)}
            onDoubleClick={() => onEditTask(task, id)}
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;