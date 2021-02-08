<template>
  <div class="app-container">
    <router-view name="header" />
    <router-view />
    <div :class="['notify-container', {active: isTooltipShown}]">
      <div class="notification">
        <notification 
          :text="tooltipText"
          :type="tooltipType"
          @click="hideTooltip"
        />
        </div>
    </div>
  </div>
</template>

<script>
import notification from "./components/notification"
import { mapState, mapActions } from "vuex"
export default {
  components: {
    notification
  },
  methods:{
    ...mapActions({
      hideTooltip: "tooltips/hide"
    })
  },
  computed:{
    ...mapState("tooltips", {
      isTooltipShown: (state) => state.isShown,
      tooltipText: (state) => state.text,
      tooltipType: (state) => state.type
    })
  }
}
</script>>
<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&display=swap');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss"></style>