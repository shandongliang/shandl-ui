import React, { useState } from 'react'
import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

export interface AlertProps {
  className?: string;
  title: string;
  message?: string;
  type?: AlertType;
  closable?: boolean;
  onClose?: () => void
}

const Alert: React.FC<AlertProps> = props => {
  const {
    className,
    title,
    message,
    type,
    closable,
    onClose
  } = props
  const [visible, setVisible] = useState(true)
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type
  })
  const titleClasses = classNames('alert-title', {
    'bold-title': message
  })
  const handleClose = (e: React.MouseEvent) => {
    if(onClose){
      onClose()
    }
    setVisible(false)
  }
  return (
    <>
      {visible&&<div className={classes}>
        <p className={titleClasses}>{title}</p>
        {message&&<p className='alert-message'>{message}</p>}
        {closable&&<span className='alert-close' onClick={handleClose}>X</span>}
      </div>}
    </>
  )
}

Alert.defaultProps = {
  closable: true,
  type: AlertType.Default
}

export default Alert