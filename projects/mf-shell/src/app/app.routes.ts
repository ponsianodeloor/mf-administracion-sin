import { loadRemoteEntry } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { Component, Type } from '@angular/core';
export const routes: Routes = [
    {
        path: 'ubicacion',
        loadComponent: () =>
        //@ts-ignore
          import('mfUbicacion/AppComponent').then((c) => c.AppComponent),
      },
   
];
    