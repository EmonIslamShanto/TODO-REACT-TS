import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material"
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getLocalStorage, saveLocalStorage } from "./utils/features";



const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getLocalStorage());

  const [title, setTitle] = useState<TodoItemType["title"]>("");


  const complteHandler = (id: TodoItemType["id"]): void => {
    const newTodos = todos.map((i) => {
      if(i.id === id) {
        i.isCompleted = !i.isCompleted;
      }
      return i;
    })
    setTodos(newTodos);
  };
  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos = todos.filter((i) => i.id !== id);
    setTodos(newTodos);
  };

  const editHandler = (id: TodoItemType["id"], title: TodoItemType["title"]): void => {
    const newTodos = todos.map((i) => {
      if(i.id === id) {
        i.title = title;
      }
      return i;
    })
    setTodos(newTodos);
  };

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: Date.now().toString(),
    }
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  }

  useEffect(() => {
    saveLocalStorage(todos);
  }, [todos]);


  return (
    <Container maxWidth="sm" sx={{ height: "100vh"}}>
      <AppBar position="static" sx={{
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    }}>
        <Toolbar>
          <Typography>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack direction={"column"} spacing={"1rem"} height={"80%"} p={"1rem"}>
        {todos.map((i) => (
          <TodoItem deleteHandler={deleteHandler} complteHandler={complteHandler} 
          key={i.id} 
          todo={i} 
          editHandler={editHandler}
          />
        ))}
      </Stack>
      <TextField value={title} onChange={(e)=> setTitle(e.target.value)} fullWidth label={"Add Task"} 
      onKeyDown={(e) => {
        if(e.key === "Enter" && title !== "") {
          submitHandler();
        }
      }}/>
      <Button sx={{
        margin: "1rem 0",
      }}
      onClick={submitHandler} 
      fullWidth 
      variant="contained"
      disabled={title == ""}
      >Add</Button>
    </Container>
  );
};

export default App