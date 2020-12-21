import React, { MouseEvent, useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'

interface SubMenuProps {
  index?: string,
  className?: string,
  title: string
}

const SubMenu: React.FC<SubMenuProps> = props => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [ menuOpen, setMenuOpen ] = useState(isOpend)
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }
  let timer
  const handleMouse = (e: MouseEvent, toggle: boolean) => {
    e.preventDefault()
    timer = setTimeout(() => [
      setMenuOpen(toggle)
    ], 300)
  }
  const clickEvent = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const mouseEvent = context.mode !== 'vertical' ? {
    onMouseEnter: (e: MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: MouseEvent) => handleMouse(e, false)
  } : {}
  const classes = classNames('shandl-menuItem shandl-submenuItem', className, {
    'shandl-menuItem-active': context.index === index
  })
  const subMenuClasses = classNames('shandl-submenu', {
    'menu-opened': menuOpen
  })
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if(childElement.type.displayName === 'MenuItem'){
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.log("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...mouseEvent}>
      <div className='submenu-title' {...clickEvent}>{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu