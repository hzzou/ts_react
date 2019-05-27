
//typescript里不能使用import,而使用require
//const actionType = require('../constants/actionType')
import * as actionType from '../constants/actionType';

interface actionProps{
  playload:any;
  type:string;
}

let hotList = (state:any[]=[],action:actionProps)=>{
  switch(action.type){
    case actionType.SEARCH_HOT:
      return action.playload
    default:
      return state;
  }
}

export {hotList}