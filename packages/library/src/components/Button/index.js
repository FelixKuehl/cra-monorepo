// @flow
import React from 'react'
import styles from './style.module.scss'

export type componentButtonPropTypes = {
  children: Children,
  onClick?: void
}

/**
 * The main button component
 * @param {Children}				children  The Buttons Text
 * @param {void}				    onClick	  On click event
 **/
export const Button = ({children, onClick}: componentButtonPropTypes) => (
  <button className={styles.basicButton} onClick={onClick}>
    {children}
  </button>
)

export default Button
