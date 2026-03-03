import React, { useState, useEffect } from "react";

const Home = () => {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);
    const [username, setUsername] = useState("Miki0711"); // Nombre de usuario actual

    const URL_BASE = 'https://playground.4geeks.com/todo';
    const USER_URL = `${URL_BASE}/users/${username}`;
    const TODO_URL = `${URL_BASE}/todos/${username}`;


    // FUNCIONES API

    const getTodos = async () => {
        try {
            const response = await fetch(USER_URL);
            if (response.ok) {
                const body = await response.json();
                setList(body.todos || []); 
                console.log(`Tareas cargadas para ${username}:`, body.todos);
            } else {
                console.error("Error al cargar tareas");
                setList([]);
            }
        } catch (error) {
            console.error("Error en GET:", error);
        }
    };

    const addTask = async (e) => {
        if (e.key === "Enter" && task !== "") {
            try {
                const response = await fetch(TODO_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        label: task,
                        is_done: false,
                    }),
                });

                if (response.ok) {
                    setTask("");
                    await getTodos();
                } else {
                    console.error("No se pudo crear la tarea");
                }
            } catch (error) {
                console.error("Error en POST:", error);
            }
        }
    };

    const deleteTask = async (idToDelete) => {
        try {
            const response = await fetch(`${URL_BASE}/todos/${idToDelete}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setList(list.filter((t) => t.id !== idToDelete));
            } else {
                console.error("No se pudo borrar");
            }
        } catch (error) {
            console.error("Error en DELETE:", error);
        }
    };

    // Recargar tareas
    useEffect(() => {
        getTodos();
    }, []);


    // HANDLERS 
    const taskHandler = (e) => setTask(e.target.value);
    const userHandler = (e) => setUsername(e.target.value);


    return (
        <div className="bg-dark vh-100 text-center d-flex flex-column justify-content-center align-items-center gap-3">
			<h1 className="text-white mb-2 display-6" style={{ fontSize: "5rem" }}>TodoList</h1>
            <div className="container p-3 rounded" style={{ maxWidth: "25rem" }}>
                <div className="input-group shadow">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nombre de usuario" 
                        value={username} 
                        onChange={userHandler}
                    />
                    <button className="btn btn-outline-primary" onClick={getTodos}>
                        Cambiar Usuario
                    </button>
                </div>
            </div>

            <div className="container d-flex flex-column">
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
            </div>

            <div className="container p-3 rounded" style={{ maxWidth: "50rem" }}>
                <p className="text-white-50">Tareas del Usuario: {username}</p> 
                <ul className="list-group border border-secondary shadow">
                    {list.length === 0 ? (
                        <li className="list-group-item bg-dark text-white border-secondary fst-italic">
                            No hay tareas pendientes.
                        </li>
                    ) : (
                        list.map((item) => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between bg-dark text-white border-secondary">
                                {item.label}
                                <button 
                                    className="btn btn-outline-danger btn-sm" 
                                    onClick={() => deleteTask(item.id)}
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