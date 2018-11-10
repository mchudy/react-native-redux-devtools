export enum ActionTypes {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT'
}

export const actions = {
    increment: () => ({
        type: ActionTypes.INCREMENT,
        payload: {
            a: '1',
            b: '2'
        }
    }),
    decrement: () => ({
        type: ActionTypes.DECREMENT
    })
}