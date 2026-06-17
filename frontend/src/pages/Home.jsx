import { useState } from "react";
import DocumentSelector from "../components/DocumentSelector";
import ValidationForm from "../components/ValidationForm";
import DocumentList from "../components/DocumentList";
import { validarColaborador, buscarDocumentos } from "../services/api";

function Home() {
  const [tipoDocumento, setTipoDocumento] = useState("IR");
  const [loading, setLoading] = useState(false);
  const [documentos, setDocumentos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const handleValidacao = async (dados) => {
    setLoading(true);
    setMensagem("");
    setDocumentos([]);

    try {
      await validarColaborador(dados);
      const documentosEncontrados = await buscarDocumentos(
        dados.cpf,
        tipoDocumento,
      );
      setDocumentos(documentosEncontrados);
      if (!documentosEncontrados || documentosEncontrados.length === 0) {
        setMensagem("Documento não localizado.");
      }
    } catch (error) {
      setMensagem(
        error.message || "Erro ao conectar com o servidor. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">
            Portal de Consulta de Documentos
          </h1>
          <p className="mt-3 text-slate-600">
            Valide sua identidade e acesse seus documentos disponíveis.
          </p>
        </header>

        <section className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <DocumentSelector
              tipoSelecionado={tipoDocumento}
              onChange={setTipoDocumento}
            />
            <ValidationForm onSubmit={handleValidacao} loading={loading} />
            {mensagem && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                {mensagem}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Documentos disponíveis
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Após a validação, abra os links temporários abaixo.
              </p>
            </div>
            <DocumentList documentos={documentos} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
