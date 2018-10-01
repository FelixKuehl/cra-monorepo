import React, {Component} from 'react'
import {render} from 'react-dom'

import {Button} from '../../src'

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>@jmm/ui-nwb Demo</h1>
        <Button variant="raised" color="light">
          Hallo
        </Button>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
