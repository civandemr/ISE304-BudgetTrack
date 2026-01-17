<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h3>Edit Expense</h3>

      <form @submit.prevent="submit">
        <label>Title</label>
        <input v-model.trim="form.title" required />

        <label>Amount</label>
        <input v-model.number="form.amount" type="number" step="0.01" min="0" required />

        <label>Category</label>
        <select v-model="form.category" required>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <label>Date</label>
        <input v-model="form.date" type="date" required />

        <p v-if="error" class="error">{{ error }}</p>

        <div class="actions">
          <button type="button" @click="$emit('close')">Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditExpenseModal",
  props: { expense: { type: Object, required: true } },
  data() {
    return {
      form: {
        title: this.expense.title ?? "",
        amount: this.expense.amount ?? 0,
        category: this.expense.category ?? "Other",
        date: (this.expense.date || "").slice(0, 10),
      },
      error: "",
    };
  },
  methods: {
    submit() {
      this.error = "";
      if (!this.form.title) return (this.error = "Title is required.");
      if (!this.form.amount || Number(this.form.amount) <= 0)
        return (this.error = "Amount must be a positive number.");

      this.$emit("save", { ...this.expense, ...this.form });
    },
  },
};
</script>

<style scoped>
.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display:flex; justify-content:center; align-items:center; padding:16px; }
.modal { background:#fff; width:420px; max-width:100%; border-radius:10px; padding:16px; }
.actions { display:flex; justify-content:flex-end; gap:8px; margin-top:12px; }
.error { color:#b00020; margin-top:8px; }
label { display:block; margin-top:10px; font-weight:600; }
input, select { width:100%; padding:8px; margin-top:6px; }
</style>
