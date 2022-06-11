import { useState, useEffect } from 'react'
const Checkbox = ({ className = '', change = true, children = '', id = '', name = '', checked = false, data, onChange = console.log }) => {
  const [check, setCheck] = useState(checked)
  useEffect(() => {
  }, [checked])
  return (
    <label className={`checkbox ${className}`} {...data}>
      <input type='checkbox' id={id} name={name} checked={checked} onChange={onChange} />
      {children}
    </label>
  )
}
export default Checkbox