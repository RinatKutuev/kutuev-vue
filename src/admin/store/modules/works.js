export default{
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_WORKS(state, newWork) {
            state.data.push(newWork)
        },
        SET_WORKS(state, works){
            state.data = works
            console.log(works);
        }
    },
    actions:{
        async add({commit}, newWork){
            console.log(newWork);
            const formData = new FormData();

            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item])
            })
            try{
                const {data} = await this.$axios.post("/works", formData);
                commit("ADD_WORK", data);
            }catch(error){
                console.log(error);
            }
        },
        async fetch({commit}){
            try{
                const {data} = await this.$axios.get("/works/432");
                commit("SET_WORKS", data);
            }catch(error){
                console.log(error);
            }
        }
    }
}