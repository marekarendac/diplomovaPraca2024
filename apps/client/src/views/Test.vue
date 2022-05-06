<script setup>
import AttendanceReport from "@/components/Tables/AttendanceReport.vue";
import Total from "@/components/Cards/Total.vue";
</script>
<template>
  <div class="card">
    <div class="flex card-container indigo-container">
      <div class="flex-1">
        <AttendanceReport />
      </div>
      <div class="card">
        <div>
          <div class="inline-block text-left w-20rem ml-4 mr-4 mt-4">
            <Total />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
