import React, {ChangeEvent, useState} from "react";
import {TextField, Typography} from "@material-ui/core";

export type EditableSpanProps = {
    title: string
    onChange: (title: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(({title, onChange, disabled = false}: EditableSpanProps) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [locTitle, setLocTitle] = useState<string>(title ? title : '')

    const activateEditMode = () => {
        if (disabled) return
        setEditMode(true)
    }

    const activateViewMode = () => {
        onChange(title)
        setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocTitle(e.currentTarget.value)
    }

    return editMode ?
        <TextField
            value={locTitle}
            id="outlined-basic"
            label="Change task title"
            variant="outlined"
            autoFocus={true}
            onChange={onChangeHandler}
            onBlur={activateViewMode}
            size="small"
        />
        : <Typography onDoubleClick={activateEditMode} variant="h6" component="span">
            {title}
        </Typography>
})