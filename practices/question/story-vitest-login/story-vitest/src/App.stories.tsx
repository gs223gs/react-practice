import type { Meta, StoryObj } from '@storybook/react';
import App from './App';

const meta = {
  title: 'Components/App',
  component: App,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ログインフォームコンポーネント',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 