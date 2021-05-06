import React from "react"

export default function Section(id, title, content) {
  return(
    <div key={id} id={id}>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  )
}