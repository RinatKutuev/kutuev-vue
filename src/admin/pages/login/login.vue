<template>
    <div class="login-page-component">
        <div class="login-content">
            <form class="form" @submit.prevent="handleSubmit">
                <div class="form-title">
                    Авторизация
                </div>
                <div class="form-row">
                    <app-input
                    title="Логин"
                    v-model="user.name"
                    icon="user"
                    :errorMessage="validation.firstError('user.name')"
                    />
                </div>
                <div class="form-row">
                    <app-input
                    title="Пароль"
                    v-model="user.password"
                    icon="key"
                    type="password"
                    :errorMessage="validation.firstError('user.password')"
                    />
                </div>
                <div class="btn">
                    <app-button :disabled="isDisabled" typeAttr="submit" title="Войти" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import appInput from "../../components/input";
import appButton from "../../components/button"
import { Validator, mixin } from 'simple-vue-validator'
import $axios from "../../requests"
import { mapActions } from "vuex"

// const baseUrl = "https://webdev-api.loftschool.com";

export default {
    mixins: [mixin],
    validators:{
        'user.name': function(value){
            return Validator.value(value).required('Введите логин')
        },
        'user.password': function(value){
            return Validator.value(value).required('Введите пароль')
        }
    },
    components:{
        appInput, appButton
    },
    data: () => ({
        user:{
            name: "",
            password: ""
        },
        isDisabled: false
    }),
    methods:{
        ...mapActions({
            showTooltip: "tooltips/show"
        }),
        handleSubmit(){
            this.$validate().then((isValid) => {
                if(!isValid) return;

                this.isDisabled = true

                $axios.post("/login", this.user).then(response => {
                    const token = response.data.token
                    localStorage.setItem("token", token);
                    $axios.defaults.headers["Autorization"] = `Bearer ${token}`;
                    this.$router.replace('/');
                    
                })
                .catch((error) => {
                    this.showTooltip({
                        text: error.response.data.error,
                        type: "error"
                    })
                })
                .finally(() => {
                    this.isDisabled = false
                })

            })
        }
    },
    
}
</script>

<style lang="postcss" scoped src="./login.pcss"> </style>