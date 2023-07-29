import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components';
import { Container } from './Container';
import { SwitchStatus } from '../components/Switch/Switch.types';
import { capitalize } from './utils/string';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

// Custom Switch
const Swt: typeof Switch = ({ children, ...props }) => {
  return (
    <Switch
      appearance={{
        self: {
          className: 'group',
        },
        static: {
          classNameMaps: {
            size: {
              sm: 'w-[2rem] h-[1.2rem]',
              lg: 'w-[4rem] h-[2.4rem]',
              md: 'w-[3rem] h-[1.8rem]',
            },
          },
        },
        dynamic: {},
        childrenAppearances: {
          indicator: {
            self: {
              className:
                'glass rounded-full w-full h-full p-[0.125rem] hover:cursor-pointer transition-all relative group-data-[disabled]:opacity-50',
            },
            static: {
              classNameMaps: {
                status: {
                  success: 'bg-opacity-50 bg-success-500',
                  warning: 'bg-opacity-50 bg-warning-500',
                  danger: 'bg-opacity-50 bg-danger-500',
                  info: 'bg-opacity-50 bg-info-500',
                  primary: 'bg-opacity-50 bg-primary-500',
                  secondary: 'bg-opacity-50 bg-secondary-500',
                },
                variant: {
                  outline:
                    'bg-opacity-0 shadow-[inset_0_0_0_0.15rem_#fff1] group-data-[selected]:shadow-white/0',
                },
              },
            },
            dynamic: {
              classNameMap: {
                focused: 'ring-2 ring-offset-2 ring-offset-[#0008]',
              },
            },
          },
          toggle: {
            self: {
              className:
                'glass rounded-full transition-all absolute left-0 top-[50%] transform -translate-y-1/2 bg-gray-200/30',
            },
            static: {},
            dynamic: {
              classNameMap: {
                selected: '!bg-gray-200/70',
              },
            },
          },
        },
      }}
      {...props}
    >
      {children}
    </Switch>
  );
};

const SwtTwo: typeof Switch = ({ className, style, children, ...props }) => {
  return (
    <Switch
      className={`${className}`}
      style={style}
      appearance={{
        static: {
          classNameMaps: {
            size: {
              sm: 'w-5 h-2.5',
              md: 'w-7 h-3.5',
              lg: 'w-9 h-4.5',
            },
          },
        },
        dynamic: {},
        container: {
          // className: 'w-fit h-fit',
        },
        childrenAppearances: {
          indicator: {
            self: {
              className:
                'w-full h-full bg-gray-200/50 rounded p-[0.1rem]  hover:cursor-pointer relative transition-all max-w-full',
            },
            static: {
              classNameMaps: {},
            },
            dynamic: {
              classNameMap: {
                focused: 'ring-1  ring-sky-500',
              },
            },
          },
          toggle: {
            self: {
              className:
                'bg-gray-200 rounded  absolute left-0 top-[50%] transform -translate-y-1/2 transition-all',
            },
            static: {},
            dynamic: {
              classNameMap: {
                selected: 'bg-teal-800',
              },
              styleMap: {},
            },
          },
        },
      }}
      {...props}
    >
      {children}
    </Switch>
  );
};

// Stories
export const Sizes: Story = {
  render: () => {
    return (
      <Container>
        <Swt size="lg" label="sw-1" />
        <Swt size="md" label="sw-2" />
        <Swt size="sm" label="sw-3" />
      </Container>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const propCollection: [string, object][] = [
      ['Filled', { variant: 'filled' }],
      ['Filled Selected', { variant: 'filled', defaultSelected: true }],
      ['Outline', { variant: 'outline' }],
      ['Outline Selected', { variant: 'outline', defaultSelected: true }],
    ];
    return (
      <Container>
        <div className="flex flex-col items-start space-y-2">
          {propCollection.map(([label, props], ind) => (
            <div className="flex flex-row-reverse items-center">
              {label}{' '}
              <Swt
                label={label}
                key={label}
                {...props}
                containerClassName="mr-4"
              />
            </div>
          ))}
        </div>
      </Container>
    );
  },
};

export const Statuses: Story = {
  render: () => {
    const statuses: SwitchStatus[] = [
      // 'default',
      'success',
      'primary',
      'warning',
      'danger',
      'info',
      'secondary',
    ];
    return (
      <Container>
        <div className="grid grid-cols-2 gap-4 justify-items-end">
          {statuses.map((status, ind) => (
            <div className="flex items-center">
              {capitalize(status)}
              <Swt
                status={status}
                defaultSelected
                label={`sw-${ind + 1}`}
                key={status}
                containerClassName="ml-4"
              />
            </div>
          ))}
        </div>
      </Container>
    );
  },
};

export const InteractionStates: Story = {
  render: () => {
    // const propsCollection = [
    //   { isDisabled: true },
    //   { autoFocus: true },
    //   { isDisabled: true, defaultSelected: true },
    //   { isReadOnly: true },
    //   {},
    // ];
    const propCollection: [string, object][] = [
      ['Selected by default', { defaultSelected: true }],
      ['Disabled', { isDisabled: true }],
      [
        'Disabled and Selected by default',
        { isDisabled: true, defaultSelected: true },
      ],
      ['Auto Focused', { autoFocus: true }],
      ['Readonly', { isReadOnly: true }],
      [
        'Readonly and Selected by default',
        { isReadOnly: true, defaultSelected: true },
      ],
    ];
    return (
      <Container>
        <div className="flex flex-col items-start space-y-2">
          {propCollection.map(([label, props], ind) => (
            <div className="flex flex-row-reverse items-center">
              {label}{' '}
              <Swt
                label={label}
                key={label}
                {...props}
                containerClassName="mr-4"
              />
            </div>
          ))}
        </div>
      </Container>
    );
  },
};
