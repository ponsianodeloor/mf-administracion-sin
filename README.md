# Proyecto Angular - Guía de Configuración Inicial

Esta guía te llevará a través de los pasos necesarios para clonar el repositorio, cambiar el nombre del proyecto en los archivos `package.json` y `angular.json`, y modificar el puerto de desarrollo en el `package.json`.

## Paso 1: Clonar el Repositorio

Primero, clona el repositorio en tu máquina local utilizando el siguiente comando de Git:

```bash
git clone http://10.1.22.164/evaluaciones/frontend/base.git
```

## Paso 2: Cambiar el Nombre y puerto del Proyecto

Navega al directorio del proyecto y abre el archivo package.json en tu editor de texto favorito. Busca la propiedad "name" y reemplázala con el nuevo nombre del proyecto.

```json
{
  "name": "mf-nuevo_nombre_del_proyecto",
  "version": "0.0.0"
  // otras propiedades
}
```

A continuación, abre el archivo angular.json y busca la propiedad projects. Dentro de esta propiedad, encontrarás el nombre del proyecto actual. Reemplázalo con el nuevo nombre del proyecto.

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "mf-NOMBRE_DEL_PROYECTO": {
      "projectType": "application",
      "schematics": {...},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "ngx-build-plus:browser",
          "options": {
            "outputPath": "dist/mf-NOMBRE_DEL_PROYECTO",
            ...
          },
          "configurations": {
          ...
            },
            "sqm": {
            },
            "dev": {
            },
            "development": {
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "ngx-build-plus:dev-server",
          "configurations": {

            "production": {
              "buildTarget": "mf-NOMBRE_DEL_PROYECTO:build:production",
              "extraWebpackConfig": "webpack.prod.config.js"
            },
            "development": {
              "buildTarget": "mf-NOMBRE_DEL_PROYECTO:build:development"
            },
            "sqm": {
              "buildTarget": "mf-NOMBRE_DEL_PROYECTO:build:sqm"
            },
            "dev": {
              "buildTarget": "mf-NOMBRE_DEL_PROYECTO:build:dev"
            }
          },
          "defaultConfiguration": "development",
          "options": {
            "port": PUERTO_A_URAR,
            "publicHost": "http://localhost:PUERTO_A_URAR",
            "extraWebpackConfig": "webpack.config.js"
          }
        },
        "extract-i18n": {
          "builder": "ngx-build-plus:extract-i18n",
          "options": {
            "buildTarget": "mf-NOMBRE_DEL_PROYECTO:build",
            "extraWebpackConfig": "webpack.config.js"
          }
        },
        "test": {
        ...
          }
        }
      }
    }
  },
  "cli": {
    "analytics": false
  }
}
```

## Paso 3: Instalar dependencias

```bash
npm install
```

## Paso 4: Estructuramos nuestro poryecto

```
MF-NOMBRE_DEL_PROYECTO/
│
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── constants/
│   │   │   ├── directives/
│   │   │   ├── functions/
│   │   │   ├── models/
│   │   │   ├── pipes/
│   │   │   ├── services/
│   │   │   └── validator/
│   │   ├── modules/
│   │   │   └── module_name/
│   │   │       ├── pages/
│   │   │       ├── components/
│   │   │       └── module_name.routes.ts
│   │   ├── shared/
│   │   │       ├── components/
│   │   │       └── styles/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   │   ├── environment.dev.ts
│   │   ├── environment.prod.ts
│   │   ├── environment.sqm.ts
│   │   └── environment.ts
│   ├── bootstrap.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── .editorconfig
├── .gitignore
├── angular.json
└── package.json
```
