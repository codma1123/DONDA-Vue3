<template>
    <div class="price">
        <v-card-subtitle>
            <slot name="title"></slot>        
        </v-card-subtitle>
        <span v-font-size="35" class="ml-5">
            <number 
                :from="0"
                :to="to"
                :duration="duration"
                :easing="EASING"
                :format="format"
                :delay="delay"
            />
        </span>
    </div>
</template>

<script lang="ts" setup>import { onMounted } from 'vue';


const EASING = 'Power4.easeOut'

interface StockPriceTemplateProps {
    delay?: number
    format: (price: number) => string
    to: number
    duration: number | undefined
}

const { delay, format, to, duration } = defineProps<StockPriceTemplateProps>()


onMounted(() => {

})


</script>


<style lang="scss" scoped>
.price {
  width: 180px;
}
</style>
