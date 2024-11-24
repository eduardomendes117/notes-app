"use client";

import Link from "next/link";
import { IoIosAdd } from "react-icons/io";
import Task from '../components/Task';

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center min-h-screen p-5 max-w-screen-xl mx-auto">
        <div className="self-start">
          <h1 className="text-3xl lg:text-4xl pb-7">Minhas Notas</h1>
          <button
            className="flex justify-center bg-white/10 hover:bg-white/5 rounded-lg px-3 py-1 text-base"
            type="button"
          >
            Tudo
          </button>
        </div>

        <Task/>

        <Link id="btn-add-task" href="/add-task" className="fixed bottom-5 lg:bottom-10 text-5xl shadow-xl bg-yellow-500 hover:bg-yellow-600 rounded-full">
          <IoIosAdd />
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
