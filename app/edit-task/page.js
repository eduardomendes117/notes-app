"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; 
import { FaArrowLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

function AddTaskContent() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const searchParams = useSearchParams();
  const editIndex = searchParams.get("edit")
    ? parseInt(searchParams.get("edit"))
    : null; // Pegando o parâmetro 'edit'

  // Carregar tarefas do localStorage quando o componente for montado
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);

    if (editIndex !== null) {
      const taskToEdit = savedTasks[editIndex];
      setTaskTitle(taskToEdit.title);
      setTaskDescription(taskToEdit.description);
    }
  }, [editIndex]);

  const handleSaveTask = () => {
    if (taskTitle && taskDescription) {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        date: new Date().toLocaleDateString(),
      };

      let updatedTasks;

      if (editIndex !== null) {
        // Atualizar tarefa existente
        updatedTasks = [...tasks];
        updatedTasks[editIndex] = newTask;
      } else {
        // Adicionar nova tarefa
        updatedTasks = [...tasks, newTask];
      }

      // Atualiza o estado com as tarefas modificadas
      setTasks(updatedTasks);

      // Salva no localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // Redireciona para a lista de tarefas
      window.location.href = "/"; 
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const handleDeleteTask = () => {
    if (editIndex !== null) {
      const updatedTasks = tasks.filter((_, index) => index !== editIndex);
      setTasks(updatedTasks);

      // Atualiza no localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // Redireciona para a lista de tarefas após exclusão
      window.location.href = "/"; 
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-5 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <span
          onClick={() => (window.location.href = "/")}
          className="left-5 text-2xl lg:text-3xl hover:bg-white/10 rounded-full p-2"
        >
          <FaArrowLeft />
        </span>

        <div className="flex gap-3 items-center">
          <span
            onClick={handleDeleteTask}
            className="left-5 text-2xl lg:text-3xl hover:bg-white/10 rounded-full p-2"
          >
            <MdDeleteForever />
          </span>

          <span
            onClick={handleSaveTask}
            className="left-5 text-2xl lg:text-3xl hover:bg-white/10 rounded-full p-2"
          >
            <FaCheck />
          </span>
        </div>
      </div>

      <input
        type="text"
        placeholder="Título"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="block w-full text-xl p-3 mb-3 rounded-lg bg-white/10 text-white"
      />
      <textarea
        placeholder="Comece a escrever"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="block w-full p-3 mb-3 min-h-svh rounded-lg bg-white/10 text-white"
      />
    </div>
  );
}

export default function AddTask() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddTaskContent />
    </Suspense>
  );
}
