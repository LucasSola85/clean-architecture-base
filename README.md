# Hola

Este mini proyecto te ayudará a crear una base sobre Clear Architecture que podrás expandir hasta donde quiera tu imaginación.

## Capas de la Arquitectura

Basándonos en las capas desde el exterior hacia el interior, veremos cómo se define cada una:

### Capa de Presentación (PRESENTATION)
Es la capa más cercana al usuario final. Aquí encontraremos las rutas de nuestra aplicación que serán consumidas y, obviamente, nuestros controllers y, por qué no, los middlewares.

### Capa de Dominio (DOMAIN)
Esta capa alberga toda la lógica de nuestro negocio. Incluye:
- **Entidades**: Cómo lucirán nuestras entidades.
- **DTOs**: Los Data Transfer Objects que fluirán por nuestra aplicación.
- **Datasources y Repositorios**: Manejo de fuentes de datos y repositorios.
- **Manejo de errores**: Gestión de excepciones y errores.
- **Casos de Uso**: Permiten ejecutar lógica específica desde los controladores (similares a los servicios en NestJS).

### Capa de Infraestructura (INFRASTRUCTURE)
Es la capa intermedia entre DOMAIN y PRESENTATION. En esta capa nos dedicamos a tomar las abstracciones de los datasources y repositorios para finalmente ejecutar su implementación.

---

Espero que te sirva y, si es así, ¡por favor dale un like!

¡Saludos, coder!

