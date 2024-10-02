export const saveLocalStorage = (todos: TodoItemType[]): void => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

export const getLocalStorage = (): TodoItemType[] => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
}