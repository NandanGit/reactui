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
  className={`${className} glass rounded-md hover:cursor-pointer hover:scale-[1.02] hover:bg-opacity-20 outline-none transition-all`} 
  // classNameBySize={{
  //   sm: 'text-[0.75rem] px-[0.6rem] py-[0.3rem]',
  //   md: 'text-[1rem] px-3 py-2',
  //   lg: 'text-[1.25rem] px-4 py-3',
  // }}
  classNameByVariant={{
    outline: 'bg-opacity-0 shadow-[inset_0_0_0_0.1rem_#fff1] hover:bg-opacity-10 hover:shadow-[inset_0_0_0_0.1rem_#fff0]',
    ghost: 'bg-opacity-0 backdrop-blur-0 shadow-none hover:bg-transparent',
    link: 'bg-opacity-0 backdrop-blur-0 shadow-none hover:bg-transparent hover:underline text-blue-500 hover:scale-105',
  }}
  classNameByStatus={{
    primary: 'bg-opacity-40 bg-violet-900 text-violet-200 text-opacity-80 hover:bg-opacity-50',
    success: 'bg-opacity-40 bg-green-800 text-green-200 text-opacity-80 hover:bg-opacity-50',
    secondary: 'bg-opacity-40 bg-teal-900 text-teal-200 text-opacity-70 hover:bg-opacity-40',
    warning: 'bg-opacity-40 bg-yellow-800 text-yellow-200 text-opacity-80 hover:bg-opacity-50',
    danger: 'bg-opacity-40 bg-red-900 text-red-200 text-opacity-70 hover:bg-opacity-40',
    info: 'bg-opacity-40 bg-sky-900 text-sky-200 text-opacity-70 hover:bg-opacity-40',
  }}

  styleByVariant={{
    ghost: {
      background: 'transparent',
    }
  }}

  // Begin Experiment
  appearance={{
    static: {
      classNameMaps: {
        size: {
          sm: 'text-[0.75rem] px-[0.6rem] py-[0.3rem]',
          md: 'text-[1rem] px-3 py-2',
          lg: 'text-[1.25rem] px-4 py-3',
        }
      }
    },
    dynamic: {
      classNameMap: {
        disabled: 'disabled',
        pressed: 'transform scale-[0.98]',
        focused: 'ring-1 ring-offset-gray-100 ring-white ring-opacity-50',
      },
      styleMap: {
        pressed: {
          transform: 'scale(0.98)',
        },
      }
    }
  }}
  // End Experiment
  
  {...props} />
}

// Stories
export const Sizes: Story = {
  render: () => (
  <Container >
    <Btn size="lg" variant='outline'>Large Button</Btn>
    <Btn size="md" status="warning">Medium</Btn>
    <Btn size="sm">Small</Btn>
  </Container>
  ),
}

const Link: React.FC<{href: string, children: React.ReactNode}> = ({href, children}) => {
  return <a href={href}><Btn variant="link" style={{padding:0}}>{children}</Btn></a>
}

export const Variants: Story = {
  render: () => (
  <Container>
    <div>This is a <Link href='#'>link</Link> within a sentence.</div>
    <div className='grid grid-cols-2 gap-2'>
      <Btn variant="filled" status='primary'>Filled</Btn>
      <Btn variant="ghost">Ghost</Btn>
      <Btn variant="link">Link</Btn>
      <Btn variant="outline">Outlined</Btn>
    </div>
  </Container>
  ),
}

export const Statuses: Story = {
  render: () => (
  <Container>
    <div className='grid grid-cols-3 gap-2'>
      <Btn status="success">Success</Btn>
      <Btn status="secondary">Secondary</Btn>
      <Btn status="warning" className="row-span-2">Warning</Btn>
      <Btn className="col-span-2">Default</Btn>
      <Btn status="danger" variant="outline">Danger</Btn>
      <Btn status="info" variant="ghost">Info</Btn>
      <Btn status="primary" >Primary</Btn>
      <Btn status="info">Info</Btn>
      <Btn status="info" variant="outline" className="col-span-2 bg-opacity-5 backdrop-blur-0 text-emerald-600 hover:bg-emerald-900">Custom</Btn>
    </div>
  </Container>
  ),
}

export const InteractionStates: Story = {
  render: () => {
    const [buttonText, setButtonText] = useState<"Hover Over Me" | "Press Me" | "Leave Me">("Hover Over Me")

    return <Container >
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
    <Btn isDisabled status='default' variant="outline">Disabled</Btn>
    <Btn autoFocus variant="ghost">Auto Focused</Btn>
  </Container>
  },
}

// export const Foo: Story =  {
//   render: () => (
//     <Container>
//       <Button variant="outline">Hello</Button>
//     </Container>
//   )
// }