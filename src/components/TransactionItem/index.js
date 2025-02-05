// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li className="list-container">
      <p className="transaction-text"> {title} </p>
      <p className="transaction-text"> Rs {amount} </p>
      <p className="transaction-text"> {type} </p>
      <div className="delete-container">
        <button
          className="delete-button"
          type="button"
          data-testid="delete"
          onClick={onDeleteTransaction}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
