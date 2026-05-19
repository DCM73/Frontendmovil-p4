// comportamiento del componente con TS, se importa en app/app.ts para que se pueda mostrar

import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
