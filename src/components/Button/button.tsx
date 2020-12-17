import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Danger = 'danger',
  Default = 'default',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string,
  size?: ButtonSize,
  disabled?: boolean,
  btnType?: ButtonType,
  children: React.ReactNode,
  href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    size,
    className,
    disabled,
    btnType,
    children,
    href,
    ...restProps
  } = props
  const classes = classNames('btn', className, {
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if(btnType === ButtonType.Link && href){
    return (
      <a
        className = {classes}
        href = {href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className = {classes}
        disabled = {disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

export default Button

Button.defaultProps = {
  btnType: ButtonType.Default,
  disabled: false
}