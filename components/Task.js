import { useState, useEffect } from "react";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas do localStorage quando o componente for montado
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  return (
    <div className="self-start py-5 ">
      {/* Renderiza as tarefas adicionadas */}
      <ul className="flex flex-wrap gap-5">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="rounded-xl flex flex-col gap-2 bg-white/10 w-full lg:w-64 p-4 mb-3"
          >
            <h2 className="text-2xl flex justify-between">{task.title} <Link href={`/edit-task?edit=${index}`}><FiEdit/></Link></h2>
            <p className="text-base text-white/50">{task.description}</p>
            <span className="text-base text-white/40">{task.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
