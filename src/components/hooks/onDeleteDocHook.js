import React from 'react'
const onDeleteDocHook = (Model) => {
  const [deletedDoc, deletedDocSet] = React.useState(null)
  let onDeleteDocEventListener = null

  React.useEffect(() => {
    if (deletedDoc === null) {
      onDeleteDocEventListener = Model.on('delete', (eventObj) => {
        const { error, /* document, foundation, */ data } = eventObj
        if (error) {
          return
        }
        deletedDocSet(data)
      })
    }
  }, [deletedDoc])

  React.useEffect(() => {
    return () => {
      // stop to listen events on component unmount
      Model.stopListenTo(onDeleteDocEventListener)
      onDeleteDocEventListener = null
    }
  }, [])
  return [deletedDoc]
}

export default onDeleteDocHook
