// importar componentes hijos para que app/app.html pueda pintarlos

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Imports de componentes creados ----------------------------------
import { Header } from './components/header/header';
import { Players } from './components/players/players';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Players], // Array de imports de componentes para al app
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('equipobasket');
}
