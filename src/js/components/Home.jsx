import React, { useState } from "react";

const Home = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);

	const USER = 'Nanita0711';
    const URL_BASE = 'https://playground.4geeks.com/todo';
    const USER_URL =  `${URL_BASE}/users/${USER}`;
    const TODO_URL = `${URL_BASE}/todos/${USER}`;

    const taskHandler = (e) => {
        setTask(e.target.value);
    };

    const addTask = (e) => {
        // Verificamos si la tecla presionada es Enter
        if (e.key === "Enter" && task !== "") {
                setList([...list, task]); // Agregamos la nueva tarea a la lista
                setTask(""); // Limpiamos el input después de agregar
        	}
    };

    const deleteTask = (index) => {  // Borramos la tarea por su índice en la lista
        setList(list.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-dark vh-100 text-center d-flex flex-column justify-content-center align-items-center gap-5">
            <div className="container d-flex flex-column">
                <h1 className="text-white mb-5 display-6" style={{ fontSize: "5rem" }}>TodoList</h1>
                <div className="border border-light rounded p-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Add a new task" 
                        onChange={taskHandler}
                        onKeyDown={addTask}
                        value={task} 
                    />
                </div>
                <p className="text-white mt-2">{task}</p>
            </div>

            <div className="container p-3 rounded" style={{ maxWidth: "50rem" }}>
                <ul className="list-group border border-secondary shadow">
                    {list.length === 0 ? (
                        <li className="list-group-item bg-dark text-white border-secondary fst-italic">
                            No hay tareas pendientes, añadir tareas.
                        </li>
                    ) : (
                        list.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between bg-dark text-white border-secondary">
                                {item}
                                <button 
                                    className="btn btn-outline-danger btn-sm" 
                                    onClick={() => deleteTask(index)} // <-- Función de borrado limpia
                                >
                                    X
                                </button>
                            </li>
                        ))
                    )}

                    <li className="list-group-item bg-dark text-secondary border-secondary p-1">
                        {list.length} item/s left
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;