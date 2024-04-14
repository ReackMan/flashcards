import type { Meta, StoryObj } from '@storybook/react'

import { TypographyVariant } from '@/common'

import { Typography } from './'

const meta = {
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'H1',
    variant: TypographyVariant.H1,
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'H2',
    variant: TypographyVariant.H2,
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'H3',
    variant: TypographyVariant.H3,
  },
}

export const H4: Story = {
  args: {
    as: 'h4',
    children: 'H4',
    variant: TypographyVariant.H4,
  },
}

export const Body1: Story = {
  args: {
    children: 'Body1',
    variant: TypographyVariant.Body1,
  },
}

export const Subtitle1: Story = {
  args: {
    children: 'Subtitle1',
    variant: TypographyVariant.Subtitle1,
  },
}

export const Body2: Story = {
  args: {
    children: 'Body2',
    variant: TypographyVariant.Body2,
  },
}

export const Subtitle2: Story = {
  args: {
    children: 'Subtitle2',
    variant: TypographyVariant.Subtitle2,
  },
}

export const Caption: Story = {
  args: {
    children: 'Caption',
    variant: TypographyVariant.Caption,
  },
}

export const Overline: Story = {
  args: {
    children: 'Overline',
    variant: TypographyVariant.Overline,
  },
}

export const Link1: Story = {
  args: {
    as: 'a',
    children: 'Link1',
    variant: TypographyVariant.Link1,
  },
}

export const Link2: Story = {
  args: {
    as: 'a',
    children: 'Link2',
    variant: TypographyVariant.Link2,
  },
}
