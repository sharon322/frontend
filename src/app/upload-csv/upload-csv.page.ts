import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.page.html',
  styleUrls: ['./upload-csv.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class UploadCsvPage {
  archivoSeleccionado: File | null = null;
  mensaje = '';
  imagenes: string[] = [];

  constructor(private apiService: ApiService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.mensaje = '';
    if (!file) {
      this.archivoSeleccionado = null;
      this.mensaje = 'No se seleccionó ningún archivo.';
      return;
    }
    if (!file.name.toLowerCase().endsWith('.csv')) {
      this.mensaje = 'Por favor selecciona un archivo CSV.';
      this.archivoSeleccionado = null;
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.mensaje = 'El archivo excede el tamaño máximo de 5MB.';
      this.archivoSeleccionado = null;
      return;
    }
    this.archivoSeleccionado = file;
  }

  subirArchivo() {
    if (!this.archivoSeleccionado) {
      this.mensaje = 'Por favor selecciona un archivo CSV.';
      return;
    }

    this.apiService.uploadCsv(this.archivoSeleccionado).subscribe({
      next: (respuesta: string) => {
        this.mensaje = respuesta;
        // Busca la ruta de la imagen en la respuesta
        if (respuesta.includes('Imagen generada en:')) {
          const ruta = respuesta.split('Imagen generada en: ')[1]?.trim();
          if (ruta) {
            const nombreImagen = ruta.split('/').pop();
            if (nombreImagen) {
              this.imagenes.push(`/api/datos-estructuras/imagen/${nombreImagen}`);
            }
          }
        }
      },
      error: (error: any) => {
        this.mensaje = 'Error al subir el archivo: ' + (error?.error || 'Error desconocido');
        console.error(error);
      }
    });
  }
}