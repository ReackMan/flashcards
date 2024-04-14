import { Button } from './components/ui/button'
import { Typography } from './components/ui/typography'

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button>Hello World</Button>
      <Button as={'a'} href={'https://google.com'}>
        Hello World
      </Button>
      <Typography as={'h1'}>It is H1 tag</Typography>
    </div>
  )
}
