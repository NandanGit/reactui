// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';
import React, { useState } from 'react';
import { Container } from './Container';



//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters:{
    layout: 'fullscreen',
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

// Custom Component
const Btn: typeof Button = ({className,...props}) => {
  return <Button 
  className={`${className} glass rounded-md hover:cursor-pointer hover:scale-[1.02] outline-none transition-all`} 
  classNameBySize={{
    sm: 'text-[0.75rem] px-[0.6rem] py-[0.3rem]',
    md: 'text-[1rem] px-3 py-2',
    lg: 'text-[1.25rem] px-4 py-3',
  }}
  classNameByState={{
    disabled: 'disabled',
    pressed: 'transform scale-[0.98]',
    focused: 'ring-1 ring-offset-gray-100 ring-white ring-opacity-60',
  }}
  styleByState={{
    pressed: {
      transform: 'scale(0.98)',
    },
  }}
  
  {...props} />
}

// Stories
export const Sizes: Story = {
  render: () => (
  <Container horizontal>
    <Btn size="sm">Small</Btn>
    <Btn size="md">Medium</Btn>
    <Btn size="lg">Large</Btn>
  </Container>
  ),
}

export const InteractionStates: Story = {
  render: () => {
    const [buttonText, setButtonText] = useState<"Hover Over Me" | "Press Me" | "Leave Me">("Hover Over Me")

    return <Container>
    <Btn 
    className="w-36" 
    onHoverStart={()=>{
      setButtonText("Press Me")
    }}
    onHoverEnd={()=> setButtonText("Hover Over Me")}
    onPressChange={(isPressed)=> {
      if (isPressed) {
        setButtonText("Leave Me")
      } else {
        setButtonText("Press Me")
      }
    }}
    onFocusChange={(isFocused)=>{
      if (isFocused) {
        setButtonText("Press Me")
      } else {
        setButtonText("Hover Over Me")
      }
    }}
    >{buttonText}</Btn>
    <Btn isDisabled>Disabled</Btn>
    <Btn autoFocus>Hello</Btn>
  </Container>
  },
}
