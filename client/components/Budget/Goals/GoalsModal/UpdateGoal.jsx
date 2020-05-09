import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import './goalModal.css'

import { updateUserGoal } from '../../../../store/actions/goals'
import { setModal } from '../../../../store/actions/modal'

const options = [
  { key: 'w', text: 'Weekly', value: 'Weekly' },
  { key: 'm', text: 'Monthly', value: 'Monthly' },
  { key: 'y', text: 'Yearly', value: 'Yearly' }
]

export class UpdateGoal extends Component {
  state = {
    currentAmount: this.props.select.currentAmount,
    budgetDistribution: this.props.select.budgetDistribution,
    frequency: this.props.select.frequency
  }

  handleOnChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleOnSubmit = async () => {
    await this.props.updateUserGoal(this.props.select.id, this.state)
    this.props.setModal(null, false)
  }

  render () {
    const { currentAmount, budgetDistribution, frequency } = this.state
    return (
      <div className="goalModalFormContainer">
        <div className="goalModalHeader">{this.props.form}</div>
        <div className="divider" />
        <Form style={{ height: '100%' }} onSubmit={this.handleOnSubmit}>
          <Form.Field>
            <Form.Input
              value={currentAmount}
              onChange={this.handleOnChange}
              name="currentAmount"
              type="number"
              placeholder="current amount"
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              value={budgetDistribution}
              onChange={this.handleOnChange}
              name="budgetDistribution"
              type="number"
              placeholder="budget distribution"
            />
          </Form.Field>
          <Form.Select
            options={options}
            name="frequency"
            defaultValue={frequency}
            onChange={this.handleOnChange}
            placeholder="frequency"
          />
          <Button className="submitBtn" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  form: state.modal.goal.form,
  select: state.goal.selected
})

const mapDispatchToProps = {
  setModal,
  updateUserGoal
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGoal)
