import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [currentTitle, setCurrentTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (currentTitle.trim() !== "") {
            props.addItem(currentTitle.trim());
            setCurrentTitle('')
        } else {
            setError("Title is required");
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addTask();
            setCurrentTitle('')
        }
    }
    console.log('add item form props disabled is: ' + props.disabled)
    return (
        <div>
            <TextField
                value={currentTitle}
                error={!!error}
                helperText={error}
                label="Title"
                variant="outlined"
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}
                size="small"
                disabled={props.disabled}
            />
            <IconButton color="primary" onClick={addTask}>
                <AddBox/>
            </IconButton>
        </div>
    )
})