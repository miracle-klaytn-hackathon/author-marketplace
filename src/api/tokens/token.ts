export interface BookToken {
    id: string,
    name: string,
    price: number
}

export const getBookTokens = () : BookToken[] | any => {
    return Array(10)
        .fill(0)
        .map((val, idx) => ({
            id: `${idx}`,
            name: "test " + idx,
            price: 123,
        }))
}