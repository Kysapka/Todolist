import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemForm = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemForm) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
            setTitle('')
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle('')
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <TextField
                    value={title}
                    error={!!error}
                    helperText={error}
                    label="Title"
                    variant="outlined"
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    size="small"
                />
            <IconButton color="primary" onClick={addTask}>
                <AddBox />
            </IconButton>
        </div>
    )
}