<script lang="ts" setup>
import ActionButton from '@/components/ui/ActionButton.vue'
</script>
<template>
  <div>
    <div class="d-flex justify-center text-center text-h2 my-4">
      <span class="text-h4">
        Ayuda a los vendedores de
        <span class="text-primary">Alegra</span>
        a ganar una carrera.
      </span>
    </div>

    <div class="d-flex justify-center align-center mt-8">
      <div class="d-flex flex-column">
        <span>
          <v-avatar color="primary" variant="outlined" class="mr-2">
            <span class="text-h5">1</span>
          </v-avatar>
          Usa el buscador para encontrar imagenes que cada vendedor te presentará
        </span>
        <span class="mt-3">
          <v-avatar color="primary" variant="outlined" class="mr-2">
            <span class="text-h5">2</span>
          </v-avatar>
          Elige la imagen que mas te guste y el vendedor obtendra 3 puntos
        </span>

        <span class="mt-3">
          <v-avatar color="primary" variant="outlined" class="mr-2">
            <span class="text-h5">3</span>
          </v-avatar>
          Continua buscando imágenes y el ganador será el que alcance 20 puntos
        </span>
      </div>
    </div>

    <div class="d-flex justify-center align-center flex-column mt-4">
      <span class="my-4 text-accent text-h5">Que comience la carrera!</span>
      <ActionButton text="Empezar" />
    </div>
  </div>
</template>
