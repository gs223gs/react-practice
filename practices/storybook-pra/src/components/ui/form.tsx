import * as React from "react"
import { Button } from "./button"
import { Input } from "./input"

const Form = () => {
  return (
    <form className="">
      <Input type="text" /><br/>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export { Form }