import { useState, useEffect } from "react"

// PROFE LO ENTREGO ASI PORQUE NO SE SI HAY QUE COMBINAR ESTE CODIGO CON EL DE HOME.JSX O SI VA POR SEPARADO. DE IGUAL MANERA ME TENGO QUE IR A TRABAJAR POR SI LO REVISA ANTES DE LA CLASE DE HOY  27/2.


const Fetch = () => {
    const [user, setUser] = useState("");

    const USER = 'Nanita0711';
    const URL_BASE = 'https://playground.4geeks.com/todo';
    const USER_URL =  `${URL_BASE}/users/${USER}`;
    const TODO_URL = `${URL_BASE}/todos/${USER}`;

    // Aqui hago el GET para traer la lista de tareas del usuario
    const getTodos = async () => {
        try {
            const response = await fetch(USER_URL);
            if (response.ok) {
                const body = await response.json();
                setUser(body);
                console.log("1. Get realizado. Datos actuales:", body);
            } else if (response.status === 404) {
                console.log("Usuario no encontrado")
            }
        } catch (error) {
            console.error("Error haciendo GET todos:", error);
        }
    };

    // Aqui hago el POST para crear una nueva tarea para el usuario
    
    const createTodo = async (tarea) => {
        const response = await fetch(`${TODO_URL}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                label: tarea,
                is_done: false,
                // No genero la ID porque el backend lo hace automáticamente, y me la devuelve en la respuesta del POST para que yo pueda usarla luego en el DELETE
            }),
        });

        if (response.ok) {
            const body = await response.json();
            console.log("2. Post realizado. Tarea creada:", body);
            return body; // Devuelvo el objeto de la tarea creada, que incluye su ID
        } else {
            console.error("No se pudo crear la tarea");
            return null;
        }
    }


    // Aqui hago el DELETE para borrar una tarea del usuario
    const deleteTodo = async (todoId) => {
        if (!todoId) {
            return console.error("No se proporcionó un ID de tarea para borrar.");
        }

        try {
            const response = await fetch(`${URL_BASE}/todos/${todoId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log(`3. Tarea con ID ${todoId} borrada correctamente.`);
                // Refrescamos la lista para que desaparezca de la pantalla
                await getTodos();
            } else {
                console.error("No se pudo borrar");
            }
        } catch (error) {
            console.error("Error en DELETE todo:", error);
        }
    };

    useEffect(() => {
        const iniciarFlujo = async () => {
            console.log("--- Iniciando secuencia ---");
            
            await getTodos(); // 1. Primero trae lo que hay (sin la tarea nueva)
            
            const tareaCreada = await createTodo("ir a comer"); // 2. Espera a que se cree la tarea
            
            await getTodos(); // 3. Ahora sí, trae la lista actualizada

            await deleteTodo(tareaCreada.id); // 4. Borra la tarea por el ID que le pase
            
            console.log("--- Secuencia terminada ---");
        };

        iniciarFlujo();
    }, []);

    return(
        <>
        </>
    );
}

export default Fetch;