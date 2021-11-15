import React from 'react';

import { Meta, Story } from '@storybook/react';

import { ReduxStoreProviderDecorator } from '../stories/decorators/ReduxStoreProviderDecorator';

import { App } from './App';

export default {
  title: 'Todolist/AppComponent',
  component: App,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as Meta;

// const Template: Story<any> = (args) => <App {...args} />;

const Template: Story = () => <App demo />;

export const AppExample = Template.bind({});
AppExample.args = {};
