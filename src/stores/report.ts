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
      return this.reports.filter((report) => {
        const matchesType =
          this.filterType === "" ||
          this.filterType.toLowerCase() === "all" ||
          report.transactionType.toLowerCase() === this.filterType.toLowerCase();
        const matchesSearch =
          this.searchQuery === "" ||
          report.accountHolder
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        return matchesType && matchesSearch;
      });
    },
  },
});
