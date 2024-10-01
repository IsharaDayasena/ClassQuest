import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleClasses = () => {
    const course = useLoaderData();
    console.log(course)
  return (
    <div>SingleClasses</div>
  )
}

export default SingleClasses