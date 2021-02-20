export default{
    namespaced: true,
    state:{
        data: []
    },
    mutations:{
        SET_CATEGORIES: (state, categories) => (state.data = categories),
        ADD_CATEGORY: (state, category) => {
            category.skills = []
            state.data.unshift(category)

        },
        EDIT_CATEGORY: (state, payload) => {
            state.data = state.data.map(item => {
                if (item.id === payload.id) {
                    const { category } = payload;
        
                    return { ...item, category };
                }
        
                return item;
            });
        },

        REMOVE_CATEGORY:(state, id) =>{
            state.data = state.data.filter(category => category.id !== id)
        },

        ADD_SKILL:(state, newSkill) => {
          state.data = state.data.map(category => {
              if(category.id === newSkill.category){
                category.skills.push(newSkill)
              }
              return category
          })
      },
        REMOVE_SKILL:(state, skillToRemove) =>{
          state.data = state.data.map(category => {
            if(category.id === skillToRemove.category){
                category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id)
            }

              return category
          })
      },

        EDIT_SKILL: (state, skillToEdit) => {
          const editSkillInCategory = category => {
            category.skills = category.skills.map(skill =>{
                return skill.id === skillToEdit.id ? skillToEdit : skill
            })
          }

          
          const findCategory = category =>{
              if(category.id === skillToEdit.category){
                editSkillInCategory(category)
              }
              return category;
          }
          state.data = state.data.map(findCategory)
      }
    },
    actions: {
        // create(store, title){
        //     this.$axios.post("/categories", {title: title}).then(response => {
        //        console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error.response)
        //     });
        // }
        async create({commit}, title){
            try{
                const responce = await this.$axios.post("/categories", {title: title})
                commit("ADD_CATEGORY", responce.data)
            }
            catch(error){
                throw new Error("Произошла ошибка!")
            }
        },
        async fetch({commit}){
            try{
                const responce = await this.$axios.get("/categories/432")
                commit("SET_CATEGORIES", responce.data)
            }
            catch(error){
                console.log(error)
            }
        },
        async edit({commit}, category){
            try{
                const responce = await this.$axios.post(`/categories/${category.id}`, {title: category.title})
                commit("EDIT_CATEGORIES", responce.data)
            }
            catch(error){
                throw new Error("Не удалось изменить категорию")
            }
        },

        async delete({commit}, id){
            try{
                const responce = await this.$axios.delete(`/categories/${id}`)
                commit("REMOVE_CATEGORY", id)
            }
            catch(error){
                throw new Error("Не удалось удалить категорию")
            }
        },
        
    }
}