import Vue from 'vue';
import Vuex from 'vuex';
import getCookie from '../public/js/cookie.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        count:1,
        // myHeader: {
        //     'Content-Type': 'application/json',
        //     'Authorization': ""
        // }
    },
    getters:{
        getStateCount:function(state){
            return state.count+1
        }
    },
});
export default store
