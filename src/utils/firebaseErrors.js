export const firebaseErrors = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "El email ya está en uso";
    case "auth/user-not-found":
      return "El usuario no existe";
    case "auth/wrong-password":
      return "La contraseña es incorrecta";
    default:
      return "Error desconocido";
  }
};
