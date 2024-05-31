import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Asegúrate de que la barra de desplazamiento esté en la parte superior
    window.scrollTo(0, 0);
    this.renderer.setStyle(document.body, 'overflow', 'hidden'); // Evitar el desplazamiento
    this.renderer.setStyle(document.documentElement, 'overflow', 'hidden'); // Evitar el desplazamiento en el documento
  }

  ngAfterViewInit(): void {
    // Espera un pequeño delay para asegurarte de que el DOM esté completamente cargado
    setTimeout(() => {
      this.organizeCollageItems();
    }, 500); // Delay reducido para iniciar la organización más rápido
  }

  organizeCollageItems(): void {
    const collageItems = document.querySelectorAll('.collage-item');
    collageItems.forEach((item, index) => {
      setTimeout(() => {
        (item as HTMLElement).classList.remove('collage-item');
        (item as HTMLElement).classList.add('stamp-animation');
        if (index === collageItems.length - 1) {
          const mainContainer = document.querySelector('.main-container') as HTMLElement;
          if (mainContainer) {
            mainContainer.style.opacity = '1';
          }
          // Permitir el desplazamiento después de la animación
          this.renderer.setStyle(document.body, 'overflow', 'auto');
          this.renderer.setStyle(document.documentElement, 'overflow', 'auto'); // Permitir el desplazamiento en el documento
        }
      }, index * 200); // Delay para cada elemento
    });
  }
}
