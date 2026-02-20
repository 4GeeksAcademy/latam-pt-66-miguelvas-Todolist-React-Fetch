import React, { useState } from "react";

const Home = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);

	const taskHandler = (e) => {
		setTask(e.target.value)
	}


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
						onKeyDown={(e) => {
                            if (e.key === "Enter" && task !== " ") { 
                                setList([...list, task]); 
                                setTask(""); 
                            }
                        }}
                        value={task} 
					/>
				</div>
				<p className="text-white">{task}</p>
			</div>

			<div className="container p-3 rounded" style={{ maxWidth: "50rem" }}>
				<ul className="list-group border border-secondary shadow">
					{list.length === 0 ? (
						<li className="list-group-item bg-dark text-white border-secondary fst-italic text-white">
							No hay tareas pendientes, añadir tareas.
						</li>
					) : (
						list.map((item, index) => (
							<li key={index} className="list-group-item d-flex justify-content-between bg-dark text-white task-item border-secondary">
								{item}
								<button 
									className="btn btn-outline-danger btn-sm delete-btn" 
									onClick={() => setList(list.filter((_, i) => i !== index))}
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