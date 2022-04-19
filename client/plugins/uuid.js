import {v4 as uuid} from 'uuid'

export default (ctx, inject) => {
    inject('uuid', uuid)
}
