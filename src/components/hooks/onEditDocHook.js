import React from 'react'

const onEditDocHook = (Model) => {
  const [editedDoc, editedDocSet] = React.useState(null)
  let onEditDocEventListener = null

  React.useEffect(() => {
    if (editedDoc === null) {
      onEditDocEventListener = Model.on('edit', (eventObj) => {
        const { error, /* document, foundation, */ data } = eventObj
        if (error) {
          return
        }
        editedDocSet(data)
      })
    }
  }, [editedDoc])

  React.useEffect(() => {
    return () => {
      // stop to listen events on component unmount
      Model.stopListenTo(onEditDocEventListener)
      onEditDocEventListener = null
    }
  }, [])
  return [editedDoc]
}

export default onEditDocHook
