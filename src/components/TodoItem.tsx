import { Edit, Delete } from "@mui/icons-material";
import { Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

type PropsType = {
    todo: TodoItemType;
    deleteHandler: (id: TodoItemType["id"]) => void;
    complteHandler: (id: TodoItemType["id"]) => void;
    editHandler: (id: TodoItemType["id"], title: TodoItemType["title"]) => void;
};

const TodoItem = ({ todo, complteHandler, deleteHandler, editHandler }: PropsType) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<TodoItemType["title"]>(todo.title);

    return <Paper sx={{
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    }}>
        <Stack direction={"row"} alignItems={"center"}>
            {
                isEditing ? <TextField 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === "Enter" && title !== "") {
                      editHandler(todo.id, title);
                        setIsEditing(false);
                    }
                  }}
                /> : <Typography marginRight={"auto"}>{todo.title}</Typography>
            }
            <Checkbox onChange={() => complteHandler(todo.id)} checked={todo.isCompleted} />
            <Button color="secondary" onClick={() => setIsEditing((prev) => !prev)}>{isEditing ? "Done" : <Edit />}</Button>
            <Button onClick={() => deleteHandler(todo.id)}><Delete /></Button>
        </Stack>
    </Paper>;
}

export default TodoItem;