import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'vertical' | 'horizontal'
type OnSelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  defaultIndex?: string,
  className?: string,
  mode?: MenuMode,
  style?: React.CSSProperties,
  onSelect?: OnSelectCallback,
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string,
  onSelect?: OnSelectCallback,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, onSelect, defaultOpenSubMenus, children } = props
  const [ currentIndex, setCurrentIndex ] = useState(defaultIndex)
  const classes = classNames('shandl-menu', className, {
    'shandl-menu-vertical': mode === 'vertical',
    'shandl-menu-horizontal': mode !== 'vertical'
  })
  const handleClick = (index: string) => {
    console.log(index)
    setCurrentIndex(index)
    if(onSelect){
      onSelect(index)
    }
  }
  const passMenuContext: IMenuContext =  {
    index: currentIndex ? currentIndex: '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem' || displayName === 'SubMenu'){
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.log("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passMenuContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu