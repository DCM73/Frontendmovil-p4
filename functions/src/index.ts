import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

initializeApp();

// gatillo de acción en la colección players
export const alModificarJugadores = onDocumentWritten("players/{playerId}", async (event) => {
  
  const antes = event.data?.before.exists; // actualización o nuevo
  const despues = event.data?.after.exists;
  
  let tituloNotificacion = "Cambio en la plantilla";
  let cuerpoNotificacion = "Se han actualizado los datos del juador";

  if (!antes && despues) {
    const nuevoJugador = event.data?.after.data(); // nuevo jugador
    tituloNotificacion = "Nuevo jugador";
    cuerpoNotificacion = `${nuevoJugador?.nombre} ${nuevoJugador?.apellidos} se ha unido al equipo.`;
  } else if (antes && despues) {

    const jugadorEditado = event.data?.after.data(); // actualización
    tituloNotificacion = "Jugador actualizado";
    cuerpoNotificacion = `Los datos de ${jugadorEditado?.nombre} han sido modificados.`;
  } else if (antes && !despues) {
    tituloNotificacion = "Baja en el equipo"; // delete
    cuerpoNotificacion = "Jugador eliminado";
  }

  const mensaje = { // paquete de notificación
    notification: {
      title: tituloNotificacion,
      body: cuerpoNotificacion,
    },
    topic: "todos", 
  };

  try {
    const response = await getMessaging().send(mensaje);
    console.log("Notificación enviada", response);
  } catch (error) {
    console.error("Error al enviar la notificación", error);
  }
});
