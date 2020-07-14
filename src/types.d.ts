interface Restaurant {
  ref: firebase.firestore.DocumentReference
  data: {
    name: string
    coverPicture: string
    foodType: string
    tableCodeMap?: {
      [code: string]: string
    }
    maxCapacity: number
    address: {
      city: string
      state: string
      street: string
      number: string
      complement: string
    }
    tableCodes: string[]
  }
}

interface OrderData {
  items: ItemOrder[]
  sessionId?: string
  status?: string
  fromTable?: string
  orderedAt?: Date
}

interface Session {
  ref: firebase.firestore.DocumentReference
  data: {
    checkinAt: firebase.firestore.Timestamp
    checkoutAt?: firebase.firestore.Timestamp
    tableCode: string
    totalPrice?: number
    userId: string
  }
}

interface Order {
  ref: firebase.firestore.DocumentReference
  data: OrderData
}

interface MenuItemData {
  name: string
  description: string
  price?: number
  pictures: string[]
  section: string
  optionals: Optional[]
}

interface MenuItem {
  ref: firebase.firestore.DocumentReference
  data: MenuItemData
}

interface Option {
  name: string
  price?: number
}

interface Optional {
  name: string
  options: Option[]
  required: {
    min?: number
    max?: number
  }
}

interface SelectedOptionals {
  [index: string]: Option[] | Option
}

interface ItemOrder {
  item: {
    id: string
    name: string
  }
  amount: number
  selectedOptionals: SelectedOptionals
  observation: string
  price: number
}
