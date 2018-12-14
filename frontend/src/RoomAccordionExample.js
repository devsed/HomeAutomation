import React from 'react'
import { Accordion } from 'semantic-ui-react'

const room1Panels = [
  { key: 'panel-1a', title: 'Device 1A', content: 'Device 1A Contents' },
  { key: 'panel-1b', title: 'Device 1B', content: 'Device 1B Contents' },
]

const Room1Content = (
  <div>
    <Accordion.Accordion panels={room1Panels} />
  </div>
)

const room2Panels = [
  { key: 'panel-2a', title: 'Device 2A', content: 'Device 2A Contents' },
  { key: 'panel-2b', title: 'Device 2B', content: 'Device 2B Contents' },
]

const Room2Content = (
  <div>
    <Accordion.Accordion panels={room2Panels} />
  </div>
)

const roomsPanels = [
  { key: 'panel-1', title: 'Room 1', content: { content: Room1Content } },
  { key: 'panel-2', title: 'Room 2', content: { content: Room2Content } },
]

const roomsPanelsContent=(
    <div>
    <Accordion.Accordion panels={roomsPanels} />
  </div>
)

const rootPanel =[
    {key:'house', title:'House', content:{content:roomsPanelsContent}}
]

const AccordionExampleNested = () =>
  <div>
    <div className="ui one column stackable center aligned page grid">
      <div className="column six wide">
        <Accordion defaultActiveIndex={0} panels={rootPanel} styled />
      </div>
    </div>
  </div>

export default AccordionExampleNested