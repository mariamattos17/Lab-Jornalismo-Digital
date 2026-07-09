/**
 * Carrega metadados das páginas a partir de data/paginas.json.
 * Útil para futuras integrações (Cloudinary, busca, etc.).
 */
async function loadPaginas() {
  const response = await fetch("data/paginas.json");

  if (!response.ok) {
    throw new Error("Não foi possível carregar data/paginas.json");
  }

  return response.json();
}

if (typeof window !== "undefined") {
  window.LabJornalismo = {
    loadPaginas
  };
}
