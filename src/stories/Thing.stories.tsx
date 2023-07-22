import { Meta, StoryObj } from '@storybook/react';
import { Thing } from '../components/Thing';
import React from 'react';

const meta: Meta<typeof Thing> = {
  title: 'ReactUI/Thing',
  component: Thing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof Thing>;

export const Default: Story = {
  args: {
    backgroundColor: 'red',
  },
};
