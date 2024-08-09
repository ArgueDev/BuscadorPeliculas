import { Component, OnInit } from '@angular/core';
import { BuscadorPeliculasService } from '../../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TrailersComponent } from '../trailers/trailers.component';
import { Comentario } from '../../Models/Comentario';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit {
  mostrarAviso: boolean = true;
  detalleGenero: any;
  currentDialogRef: MatDialogRef<any> | undefined;
  detalle: any;
  detallesPeli: string = '';
  id: number | undefined;
  listaCommnet: Comentario[] = [];
  nuevoComentarioTexto: string = '';
  modoEdicion: { [key: string]: boolean } = {}; // key es el id del comentario
  comentarioEditado: Comentario | null = null;

  constructor(private api: BuscadorPeliculasService, private router: ActivatedRoute, public dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.Detalles();
    this.obtenerComentarios();
  }

  // trackById(index: number, comentario: Comentario): number {
  //   return comentario.id;
  // }
  

  obtenerComentarios(): void {
    this.api.getComentarios().subscribe({
      next: data => {
        this.listaCommnet = data
      },
      error: error => {
        alert("Ocurrió un error");
      }
    })
  }

  publicarComentario(): void {
    const nuevoComentario: Comentario = {
      id: String(this.listaCommnet.length + 1),
      user: "Christian",
      image: 'https://depor.com/resizer/6kKwxwJQ5spAoP79SOGgPaXwvSc=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/VDPUO5UNNZDRPATN77ILVWVQVI.jpg',
      comment: this.nuevoComentarioTexto,
      isAuth: true
    };

    this.api.agregarComentario(nuevoComentario).subscribe({
      next: comentario => {
        this.listaCommnet.push(comentario);
        this.nuevoComentarioTexto = '';
      },
      error: error => {
        alert('Ocurrio un error: ' + error);
      }
    });
  }

  editarComentario(): void {
    if (this.comentarioEditado) {
      this.api.actualizarComentario(this.comentarioEditado).subscribe({
        next: (comentarioActualizado) => {
          const index = this.listaCommnet.findIndex(com => com.id === comentarioActualizado.id);
          if (index !== -1) {
            this.listaCommnet[index] = comentarioActualizado;
          }
          this.modoEdicion[comentarioActualizado.id] = false; // Desactivar el modo de edición
          this.comentarioEditado = null; // Limpiar la variable de comentario editado
          alert("Comentario actualizado exitosamente");
        },
        error: (error) => {
          let mensajeError = "Ocurrió un error al actualizar el comentario";
          if (error.error && error.error.message) {
            mensajeError = error.error.message;
          } else if (error.message) {
            mensajeError = error.message;
          }
          console.error("Error:", error); // Imprime el error en la consola para depuración
          alert(mensajeError);
        }
      });
    }
  }
  

  activarEdicion(comentario: Comentario): void {
    this.modoEdicion[comentario.id] = true;
    this.comentarioEditado = { ...comentario }; // Crea una copia del comentario para editar
  }
  
  

  borrarComentario(id: string): void {
    const idStr = String(id); // Convierte el ID a string
  
    this.api.eliminarComentario(idStr).subscribe({
      next: () => {
        // Filtra la lista para eliminar el comentario con el ID especificado
        this.listaCommnet = this.listaCommnet.filter(com => com.id !== idStr);
      },
      error: error => {
        alert("Ocurrió un error al eliminar el comentario");
      }
    });
  }
  
  
  

  private Detalles(): void {
    this.router.params.subscribe(params => {
      const id = +params['id']; // Convertir el ID a número
      const tipo = this.router.snapshot.data['tipo']; // Obtener el tipo de contenido de los datos de la ruta
      if(id && tipo){
        const apiDetalles = (tipo === 'movie') ? this.api.getDetallesPelicula(id) : this.api.getDetallesSerie(id);
        apiDetalles.subscribe(
          (result: any[]) => {
            this.detalle = result;
           console.log(this.detalle);
          });
      }
    });
  }

  portadaPelicula(): string {
    return `https://image.tmdb.org/t/p/original${this.detalle.poster_path}`;
  }

  fondoPelicula(): string {
    return `https://image.tmdb.org/t/p/original${this.detalle.backdrop_path}`;
  }

  openModal(): void {
    this.mostrarAviso = false;
    const dialogRef = this.dialog.open(TrailersComponent, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
      data: { id: this.detalle.id, tipo: this.router.snapshot.data['tipo'] } // Pasa la ID y el tipo al abrir el modal
    });
  }
  

  closeModal(): void {
    // Cierra el modal si existe
    if (this.currentDialogRef) {
      this.currentDialogRef.close();
      this.currentDialogRef = undefined; // Limpia la referencia
    }
  }

  trailerSeries(id: number) {
    this.route.navigate(['trailersPeliculas', id]);
  }
}
