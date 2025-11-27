import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// ✅ Import correcto del módulo de Snackbar
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { MapaCentrosComponent } from './components/mapa-centros/mapa-centros.component';


@NgModule({
  declarations: [
    AppComponent,
    MapaCentrosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // ⚠️ IMPORTANTE: Este módulo es NECESARIO
    FormsModule,
    MatSnackBarModule  // ✅ Agregar aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
