// import voodux
import voodux from 'voodux'

import {
  sha512
}
from 'js-sha512'

const schema = new voodux.Foundation.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // index: true,
    default: sha512.hex('123')
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  }
})

schema.set('toJSON', {
  getters: true,
  virtuals: true
})

export default schema
