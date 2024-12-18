<template>
    <v-container fluid>
      <v-card class="pa-4" style="background-color: #f9f9f9; 
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
      ">
        <v-card-title class="headline text-center" style="color: #1976d2">
          Financial Reports
        </v-card-title>
  
        <!-- Search and Filter Section -->
        <v-row class="mb-4">
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="searchQuery"
              label="Search by Account Holder"
              color="primary"
              outlined
              clearable
              class="search-bar"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="filterType"
              :items="transactionTypes"
              label="Filter by Transaction Type"
              color="primary"
              outlined
              clearable
            ></v-select>
          </v-col>
        </v-row>

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
  
        <!-- Data Table -->
        <v-data-table
          :headers="headers"
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
  
       
      </v-card>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, ref } from "vue";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import * as XLSX from "xlsx";
  
  export default defineComponent({
    setup() {
      const searchQuery = ref("");
      const filterType = ref("All");
  
      const headers = ref([
        { text: "Transaction ID", value: "TransactionId" },
        { text: "Date", value: "date" },
        { text: "Account Holder Name", value: "accountHolder" },
        { text: "Transaction Type", value: "transactionType" },
        { text: "Amount", value: "amount" },
        { text: "Account Balance", value: "accountBalance" },
      ]);
  
      const transactionTypes = ref(["All", "Deposit", "Withdrawal", "Loan Payment"]);
  
      // Mock Data: Replace with real API call in production
      const reports = ref([
        {
          TransactionId: "TX1234",
          date: "2024-12-12",
          accountHolder: "Irene",
          transactionType: "Deposit",
          amount: 5000,
          accountBalance: 20000,
        },
        {
          TransactionId: "TX1235",
          date: "2024-12-13",
          accountHolder: "John",
          transactionType: "Withdrawal",
          amount: 2000,
          accountBalance: 18000,
        },
        {
          TransactionId: "TX1236",
          date: "2024-12-14",
          accountHolder: "Alice",
          transactionType: "Loan Payment",
          amount: 1000,
          accountBalance: 25000,
        },
      ]);
  
      // Computed property for filtered reports
      const filteredReports = computed(() => {
        return reports.value.filter((report) => {
          const matchesSearch = report.accountHolder
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
          const matchesFilter =
            filterType.value === "All" || report.transactionType === filterType.value;
          return matchesSearch && matchesFilter;
        });
      });
  
      // CSV Export
      const exportToCSV = () => {
        const csvContent =
          "data:text/csv;charset=utf-8," +
          ["Transaction ID,Date,Account Holder,Transaction Type,Amount,Account Balance"]
            .concat(
              reports.value.map((r) =>
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
  
      // PDF Export
      const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Financial Reports", 10, 10);
        const rows = reports.value.map((r) => [
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
  
      // Excel Export
      const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(reports.value);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
        XLSX.writeFile(workbook, "reports.xlsx");
      };
  
      return {
        searchQuery,
        filterType,
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
  .v-container {
    /* margin-top: 20px; */
    /* padding: 0 10px; */
  }
  
  .v-card {
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .v-col {
    padding: 0;
  }
  
  .search-bar,
  .v-select {
    background-color: #ffffff;
  }
  
  .table {
    /* margin-top: 20px; */
    width: 100%;
  }
  
  .v-btn {
    color: white;
  }
  
  .v-btn.primary {
    background-color: #1976d2;
  }
  
  .v-btn.secondary {
    background-color: #424242;
  }
  
  .v-btn.success {
    background-color: #43a047;
  }
  
  /* Full width adjustments */
  .v-data-table {
    width: 100%;
    max-width: none;
    table-layout: auto;
  }
  </style>
  