export const API = import.meta.env.VITE_BACKEND_URL;

export async function inviaContatto(data: { nome: string; email: string }) {
  const res = await fetch(`${API}/api/contatti`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Errore nel contatto");
  return res.json();
}
