import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.store({
    state:{
       count:1
    },
    getters:{
        getStateCount:function(state){
            return state.count+1
        }
    }
});
export default store
