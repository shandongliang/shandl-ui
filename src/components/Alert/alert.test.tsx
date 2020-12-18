import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertProps, AlertType } from './alert'

const testProps: AlertProps = {
  title: 'shandl',
  onClose: jest.fn()
}

const typeProps: AlertProps = {
  ...testProps,
  type: AlertType.Danger,
  closable: false,
  message: 'shandongliang',
  className: 'klass'
}

describe('test Alert component', () => {
  it('should render the correct default alert', () => {
    const wrapper = render(<Alert {...testProps}></Alert>)
    const element = wrapper.getByText('shandl')
    expect(element).toBeInTheDocument()
    expect(wrapper.container.querySelector('.alert')).toHaveClass('alert-default')
    fireEvent.click(wrapper.getByText('X'))
    expect(testProps.onClose).toHaveBeenCalled()
    expect(element).not.toBeInTheDocument()
  })
  it('should render the correct Alert based on different type and description', () => {
    const wrapper = render(<Alert {...typeProps}></Alert>)
    expect(wrapper.getByText('shandongliang')).toBeInTheDocument()
    expect(wrapper.queryByText('shandl')).toHaveClass('bold-title')
    expect(wrapper.queryByText('X')).not.toBeInTheDocument()
    expect(wrapper.container.querySelector('.alert')).toHaveClass('klass alert-danger')
  })
})