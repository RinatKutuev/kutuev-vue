<template>
    <div class="work-form-component">
        <form @submit.prevent="handleSubmit">
            <card title="Редактирование работы">
                <template slot="content">
                    <div class="edit-work">
                        <div class="edit-work__col">
                            <label
                                :style="{backgroundImage: `url(${newWork.preview})`}"
                                :class="['uploader', {active: newWork.preview}, {hovered: hovered}]"
                                @dragover="handleDragOver"
                                @dragleave="hovered = false"
                                @drop="handleChange"
                            >
                                <div class="file">
                                    <span>Перетащите или загрузите<br>для загрузки изображения</span>
                                    <appButton
                                        typeAttr="file"
                                        title="ЗАГРУЗИТЬ"
                                        @change="handleChange"
                                    />
                                </div>
                            </label>
            
                        </div>
                        <div class="edit-work__col">
                            <div class="form">
                                <div class="form-row">
                                    <app-input v-model="newWork.title" title="Название" />
                                </div>
                                <div class="form-row">
                                    <app-input v-model="newWork.link" title="Ссылка" />
                                </div>
                                <div class="form-row">
                                    <app-input v-model="newWork.description" title="Описание" fieldType="textarea" />
                                </div>
                                <div class="form-row">
                                    <tags-adder v-model="newWork.techs" />
                                </div>
                                <div class="form-btns">
                                    <a href="javascript:;" @click="$emit('cancel')">Отмена</a>
                                    <app-button title="Сохранить" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </card>
        </form>
    </div>
</template>

<script>
import appButton from "../../components/button/button.vue";
import card from "../../components/Card/card";
import appInput from "../../components/input/input";
import tagsAdder from "../../components/tagsAdder/tagsAdder";
import { mapActions } from "vuex";
export default {
    components:{
        appButton,
        card,
        appInput,
        tagsAdder,
    },
    data(){
        return{
            hovered: false,
            newWork:{
                title: "",
                link: "",
                description: "",
                techs: "",
                photo: {},
                preview: ""
            }
        }
    },
    methods: {
        ...mapActions({
            addNewWork: "works/add"
        }),
        handleDragOver(e){
            e.preventDefault();
            this.hovered = true
        },
        async handleSubmit(){
            await this.addNewWork(this.newWork)
        },
        handleChange(event) {
            event.preventDefault();

            const file = event.dataTransfer 
            ? event.dataTransfer.files[0] 
            : event.target.files[0];
            this.newWork.photo = file;
            this.renderPhoto(file)

            this.hovered = false
        },
        renderPhoto(file){
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onloadend = () => {
                this.newWork.preview = reader.result
            }
        }
    }
}
</script>

<style lang="postcss" scoped src="./workForm.pcss"></style>