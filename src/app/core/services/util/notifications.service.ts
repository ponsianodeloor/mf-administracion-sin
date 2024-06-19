import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  success(message: string = 'La operación se ha realizado correctamente', title: string = '¡Proceso exitoso!') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  }

  error(message: string = 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.', title: string = '¡Error!') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500
    });
  }

  warning(message: string = 'Ten en cuenta esta advertencia.', title: string = '¡Advertencia!') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }

  info(message: string = 'Aquí tienes una información útil.', title: string = '¡Información!') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }

  confirmation(message: string = '¿Está seguro de realizar esta acción?', title: string = 'Confirmación'): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  // Puedes agregar más métodos según necesites para otras notificaciones.
}
