// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';
import React, { useState } from 'react';
import { useInteractionState } from '../hooks/useInteractionState';


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
  className={`${className} border-none glass rounded-md w-fit hover:cursor-pointer hover:scale-[1.02] outline-none transition-all`} 
  classNameBySize={{
    sm: 'text-[0.75rem] px-[0.6rem] py-[0.3rem]',
    md: 'text-[1rem] px-3 py-2',
    lg: 'text-[1.25rem] px-4 py-3',
  }}
  classNameByState={{
    disabled: 'opacity-50 hover:cursor-not-allowed hover:scale-100',
    pressed: 'opacity-80 transform scale-[0.98]',
    focused: 'ring-1 ring-offset-gray-100 ring-white ring-opacity-60',
  }}
  styleByState={{
    pressed: {
      transform: 'scale(0.98)',
    },
    disabled: {
      cursor: "not-allowed"
    }
  }}
  
  {...props} />
}

const ButtonsContainer: React.FC<{children: React.ReactNode, className?:string, style?: React.CSSProperties,horizontal?:boolean}> = ({children, className="", style={}, horizontal=false}) => {
  return <div className={`${className} h-[95vh] w-full flex ${horizontal ? "flex-row space-x-2" : "flex-col space-y-2"} justify-center items-center bg-[#1f1f1f]`} style={style}>
    {children}
  </div>
}

// Stories
export const Sizes: Story = {
  render: () => (
  <ButtonsContainer horizontal>
    <Btn size="sm">Small</Btn>
    <Btn size="md">Medium</Btn>
    <Btn size="lg">Large</Btn>
  </ButtonsContainer>
  ),
}

export const InteractionStates: Story = {
  render: () => {
    const [buttonText, setButtonText] = useState<"Hover Over Me" | "Press Me" | "Leave Me">("Hover Over Me")

    return <ButtonsContainer>
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
    {/* {(()=>{
      const interactionState = useInteractionState()
      console.log(interactionState)
      return <button>Hello</button>
    })()} */}
  </ButtonsContainer>
  },
}

