interface Option {
  name: string
  price?: number
}

interface Optional {
  name: string
  options: Option[]
  required?: {
    min: number
    max: number
  }
}

interface Item {
  id: string
  name: string
  description: string
  price: number
  pictures: string[]
  section: string
  optionals: Optional[]
}

interface ItemOrder {
  item: Item
  amount: number
  selectedOptionals: {
    [index: string]: Option[] | Option
  }
  observation: string
  price: number
}

interface Order {
  items: ItemOrder[]
  orderedAt?: Date
}
