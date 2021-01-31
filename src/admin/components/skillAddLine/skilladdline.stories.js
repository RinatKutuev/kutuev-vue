import skilladdline from "./skilladdline.vue"

export default {
    title: "skilladdline",
    components: {skilladdline}
}

export const defaultView = () => ({
    components: {skilladdline},
    template: `
        <skilladdline />
    `
})