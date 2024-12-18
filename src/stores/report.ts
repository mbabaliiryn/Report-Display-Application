import { defineStore } from "pinia";

export const useReportStore = defineStore("report", {
  state: () => ({
    reports: [] as any[],
    searchQuery: "",
    filterType: "",
  }),
  actions: {
    async fetchReports() {
      const { fetchReports } = await import("../utils/mockApi");
      this.reports = await fetchReports();
    },
    getFilteredReports() {
      return this.reports.filter(
        (report) =>
          report.transactionType
            .toLowerCase()
            .includes(this.filterType.toLowerCase()) &&
          report.accountHolder
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    },
  },
});
