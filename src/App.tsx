import { Button } from './components/ui/button'

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button>Hello World</Button>
      <Button as={'a'} href={'https://google.com'}>
        Hello World
      </Button>
    </div>
  )
}
