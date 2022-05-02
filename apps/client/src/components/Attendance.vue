<template>
  <Dropdown
    v-model="selectedCity"
    :options="cities"
    optionLabel="name"
    placeholder="Select a City"
  />
</template>
