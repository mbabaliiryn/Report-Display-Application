<template>
  <v-container fluid>
    <v-card
      class="pa-4"
      style="background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)"
    >
      <v-card-title class="headline text-center" style="color: #1976d2">
        Financial Reports
      </v-card-title>

      <!-- Search and Filter Section -->
      <v-row class="mb-4">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="store.searchQuery"
            label="Search by Account Holder"
            color="primary"
            outlined
            clearable
            class="search-bar"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="store.filterType"
            :items="transactionTypes"
            label="Filter by Transaction Type"
            color="primary"
            outlined
            clearable
          ></v-select>
        </v-col>
      </v-row>

      <!-- Data Table -->
      <v-data-table
        :headers="headers.value"
        :items="filteredReports"
        item-value="TransactionId"
        class="elevation-1 table"
        dense
        hide-default-footer
        style="width: 100%; max-width: none;"
      >
        <template v-slot:no-data>
          <v-alert type="info" color="primary">
            No reports found. Try changing your filters or search query.
          </v-alert>
        </template>
      </v-data-table>

      <!-- Export Buttons -->
      <v-row class="mt-4" justify="center">
        <v-btn color="primary" @click="exportToCSV" class="mr-2">
          Export to CSV
        </v-btn>
        <v-btn color="secondary" @click="exportToPDF" class="mr-2">
          Export to PDF
        </v-btn>
        <v-btn color="success" @click="exportToExcel">
          Export to Excel
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useReportStore } from "../stores/report";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default defineComponent({
  setup() {
    const store = useReportStore();

    const headers = [
      { text: "Transaction ID", value: "TransactionId" },
      { text: "Date", value: "date" },
      { text: "Account Holder Name", value: "accountHolder" },
      { text: "Transaction Type", value: "transactionType" },
      { text: "Amount", value: "amount" },
      { text: "Account Balance", value: "accountBalance" },
    ];

    const transactionTypes = ["All", "Deposit", "Withdrawal", "Loan Payment"];

    const filteredReports = computed(() => store.getFilteredReports());

    const exportToCSV = () => {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        ["Transaction ID,Date,Account Holder,Transaction Type,Amount,Account Balance"]
          .concat(
            store.reports.map((r) =>
              [
                r.TransactionId,
                r.date,
                r.accountHolder,
                r.transactionType,
                r.amount,
                r.accountBalance,
              ].join(",")
            )
          )
          .join("\n");
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", "reports.csv");
      link.click();
    };

    const exportToPDF = () => {
      const doc = new jsPDF();
      doc.text("Financial Reports", 10, 10);
      const rows = store.reports.map((r) => [
        r.TransactionId,
        r.date,
        r.accountHolder,
        r.transactionType,
        r.amount,
        r.accountBalance,
      ]);
      doc.autoTable({
        head: [["Transaction ID", "Date", "Account Holder", "Transaction Type", "Amount", "Account Balance"]],
        body: rows,
      });
      doc.save("reports.pdf");
    };

    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(store.reports);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
      XLSX.writeFile(workbook, "reports.xlsx");
    };

    return {
      store,
      headers,
      transactionTypes,
      filteredReports,
      exportToCSV,
      exportToPDF,
      exportToExcel,
    };
  },
});
</script>

<style scoped>
/* No changes to styles */
</style>
