import headline from "./headline.vue";

export default {
    title: "headline",
    components: {headline}
}

export const defaultView = () => ({
    components: {headline},
    template: `
        <headline title="Панель управления">
            <h3>Содержимое</h3>
        </headline>
    `
});

defaultView.story = {
    name: "Стандартный вид"
}
