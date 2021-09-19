import React, {ChangeEvent, useState} from "react";
import {TextField, Typography} from "@material-ui/core";

type EditableSpanProps = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanProps) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title ? props.title : '')

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        props.onChange(title)
        setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ?
        <TextField
                id="outlined-basic"
                label="Change task title"
                variant="outlined"
                autoFocus={true}
                onChange={onChangeHandler}
                onBlur={activateViewMode}
                size="small"
            />
        : <Typography onDoubleClick={activateEditMode} variant="h6" component="span">
            {props.title}
        </Typography>
})