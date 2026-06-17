const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function validarColaborador(data) {
  const response = await fetch(`${apiUrl}/api/validar-colaborador`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Erro ao validar colaborador");
  }

  return response.json();
}

export async function buscarDocumentos(cpf, tipo) {
  const response = await fetch(`${apiUrl}/api/documentos/${cpf}?tipo=${tipo}`);

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Erro ao buscar documentos");
  }

  return response.json();
}
