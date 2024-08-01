export const mapPizzaSize = {
    20: 'Маленькая',
    30: 'Средняя',
    40: 'Большая'
} as const


export const mapPizzaType = {
    1: 'традиционное',
    2: 'тонкое'
} as const


export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => {
    return {
        name,
        value
    }
})


export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => {
    return {
        name,
        value
    }
})


export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType
