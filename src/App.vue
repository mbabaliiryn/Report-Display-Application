<template>
  <v-app>
    <v-main>
      <ReportTable />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useReportStore } from "../src/stores/report";
import ReportTable from "../src/components/report.vue";

export default defineComponent({
  components: { ReportTable },
  setup() {
    const store = useReportStore();
    onMounted(() => {
      store.fetchReports();
    });
  },
});
</script>
