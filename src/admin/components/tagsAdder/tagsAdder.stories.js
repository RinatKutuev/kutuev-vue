import tagAdder from "./tagsAdder.vue"


export default{
    title: "tagAdder",
    components: {tagAdder}
}

export const defaultView = () => ({
    components: {tagAdder},
    data(){
        return{
            tags: "One, two, three",
        }
    },
    template:`
        <tag-adder v-model="tags" />
    `
})