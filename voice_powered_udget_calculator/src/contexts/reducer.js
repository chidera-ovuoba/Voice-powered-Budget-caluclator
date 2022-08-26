const reducer = (state,action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            const transactions = state.transactions.filter((item) => item.id !== action.payload);
            localStorage.setItem('transactions', JSON.stringify({ ...state, transactions: transactions }))
            return { ...state, transactions: transactions }
        case 'ADD_TRANSACTION':
            localStorage.setItem('transactions', JSON.stringify({...state,transactions:[action.payload,...state.transactions]}))
            return {...state,transactions:[action.payload,...state.transactions]}
        case 'CLEAR_TRANSACTION':
            localStorage.setItem('transactions', JSON.stringify({ ...state, transactions: [] }))
            localStorage.setItem('dataState', JSON.stringify([]));
            return {...state,transactions:[]}
        default:
            return state
    } 

}
export default reducer;