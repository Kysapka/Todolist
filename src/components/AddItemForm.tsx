import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";


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
            {!error
                ? <TextField
                    value={title}
                    id="outlined-basic"
                    label="Add task..."
                    variant="outlined"
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    size="small"
                />
                : <TextField
                    value={title}
                    id="standard-error-helper-text"
                    label="Error..."
                    helperText={error}
                    variant="outlined"
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    error
                    size="small"
                />}
            <Button variant="contained" size="medium" color="primary" onClick={addTask}>+</Button>
        </div>
    )
}