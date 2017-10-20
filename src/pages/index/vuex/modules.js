
import popup from 'popup'

const INIT_STORE = 'INIT_STORE'
const ALERT_SOMETHING = 'ALERT_SOMETHING'



// 需要维护的状态
const state = {
  notes: [],
  activeNote: {},
  show: '',
  number:'这里是我的number'
};

const mutations = {
    // 初始化 state
    [INIT_STORE](state, data) {
    	state.number = data.number;
    },
    //弹出一些东西
    [ALERT_SOMETHING](state,mun) {
      popup.alert({type:'error','title':"这里面是我的第一个弹出层",maskHide:false});
    },

};

export default {
  state,
  mutations
}

