export interface Author {
    name: string
    lastname: string
}

export interface Item {
    id: string
    title: string
    price: {
        currency: string
        amount: number
        decimals: number
    }
    picture: string
    condition: string
    free_shipping: boolean
}

export interface ItemDetail extends Item {
    sold_quantity: number
    description: string
}

export interface ItemsResponse {
    author: Author
    items: Item[]
}

export interface ItemDetailResponse {
    author: Author
    item: ItemDetail
}

export interface GenerateTitleResponse {
    author: Author
    title: string
    useIAIntegration: boolean
}