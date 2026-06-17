import { useState } from "react";

function ValidationForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    matricula: "",
    cpf: "",
    nascimento: "",
    admissao: "",
  });

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Matrícula
        </label>
        <input
          type="text"
          value={formData.matricula}
          onChange={handleChange("matricula")}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white"
          placeholder="Digite a matrícula"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700">
          CPF
        </label>
        <input
          type="text"
          value={formData.cpf}
          onChange={handleChange("cpf")}
          className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white"
          placeholder="000.000.000-00"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Data de Nascimento
          </label>
          <input
            type="text"
            value={formData.nascimento}
            onChange={handleChange("nascimento")}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white"
            placeholder="DD/MM/AAAA"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Data de Admissão
          </label>
          <input
            type="text"
            value={formData.admissao}
            onChange={handleChange("admissao")}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white"
            placeholder="DD/MM/AAAA"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {loading ? "Validando..." : "Enviar"}
      </button>
    </form>
  );
}

export default ValidationForm;
