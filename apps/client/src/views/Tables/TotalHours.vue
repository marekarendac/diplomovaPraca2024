<script setup>
import ProjectsMonthly from "@/components/Tables/projectsMonthly.vue";
import EmployeesMonthly from "@/components/Tables/employeesMonthly.vue";
import EmployeesInProjects from "@/components/Tables/employeesInProjects.vue";
</script>
<template>
  <TabView>
    <TabPanel header="PROJEKTY">
      <div>
        <ProjectsMonthly />
      </div>
    </TabPanel>
    <TabPanel header="ZAMESTNANCI">
      <div>
        <EmployeesMonthly />
      </div>
    </TabPanel>
    <TabPanel header="ZAMESTNANCI V PROJEKTOCH">
      <div><EmployeesInProjects /></div>
    </TabPanel>
  </TabView>
</template>

<style></style>
