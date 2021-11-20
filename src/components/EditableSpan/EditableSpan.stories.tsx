import React from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';

import { EditableSpan, EditableSpanProps } from './EditableSpan';

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: 'New title on changed',
    },
  },
} as Meta;

const Template: Story<EditableSpanProps> = args => <EditableSpan {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  title: 'Title for edit. Click to me!',
  onChange: action('Button inside form clicked'),
};
