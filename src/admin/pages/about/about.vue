<template>
    <div class="about-page-component">
        <div class="page-content">
            <div class="container">
				<div class="header">
					<div class="title">
						Блок «Обо мне»
					</div>
					<iconed-button
						v-if="emptyCatIsShown === false"
						type="iconed"
						title="Добавить группу"
						@click="emptyCatIsShown = true"
					/>
				</div>
            </div>
            <div class="container">
				<ul class="skills" >
					<li class="item" v-if="emptyCatIsShown">
						<category
							@remove="emptyCatIsShown = false"
							@approve="createCategory"
							empty
						/>
					</li>
					<li class="item"  v-for="category in categories" :key="category.id">
						<category
							:title="category.category"
							:skills="category.skills"
							@create-skill="createSkill($event, category.id)"
							@edit-skill="editSkill"
							@remove-skill="removeSkill"
							@remove="deleteCategory($event, category.id)"
							@approve="editCategory($event, category.id)"
						/>
					</li>
					
				</ul>
				<ul class="skills">
					<li class="double" v-if="preloader">
						<div class="preloader">
							<div class="lds-dual-ring"></div>
						</div>
					</li>
				</ul>
            </div>
        </div>
     </div>
</template>

<script>
  import button from "../../components/button/button.vue";
  import category from "../../components/category/category.vue";
  import { mapActions, mapState } from "vuex"

  export default {
    components: {
		iconedButton: button,
		category
    },

    data(){
		return {
			emptyCatIsShown: false,
			preloader: false
		}
    },

    async created(){
		this.preloader = true;
    	try{
			await this.fetchCategoryAction();
		}catch(error){
			this.showTooltip({
				text: error.message,
				type: "error"
			})
		} finally{
			this.preloader = false;
		}
    },

    computed:{
		...mapState("categories", {
			categories: state => state.data
		})
    },
    methods:{
		...mapActions({
			createCategoryAction: "categories/create",
			fetchCategoryAction: "categories/fetch",
			deleteCategoryAction: "categories/delete",
			editCategoryAction: "categories/edit",
			addSkillAction: "skills/add",
			editSkillAction: "skills/edit",
			removeSkillAction: "skills/remove",
			showTooltip: "tooltips/show"
		}),
		async createSkill(skill, categoryId){
		const newSkill = {
			title: skill.title,
			percent: skill.percent,
			category: categoryId
		}
		try{
			await this.addSkillAction(newSkill);

			skill.title = "";
			skill.percent ="";

			this.showTooltip({
				text: "Скилл создан",
				type: "success"
			})
		}catch(error){
			console.log(error);
		}
		},

		async removeSkill(skill){
			await this.removeSkillAction(skill)
			this.showTooltip({
				text: "Скилл удален",
				type: "success"
			})
		},

		async editSkill(skill){
			await this.editSkillAction(skill)
			skill.editmode = false;
		},

		async createCategory(categoryTitle){
			try{
				await this.createCategoryAction(categoryTitle)
				this.emptyCatIsShown = false
				this.showTooltip({
					text: "Категория создана",
					type: "success"
				})
			}catch(error){
				this.showTooltip({
					text: error.message,
					type: "error"
				})
			}
		},

		async editCategory(categoryTitle, categoryId){
			try{
				await this.editCategoryAction({
					id: categoryId,
					title: categoryTitle
				})
				this.showTooltip({
					text: "Категория измененна",
					type: "success"
				})

				} catch(error){
				this.showTooltip({
					text: error.message,
					type: "error"
				})
			}
		},

		async deleteCategory(category, id){
			try{
				if(confirm("Удалить категорию и все скиллы?")){
					await this.deleteCategoryAction(id)
					this.emptyCatIsShown = false
					this.showTooltip({
						text: "Категория удалена",
						type: "success"
					})
				}
				
			}catch(error){
				this.showTooltip({
					text: error.message,
					type: "error"
				})
			}
		}
      
    }
  }
</script>

<style lang="postcss" scoped src="./about.pcss"></style>