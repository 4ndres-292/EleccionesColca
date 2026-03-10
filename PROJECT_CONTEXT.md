# PROJECT CONTEXT

Sistema de Control de Agua – OTB Piñami Sud

## 1. Descripción del Proyecto

Este proyecto es un sistema web y móvil para gestionar el control de consumo de agua en una OTB (Organización Territorial de Base) llamada **Piñami Sud**.

Actualmente el control se realiza manualmente usando formularios en Excel y cobros presenciales. El objetivo del sistema es digitalizar el proceso para mejorar la eficiencia en:

* registro de lecturas de medidores
* cálculo automático del consumo
* gestión de pagos
* generación de estadísticas

El sistema está diseñado para aproximadamente **300 viviendas**.

---

# 2. Stack Tecnológico

Backend
Node.js
Express.js

Base de datos
PostgreSQL (Supabase)

Frontend (planificado)
React

Deploy (planificado)
Render / hosting gratuito

Autenticación futura
usuario + contraseña
huella digital (para móviles)

Pagos futuros
QR

---

# 3. Arquitectura del Backend

El backend sigue una arquitectura modular:

routes → controllers → models → database

Esto permite:

* separar responsabilidades
* escalar el sistema
* mantener el código limpio

Estructura actual del proyecto:

src
│
├── db.js
├── server.js
│
├── routes
│   houses.routes.js
│   readings.routes.js
│   gestions.routes.js
│
├── controllers
│   houses.controller.js
│   readings.controller.js
│   gestions.controller.js
│
├── models
│   houses.model.js
│   readings.model.js
│   gestions.model.js

---

# 4. Base de Datos

## Tabla: houses

Representa cada vivienda con medidor.

Campos:

id BIGSERIAL PRIMARY KEY
house_code TEXT
owner_name TEXT
order_position NUMERIC
created_at TIMESTAMP

Notas:
order_position se usa para mantener el orden físico de recorrido del lecturador.

---

## Tabla: gestions

Representa cada mes de gestión.

id BIGSERIAL PRIMARY KEY
month INTEGER
year INTEGER
created_at TIMESTAMP

Restricción:

UNIQUE (month, year)

Esto evita duplicar gestiones.

Ejemplo:

enero 2026
febrero 2026
marzo 2026

---

## Tabla: meter_readings

Registra las lecturas de medidores.

id BIGSERIAL PRIMARY KEY
house_id BIGINT REFERENCES houses(id)
gestion_id BIGINT REFERENCES gestions(id)
reading_value INTEGER
comment TEXT
created_at TIMESTAMP

Cada casa tiene **una lectura por mes**.

---

# 5. Lógica de Consumo

El consumo de agua se calcula con:

consumo = lectura_actual - lectura_anterior

La lectura anterior se obtiene con la consulta:

SELECT reading_value
FROM meter_readings
WHERE house_id = ?
AND gestion_id < ?
ORDER BY gestion_id DESC
LIMIT 1

Esto permite calcular consumo sin guardar datos duplicados.

---

# 6. Flujo del Sistema

Proceso de lectura:

1. El lecturador abre la aplicación
2. Selecciona la casa
3. Registra la lectura actual
4. El sistema busca la lectura anterior
5. Calcula el consumo
6. Guarda el registro

Resultado:

lectura actual
lectura anterior
consumo

---

# 7. Estado Actual del Proyecto

Actualmente el backend tiene:

✔ conexión a PostgreSQL funcionando
✔ estructura del proyecto organizada
✔ módulo houses implementado
✔ diseño del módulo gestions
✔ diseño del módulo meter_readings

---

# 8. Funcionalidades Futuras

Registro de pagos
Pagos mediante QR
Panel de administrador
Estadísticas de consumo
Notificaciones de deuda
Aplicación móvil para lecturadores

---

# 9. Objetivo Final

Construir un sistema digital que permita:

* registrar lecturas de agua
* calcular consumos automáticamente
* gestionar pagos
* mejorar la administración del servicio de agua en la comunidad
