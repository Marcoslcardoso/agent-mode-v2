function DocumentList({ documentos }) {
  if (!documentos || documentos.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        <p className="text-sm font-medium">Documento não localizado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documentos.map((documento) => (
        <div
          key={documento.id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {documento.nome}
              </p>
              <p className="text-sm text-slate-500">
                {documento.data || documento.tipo}
              </p>
            </div>
            <a
              href={documento.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Abrir
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DocumentList;
