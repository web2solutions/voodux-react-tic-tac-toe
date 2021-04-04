// import voodux
import voodux from 'voodux'

const schema = new voodux.Foundation.Schema({
  player1: {
    type: Number,
    required: true,
    default: 0,
    index: true
  },
  player2: {
    type: Number,
    required: true,
    default: 0,
    index: true
  },
  matches: {
    type: [],
    required: true
  },
  winner: {
    type: Number,
    required: true,
    default: 0,
    index: true
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  status: {
    type: String,
    required: true,
    index: true,
    default: 'open'
  },
})

schema.set('toJSON', {
  getters: true,
  virtuals: true
})

export default schema
