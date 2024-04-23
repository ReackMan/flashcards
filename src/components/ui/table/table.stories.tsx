import { CSSProperties, useMemo, useState } from 'react'

import { ArrowDownIcon, CheckIcon, DeleteIcon, EditIcon, Logo, PlayCircleIcon } from '@/assets'
import { TypographyVariant } from '@/common'
import { Button, IconButton, Rating, Typography } from '@/components'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Table } from './table'
import { Column, Sort, TableHeader } from './tableHeader'

const meta: Meta<typeof Table.Root> = {
  component: Table.Root,
  tags: ['autodocs'],
  title: 'Components/Table',
}

export default meta
type Story = StoryObj<typeof meta>

// general data and types
const columnsPrimitives: Column[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'created',
    title: 'Created by',
  },
]

const columns: Column[] = [
  ...columnsPrimitives,
  {
    key: 'icons',
    title: '',
  },
]

const columnsSortable: Column[] = columns.map(column =>
  column.key !== 'icons' ? { ...column, sortable: true } : column
)

// general styles
const iconsPrimitivesWrapper: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
  height: '3.6rem',
}

const cellPrimitivesWrapper: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
  height: '6.1rem',
}

const logoPrimitives: CSSProperties = {
  maxWidth: '11.8rem',
  width: '100%',
}

const textHeadCellPrimitives: CSSProperties = {
  position: 'relative',
}

const iconHeadCellPrimitives: CSSProperties = {
  position: 'absolute',
  right: '-1.6rem',
  top: '60%',
  transform: 'translateY(-50%)',
}

// primitives
export const Primitives = () => {
  return (
    <Table.Root style={{ width: '210px' }}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>
            <Typography variant={TypographyVariant.Subtitle2}>Name</Typography>
          </Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>Name</Typography>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell style={iconsPrimitivesWrapper}>
            <CheckIcon size={1.6} />
            <Typography variant={TypographyVariant.Body2}>Name</Typography>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell style={iconsPrimitivesWrapper}>
            <Typography variant={TypographyVariant.Body2}>Name</Typography>
            <IconButton icon={<PlayCircleIcon />} size={1.6} />
            <IconButton icon={<EditIcon />} size={1.6} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell style={iconsPrimitivesWrapper}>
            <IconButton icon={<PlayCircleIcon />} size={1.6} />
            <IconButton icon={<EditIcon />} size={1.6} />
            <IconButton icon={<DeleteIcon />} size={1.6} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell style={iconsPrimitivesWrapper}>
            <Rating rating={4} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell style={cellPrimitivesWrapper}>
            <Logo style={logoPrimitives} />
            <Typography variant={TypographyVariant.Body2}>Name</Typography>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell style={iconsPrimitivesWrapper}>
            <CheckIcon size={1.6} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>
            <Typography
              as={'span'}
              style={textHeadCellPrimitives}
              variant={TypographyVariant.Subtitle2}
            >
              Name
              {/*this span only for story, don't use*/}
              <span style={iconHeadCellPrimitives}>
                <ArrowDownIcon size={1.2} />
              </span>
            </Typography>
          </Table.HeadCell>
        </Table.Row>
      </Table.Head>
    </Table.Root>
  )
}

//tableHeader
const columnsTableNoSortable: Column[] = columnsPrimitives

const columnsTableHeaderSortable: Column[] = columnsTableNoSortable.map(column => ({
  ...column,
  sortable: true,
}))

const TableHeaderWithHooks = () => {
  const [sort, setSort] = useState<Sort>(null)

  const sortedString = useMemo(() => {
    if (!sort) {
      return null
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])

  action(sortedString!)()

  return (
    <Table.Root>
      <TableHeader columns={columnsTableHeaderSortable} onSort={setSort} sort={sort} />
    </Table.Root>
  )
}

export const HeaderNoSortable = () => {
  return (
    <Table.Root>
      <TableHeader columns={columnsTableNoSortable} />
    </Table.Root>
  )
}

export const HeaderSortable: Story = {
  render: args => <TableHeaderWithHooks {...args} />,
}

// default
const iconsTableWrapper: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
  height: '3.6rem',
}

const columnsDefault: Column[] = [
  {
    key: 'technology',
    title: 'Technology',
  },
  {
    key: 'description',
    title: 'Description',
  },
  {
    key: 'link',
    title: 'Link',
  },
  {
    key: 'rating',
    title: 'Rating',
  },
  {
    key: 'icons',
    title: '',
  },
]

export const Default = () => {
  return (
    <Table.Root>
      <TableHeader columns={columnsDefault} />
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>JavaScript</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>Programming language</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography
              as={'a'}
              href={'https://developer.mozilla.org/en-US/docs/Web/JavaScript'}
              target={'_blank'}
              variant={TypographyVariant.Link1}
            >
              https://developer.mozilla.org/en-US/docs/Web/JavaScript
            </Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>5</Typography>
          </Table.Cell>
          <Table.Cell style={iconsTableWrapper}>
            <IconButton icon={<PlayCircleIcon />} size={1.6} />
            <IconButton icon={<EditIcon />} size={1.6} />
            <IconButton icon={<DeleteIcon />} size={1.6} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>React</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>UI library</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography
              as={'a'}
              href={'https://react.dev/'}
              target={'_blank'}
              variant={TypographyVariant.Link1}
            >
              https://react.dev/
            </Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>4</Typography>
          </Table.Cell>
          <Table.Cell style={iconsTableWrapper}>
            <IconButton icon={<PlayCircleIcon />} size={1.6} />
            <IconButton icon={<EditIcon />} size={1.6} />
            <IconButton icon={<DeleteIcon />} size={1.6} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>Redux Toolkit</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>State manager</Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography
              as={'a'}
              href={'https://redux-toolkit.js.org/'}
              target={'_blank'}
              variant={TypographyVariant.Link1}
            >
              https://redux-toolkit.js.org/
            </Typography>
          </Table.Cell>
          <Table.Cell>
            <Typography variant={TypographyVariant.Body2}>3</Typography>
          </Table.Cell>
          <Table.Cell style={iconsTableWrapper}>
            <IconButton icon={<PlayCircleIcon />} size={1.6} />
            <IconButton icon={<EditIcon />} size={1.6} />
            <IconButton icon={<DeleteIcon />} size={1.6} />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}

// mapped
const data = [
  {
    cardsCount: 10,
    createdBy: 'John Doe',
    title: 'Project A',
    updated: '2023-07-07',
  },
  {
    cardsCount: 5,
    createdBy: 'Jane Smith',
    title: 'Project B',
    updated: '2023-07-06',
  },
  {
    cardsCount: 8,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 12,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
]

export const Mapped = () => {
  return (
    <Table.Root>
      <TableHeader columns={columns} />
      <Table.Body>
        {data.map(item => (
          <Table.Row key={item.title}>
            {Object.values(item).map((value, index) => {
              return (
                <Table.Cell key={`${value}${index}`}>
                  <Typography variant={TypographyVariant.Body2}>{value}</Typography>
                </Table.Cell>
              )
            })}
            <Table.Cell style={iconsTableWrapper}>
              <IconButton icon={<PlayCircleIcon />} size={1.6} />
              <IconButton icon={<EditIcon />} size={1.6} />
              <IconButton icon={<DeleteIcon />} size={1.6} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

// sortable
export const Sortable = () => {
  const [sort, setSort] = useState<Sort>(null)

  const sortedString = useMemo(() => {
    if (!sort) {
      return null
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])

  console.log(sortedString)

  return (
    <Table.Root>
      <TableHeader columns={columnsSortable} onSort={setSort} sort={sort} />
      <Table.Body>
        {data.map(item => (
          <Table.Row key={item.title}>
            <Table.Cell>
              <Typography variant={TypographyVariant.Body2}>{item.title}</Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={TypographyVariant.Body2}>{item.cardsCount}</Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={TypographyVariant.Body2}>{item.updated}</Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={TypographyVariant.Body2}>{item.createdBy}</Typography>
            </Table.Cell>
            <Table.Cell style={iconsTableWrapper}>
              <IconButton icon={<PlayCircleIcon />} size={1.6} />
              <IconButton icon={<EditIcon />} size={1.6} />
              <IconButton icon={<DeleteIcon />} size={1.6} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

// empty
export const Empty = () => {
  const emptyContainer: CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  }

  return (
    <div style={emptyContainer}>
      <Table.Empty />
      <Button>Add New Card</Button>
    </div>
  )
}
