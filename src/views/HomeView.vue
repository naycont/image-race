<script setup lang="ts"></script>

<template>
  <div class="d-flex justify-center flex-column align-center">
    <span class="text-h4 text-center mb-4">
      Ayuda a los vendedores de
      <span class="text-primary">Alegra</span>
      a ganar una carrera.
    </span>

    <div class="my-4">
      <p class="d-flex flex-column">
        <span>
          <v-avatar color="primary" variant="outlined">
            <span class="text-h5">1</span>
          </v-avatar>
          Usa el buscador para encontrar imagenes que cada vendedor te presentará
        </span>

        <span class="mt-3">
          <v-avatar color="primary" variant="outlined">
            <span class="text-h5">2</span>
          </v-avatar>
          Elige la imagen que mas te guste y el vendedor obtendra 3 puntos
        </span>

        <span class="mt-3">
          <v-avatar color="primary" variant="outlined">
            <span class="text-h5">3</span>
          </v-avatar>
          Continua buscando imágenes y el ganador será el que alcance 20 puntos.
        </span>
      </p>
    </div>

    <span class="my-4 text-secondary text-h6">Que comience la carrera!</span>
    <v-btn color="primary">Empezar</v-btn>
  </div>
</template>
