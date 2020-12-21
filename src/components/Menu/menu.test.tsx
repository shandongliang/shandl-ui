import React from 'react'
import { cleanup, fireEvent, getByTestId, render, RenderResult } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>shandl</MenuItem>
    </Menu>
  )
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render the correct default Menu and MenuItem', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('shandl-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('shandl-menuItem shandl-menuItem-active')
    expect(disabledElement).toHaveClass('shandl-menuItem shandl-menuItem-disabled')
  })
  it('lick items should change active and call the right callback', () => {
    const thirdElement = wrapper.getByText('shandl')
    fireEvent.click(thirdElement)
    // expect(thirdElement).toBeCalled()
    expect(activeElement).not.toHaveClass('shandl-menuItem-active')
    expect(thirdElement).toHaveClass('shandl-menuItem-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('shandl-menuItem-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when set mode to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('shandl-menu-vertical')
  })
})