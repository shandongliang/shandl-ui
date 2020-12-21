import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'vertical' | 'horizontal'
type OnSelectCallback = (selectedIndex: number) => void

export interface MenuProps {
  defaultIndex?: number,
  className?: string,
  mode?: MenuMode,
  style?: React.CSSProperties,
  onSelect?: OnSelectCallback
}

interface IMenuContext {
  index: number,
  onSelect?: OnSelectCallback
}

export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, onSelect, children } = props
  const [ currentIndex, setCurrentIndex ] = useState(defaultIndex)
  const classes = classNames('shandl-menu', className, {
    'shandl-menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    console.log(index)
    setCurrentIndex(index)
    if(onSelect){
      onSelect(index)
    }
  }
  const passMenuContext: IMenuContext =  {
    index: currentIndex ? currentIndex: 0,
    onSelect: handleClick
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem'){
        return React.cloneElement(childElement, {
          index
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
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu