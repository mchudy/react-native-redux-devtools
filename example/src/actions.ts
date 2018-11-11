export enum ActionTypes {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT'
}

export const actions = {
    increment: () => ({
        type: ActionTypes.INCREMENT,
        payload: {
            a: 1,
            b: true
        }
    }),
    decrement: () => ({
        type: ActionTypes.DECREMENT
    })
}