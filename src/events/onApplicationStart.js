/* global */
export default async function (eventObj) {
  const { /* data,  foundation, */ error } = eventObj
  if (error) {
    throw new Error(`Error starting foundation stack: ${error}`)
  }
}
