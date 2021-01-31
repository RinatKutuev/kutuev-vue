<template>
    <card slim>
        <edit-line
        slot="title"
        v-model="categoryTitle"
        :editModeByDefault="empty"
        @remove="$emit('remove', $event)"
        >
        </edit-line>
        <template slot="content">
            <ul class="skills" v-if="empty === false">
                <li class="item" v-for="skill in skills" :key="skill.id">
                    <skill
                    :skill="skill"
                    @remove="$emit('remove-skill', $event)"
                    @approve="$emit('edit-skill', $event)"
                    />
                </li>
            </ul>
            <div class="bottom-line">
                <skilladdline :blocked="empty" />
            </div>
        </template>
    </card>
</template>

<script>
import card from "../Card/card.vue"
import editLine from "../editLine/editLine.vue"
import skill from "../skill/skill.vue"
import skilladdline from "../skillAddLine/skilladdline.vue"

export default {
    components: {
        card,
        editLine,
        skill,
        skilladdline
    },
    props: {
        empty: Boolean,
        title: {
           type: String,
           default: ""
        },
        skills: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return{
            categoryTitle: this.title
        }
    }
}
</script>

<style lang="postcss" scoped src="./category.pcss"></style>