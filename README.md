
# Proyecto Topicos 

Este proyecto es una API REST para gestionar chistes. La API permite obtener chistes de diversas fuentes, crear nuevos chistes, actualizarlos, eliminarlos y clasificarlos según diferentes criterios.
 
La razón por la que todo fue publicado en un solo dia se debió a que tuvimos inconvenientes con el gitflow y por eso hicimos un nuevo repositorio desde cero



## Requerimientos

#### Primer requisito

```http
    GET /req_1/:type
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Required**. Tipo de chiste a buscar: Chuck, Dad, Propio|

Obtener un chiste basado en el parámetro URL.
   - `Chuck`: Obtener un chiste de [https://api.chucknorris.io](https://api.chucknorris.io).
   - `Dad`: Obtener un chiste de [https://icanhazdadjoke.com](https://icanhazdadjoke.com).
   - `Propio`: Obtener un chiste de la base de datos interna.
#### Segundo Requisito

```http
    POST /req_2/
```
Crear un nuevo chiste en la base de datos.
   - Campos requeridos:
     - Texto del chiste
     - Puntaje (1-10)
     - Categoría (`Dad joke`, `Humor Negro`, `Chistoso`, `Malo`)
   - Campos opcionales:
     - Nombre de quien escribió el chiste (por defecto: "Se perdió en el Ávila como Led")

Para crear el chiste puedes usar un body como este

```http
{
    "texto": "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.",
    "autor": "Juan Pérez",
    "puntaje": 8,
    "categoria": "Chistoso"
}
```

#### Tercer Requisito

```http
    PUT /req_3/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del chiste a modificar |

Actualizar un chiste existente por su ID. puedes usar un body como este

```http
{
    "texto": "Nuevo texto.",
    "autor": "Pepito perez",
    "puntaje": 0,
    "categoria": "Negro"
}
```
#### Cuarto Requisito


```http
     DELETE /req_4/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del chiste a borrar |

Eliminar un chiste por su ID.

#### Quinto Requisito


```http
     GET /req_5/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id del chiste a buscar |

Obtener un chiste por su ID.

#### Sexto Requisito


```http
   GET /req_6/:categoria
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `categoria`      | `string` |  Categoria a buscar: 'Dad joke', 'Humor Negro', 'Chistoso', 'Malo'

Obtener la cantidad de chistes por categoría.

#### Septimo Requisito

```http
   GET /req_7/:puntaje
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `puntaje`      | `string` |  Puntaje a buscar

 Obtener todos los chistes por puntaje.
 
## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Swagger




## Running Tests

Para correr los puedes usar:
```bash
  npm test
```
```bash
  npx jest
```




### Integración con APIs Externas

- [https://api.chucknorris.io](https://api.chucknorris.io)
- [https://icanhazdadjoke.com/api](https://icanhazdadjoke.com/api)



## Cómo Ejecutar el Proyecto

### Pre-requisitos

- Node.js (v14 o superior)
- MongoDB

### Instrucciones

1. Clona el repositorio.
   ```bash
   git clone https://github.com/tu-usuario/proyecto-chistes.git

2. En la raiz del proyecto hay que crear un archivo 

 ```bash
secrets.json
```
el cual contenga este body, y pon tu user y password de mongo, ej:

 ```bash
{
    "DB_USER" : "Alejandro",
    "DB_PWD" : "123456789"
}
```
3. En la terminal corre el siguinte comando para ejecutar el proyecto:
 ```bash
node server.js
```

4. Opcional: puedes usar Inmsonia o Postman para probar de manera mas directa y con una interfaz mas usuario friendly los requisitos pedidos
