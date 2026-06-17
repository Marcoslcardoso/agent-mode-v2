function DocumentSelector({ tipoSelecionado, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        Selecione o tipo de documento
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className={`rounded-lg border px-4 py-3 text-left transition ${tipoSelecionado === "IR" ? "border-sky-600 bg-sky-50" : "border-slate-300 bg-white hover:border-slate-400"}`}
          onClick={() => onChange("IR")}
        >
          <p className="text-sm font-semibold">Informe de Rendimentos</p>
          <p className="text-xs text-slate-500">Documentos do tipo IR</p>
        </button>
        <button
          type="button"
          className={`rounded-lg border px-4 py-3 text-left transition ${tipoSelecionado === "BOLETO" ? "border-sky-600 bg-sky-50" : "border-slate-300 bg-white hover:border-slate-400"}`}
          onClick={() => onChange("BOLETO")}
        >
          <p className="text-sm font-semibold">Boletos do Plano de Saúde</p>
          <p className="text-xs text-slate-500">Documentos do tipo BOLETO</p>
        </button>
      </div>
    </div>
  );
}

export default DocumentSelector;
