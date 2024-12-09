# Pokedex Challenge 👾
Este challenge consiste en crear una app que consuma una API y pueda mostrar la información obtenida en una lista.

Para que este resuelto correctamente es *necesario* que:
- Se cree un componente Button y que al apretarlo se dispare la llamada al endpoint de la API
- Crear y conectar un Loading que se va a mostrar durante todo el tiempo que la API este "cargando"
- Crear un componente de ListPokemons que reciba la información obtenida por el endpoint y dibuje una lista con todos los pokemons adentro + un scrollbar

![Esqueleto](https://i.imgur.com/xKOXY2n.png)

La API a consumir es la siguiente: [Pokeapi](https://pokeapi.co/)
La URL seria => `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`

# Información adicional
Un pokedex es un objecto ficticio que lista información de todos los Pokemons. Un Pokemon es un "animal/mounstro" chiquitito que pelea en batallas contra otros Pokemons. [Pokemon game series](https://en.wikipedia.org/wiki/Pok%C3%A9mon_(video_game_series)).

## Puntos Extra

- Responsive
- Error handling
- Usar Context o Redux para el consumo de la API
- Paginación

# Información del proyecto base

Este proyecto fue creado usando:
- Node 16
- React 18
- Bootstrap 5

## Consideraciones

Se va a analizar la arquitectura de la aplicación, el consumo de información dinámica y la prolijidad al desarrollar.
Es muy importante que la aplicación cumpla con el listado de items y funcionalidades necesarias provisto arriba.

## Scripts

Para instalar todas las dependencias necesarias:
### `npm install`

Para prender el proyecto en modo dev
### `npm start`

## Entrega
El proyecto tiene que ser clonado usando el comando `git clone`.
Cada desarrollador debera crear un repositorio en su cuenta de github y subir el proyecto ahí dentro.
Dejandolo público para que luego alguien del equipo lo pueda analizar como corresponda.

(PD: Se puede cambiar el Remote del repositorio si sabe usar `git` correctamente)

-----
## Challenge Jus Recondo

- [x] Comenzar un proyecto de React desde cero usando Vite
- [x] Que cargar la página se consuma la PokeAPI mostrando un listado de Pokemons con un loader
- [x] Manejar el estado de los Pokemons con redux toolkit 
- [x] Mostrar los Pokemons en un layout masonry
- [x] Que al clickear en un Pokemon puedas ver el detalle del mismo
- [x] Usar la paginación de la API para poder ir cargando más Pokemons a demanda del usuario
- [ ] Que sea responsive 
- [ ] Nice to have: funcionalidad de búsqueda de Pokemon por nombre

## Tecnologías

* React
* Vite
* Redux Toolkit
* React Router Dom
* Sass
* [React Icons](https://react-icons.github.io/react-icons/)
