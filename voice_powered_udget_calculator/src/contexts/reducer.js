const reducer = (state,action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            const transactions = state.transactions.filter((item) => item.id !== action.payload);
            return { ...state, transactions: transactions }
          case 'ADD_TRANSACTION':
            return {...state,transactions:[action.payload,...state.transactions]}
        default:
            return state
    } 

}
export default reducer;