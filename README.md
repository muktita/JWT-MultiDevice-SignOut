# Dockerized ToDo App - Logout all sessions
**_A fictitious To-Do list sample application built using modern technologies and  Microservices & Cloud Native Architecture patterns._**
- **Polyglot Languages & Frameworks** (JavaScript/TypeScript - Node, ExpressJS, React)
- **Databases** (MongoDB)

- This is an end-to-end ** Log out All Users from ALl Devices solution** that demonstrates how to build a modern CNA application using microservices architecture with full-stack technologies. This application includes below functional microservices, which are independently deployable with bounded context.

## Functional Microservices
| Microservice  | Description | Technologies Used |
| --- | --- | --- |
| [User Log-out Microservice] | Log User out from all devices. | A REST API built using NodeJS, ExpressJS relies MongoDB as a data store. | 
| [Sign In/Sign Up Page] | User Sign in and Sign up Page. | A Login Page using NodeJS, ReactJS, and ExpressJS relies MongoDB as a data store. |

## Getting Started

### Build
``cd backend``.

### Deploy
Refer to [instructions](infra/README.md) to deploy application and dependent services such as MongoDB, Redis, ... either to local machine or AWS.

## Issues & Feedback
Raise an issue in Github. Will address as soon as possible.
