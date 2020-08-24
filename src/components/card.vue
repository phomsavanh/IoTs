<template>
  <div>
        <v-card max-width="344" class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="grey"> {{avar}} </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-black">{{title}}</v-list-item-title>
              <v-list-item-subtitle>{{subtitle}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        <slot></slot>

        </v-card>  
  </div>
</template>

<script>
export default {
props:['avar', 'title', 'subtitle']
}
</script>

<style>

</style>