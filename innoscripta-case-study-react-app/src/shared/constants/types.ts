export type Country = {
  icon: any
  endpoint: string
}

export type Section = {
  label: string
  code: string
}

export type News = {
  title: string
  date: Date
}

export const TEST_NEWS: News[] = [
  {
    title: 'Test news 1',
    date: new Date(),
  },
  {
    title: 'Test news 2',
    date: new Date(),
  },
  {
    title: 'Test news 3',
    date: new Date(),
  },
  {
    title: 'Test news 4',
    date: new Date(),
  },
  {
    title: 'Test news 5',
    date: new Date(),
  },
  {
    title: 'Test news 6',
    date: new Date(),
  },
  {
    title: 'Test news 7',
    date: new Date(),
  },
]
