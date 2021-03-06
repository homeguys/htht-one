import React from 'react'
import { Form } from 'antd'
import TimeChoice from '../index'

function VerticalTimeChoice(props) {
  const { form } = props

  return (
    <Form>
      <TimeChoice form={form} mode="vertical" />
    </Form>
  )
}

export default Form.create({ name: 'time_choice_vertical' })(VerticalTimeChoice)
