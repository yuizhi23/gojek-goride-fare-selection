// url=https://www.figma.com/design/c1YgvPyHKGDTvB3XdGGSgncL5?node-id=1:2
// source=src/components/Button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance

// Extract properties from Figma component
const label = instance.getString('Label') ?? 'Pesan GoRide'

const variant = instance.getEnum('Variant', {
  'Primary': 'primary',
  'Secondary': 'secondary',
})

const state = instance.getEnum('State', {
  'Default': 'default',
  'Pressed': 'pressed',
  'Disabled': 'disabled',
  'Loading': 'loading',
})

const fullWidth = instance.getBoolean('Full Width', {
  true: 'fullWidth',
  false: '',
})

const disabled = state === 'disabled'
const isLoading = state === 'loading'

export default {
  example: figma.code`<Button variant="${variant}" state="${state}" ${disabled ? 'disabled' : ''} ${isLoading ? 'isLoading' : ''} ${fullWidth}>${label}</Button>`,
  imports: ['import { Button } from "./components/Button"'],
  id: 'atom-button',
  metadata: {
    nestable: true,
    props: {
      variant,
      state,
      label,
    }
  }
}
