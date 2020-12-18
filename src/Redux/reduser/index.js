import {combineReducers} from 'redux'
import {Todos} from './Todos'
import {Atur} from './Atur'
import {infoNotify} from './infoNotify'

export default combineReducers({
    Todos,
    infoNotify,
    Atur
})