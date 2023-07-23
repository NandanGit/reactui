// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';
import React, { useState } from 'react';


//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg',],
    },
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

// Custom Component
const Btn: typeof Button = ({className,...props}) => {
  return <Button 
  className={`${className} border-none glass py-2 px-3 rounded-md w-fit hover:cursor-pointer hover:scale-[1.02] outline-none transition-all`} 
  classNameBySize={{
    sm: 'text-xs py-1 px-2',
    md: 'text-md',
    lg: 'text-lg px-5',
  }}
  classNameByState={{
    disabled: 'opacity-50 hover:cursor-not-allowed',
    pressed: 'opacity-80 transform scale-[0.98]',
    focused: 'ring-1 ring-offset-gray-100 ring-white ring-opacity-60',
  }}

  styleByState={{
    pressed: {
      transform: 'scale(0.98)',
    }
  }}
  
  {...props} />
}

const ButtonsContainer: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <div className="h-[93vh] w-full flex flex-col justify-center items-center space-y-2">
    {children}
  </div>
}

// Stories
export const Sizes: Story = {
  render: () => (
  <ButtonsContainer>
    <Btn size="sm">Small</Btn>
    <Btn size="md">Medium</Btn>
    <Btn size="lg">Large</Btn>
  </ButtonsContainer>
  ),
}

export const States: Story = {
  render: () => {
    const [buttonText, setButtonText] = useState<"Hover Over Me" | "Press Me" | "Leave Me">("Hover Over Me")

    return <ButtonsContainer>
    <Btn 
    className="w-36" 
    onHover={()=>{
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
  </ButtonsContainer>
  },
}

