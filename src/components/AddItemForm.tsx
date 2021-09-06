import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemForm = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemForm) => {
    let [currentTitle, setCurrentTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
            setCurrentTitle('')
        }
    }
    const addTask = () => {
        if (currentTitle.trim() !== "") {
            props.addItem(currentTitle.trim());
            setCurrentTitle('')
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <TextField
                value={currentTitle}
                error={!!error}
                helperText={error}
                label="Title"
                variant="outlined"
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                size="small"
            />
            <IconButton color="primary" onClick={addTask}>
                <AddBox/>
            </IconButton>
        </div>
    )
})