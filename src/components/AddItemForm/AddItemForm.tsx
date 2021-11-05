import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {

    let [currentTitle, setCurrentTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        if (currentTitle.trim() !== "") {
            addItem(currentTitle.trim());
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
            addItemHandler();
            setCurrentTitle('')
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
                onChange={onChangeTitleHandler}
                onKeyPress={onKeyPressHandler}
                size="small"
                disabled={disabled}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
})