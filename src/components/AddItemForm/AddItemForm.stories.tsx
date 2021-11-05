import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


// OLD SYNTAX'S
// export default {
//     title: 'Todolist/AddItemForm',
//     component: AddItemForm
// }
// const callback = action('Button inside form clicked')
//
// export const AddItemFormOldVariant = () => {
//     return <AddItemForm addItem={callback} />
// }

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        },
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button inside form clicked')
};

export const AddItemFormDisabledExample = (props: any) => {
    return (
        <AddItemForm addItem={action('Button inside form clicked')} disabled={true}/>
    )
}

