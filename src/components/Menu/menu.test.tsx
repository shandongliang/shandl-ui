import React from 'react'
import { cleanup, fireEvent, getByTestId, render, RenderResult, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const testVerDefalutSubMenuProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['3']
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>shandl</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}
const createStyleFile = () => {
  const cssFile: string = `
    .shandl-submenu {
      display: none;
    }
    .shandl-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render the correct default Menu and MenuItem', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('shandl-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
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
    wrapper.container.append(createStyleFile())
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('shandl-menu-vertical')
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.click(dropdownElement)
    expect(wrapper.queryByText('drop1')).toBeVisible()
    fireEvent.click(dropdownElement)
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
  })
  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
  it('should show dropdown items when set defaultOpenSubMenus', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerDefalutSubMenuProps))
    wrapper.container.append(createStyleFile())
    expect(wrapper.queryByText('drop1')).toBeVisible()
  })
})