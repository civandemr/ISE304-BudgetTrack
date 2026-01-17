<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal-box">
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
const toYYYYMMDD = (value) => {
  if (!value) return ""
  // If ISO string: "2026-01-17T..."
  if (typeof value === "string") return value.slice(0, 10)
  // If Date object
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ""
  return d.toISOString().slice(0, 10)
}

export default {
  name: "EditExpenseModal",
  props: { expense: { type: Object, required: true } },
  emits: ["close", "save"],
  data() {
    return {
      form: {
        title: this.expense.title ?? "",
        amount: this.expense.amount ?? 0,
        category: this.expense.category ?? "Other",
        date: toYYYYMMDD(this.expense.date),
      },
      error: "",
    }
  },
  mounted() {
    this._onKeydown = (e) => {
      if (e.key === "Escape") this.$emit("close")
    }
    window.addEventListener("keydown", this._onKeydown)
  },
  unmounted() {
    window.removeEventListener("keydown", this._onKeydown)
  },
  methods: {
    submit() {
      this.error = ""
      if (!this.form.title) return (this.error = "Title is required.")
      if (!this.form.amount || Number(this.form.amount) <= 0)
        return (this.error = "Amount must be a positive number.")

      this.$emit("save", { ...this.expense, ...this.form })
    },
  },
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  z-index: 9999; 
}

.modal-box {
  background: #ffffff;
  width: 420px;
  max-width: 100%;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.error {
  color: #b00020;
  margin-top: 8px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: 600;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 6px;
}
</style>
