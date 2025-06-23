// Função para obter o ID do cliente logado de forma centralizada
export const getClienteId = (): number | null => {
  try {
    const loggedUser = localStorage.getItem('logged_user');
    if (loggedUser) {
      const userData = JSON.parse(loggedUser);
      return userData.usuario?.codigo || null;
    }
    return null;
  } catch {
    return null;
  }
};
