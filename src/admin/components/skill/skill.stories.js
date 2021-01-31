import skill from "./skill.vue"
import {action, actions} from "@storybook/addon-actions"

const methods = {
    onApprove: action("onApprove"),
    onRemove: action("onRemove")
}

export default{
    title: "skill",
    components: {skill}
}

export const defaultVuew = () => ({
    components: {skill},
    data(){
        return{
            skill:{
                id: 0,
                title: "test",
                percent: 80
            }
        }
    },
    template: `
        <skill @approve="onApprove" @remove="onRemove" :skill="skill" />
    `,
    methods
})