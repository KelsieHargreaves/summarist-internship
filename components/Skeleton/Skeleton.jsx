import React from 'react'
import skeleton from './Skeleton.css'

const Skeleton = ({ width, height, circle, style }) => {
  return (
    <div className={`skeleton ${circle ? "skeleton-circle" : ""}`} style={{ width, height, ...style}}>
    </div>
  )
}

export default Skeleton
