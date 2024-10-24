import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state

    const updatedTransactionList = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionList: updatedTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getBalance = () => {
    const {transactionList} = this.state

    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeAmountInput = event => {
    this.setState({
      amountInput: event.target.value,
    })
  }

  onChangeOptionId = event => {
    this.setState({
      optionId: event.target.value,
    })
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="container">
          <h1 className="heading">Hi, Richard</h1>
          <p className="descrip">
            Welcome back to your{' '}
            <span className="money-descrip">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />

        <div className="transaction-details-container">
          <form className="form" onSubmit={this.onAddTransaction}>
            <h1 className="transaction-heading">Add Transaction</h1>
            <label htmlFor="title" className="label-descrip">
              TITLE
            </label>
            <input
              type="text"
              placeholder="TITLE"
              className="input-box"
              onChange={this.onChangeTitleInput}
              value={titleInput}
              id="title"
            />
            <label htmlFor="amount" className="label-descrip">
              AMOUNT
            </label>
            <input
              type="text"
              placeholder="AMOUNT"
              className="input-box"
              onChange={this.onChangeAmountInput}
              value={amountInput}
              id="amount"
            />
            <label htmlFor="select" className="label-descrip">
              TYPE
            </label>
            <select
              className="input-box"
              id="select"
              onChange={this.onChangeOptionId}
              value={optionId}
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button className="add-button" type="submit">
              Add
            </button>
          </form>

          <div className="history-transaction">
            <h1 className="transaction-heading">History</h1>
            <div className="table-container">
              <ul className="table-list-container">
                <li className="table-header">
                  <p className="table-descrip">Title</p>
                  <p className="table-descrip">Amount</p>
                  <p className="table-descrip">Type</p>
                </li>
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
