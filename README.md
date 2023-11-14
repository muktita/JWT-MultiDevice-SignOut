# Dockerized ToDo App - Logout all sessions
**_A fictitious To-Do list sample application built using modern technologies and  Microservices & Cloud Native Architecture patterns._**
- **Polyglot Frameworks** (JavaScript/TypeScript - Node, ExpressJS, React)
- **Databases** (MongoDB)

- This is an end-to-end ** Log out All Users from ALl Devices solution** that demonstrates how to build a modern CNA application using microservices architecture with full-stack technologies. This application includes below functional microservices, which are independently deployable with bounded context.

## App -  UI/UX
### Login Page
![front-end-login](https://github.com/muktita/dockerized-todo-app/assets/78444922/f13d78cc-9d1f-423a-84ca-b7e659f16772)

### Registration Page
![front-end-registration](https://github.com/muktita/dockerized-todo-app/assets/78444922/15608a0f-a891-4aa8-9aa8-3754d0e701a3)

### To Do list Page
![front-end-todo](https://github.com/muktita/dockerized-todo-app/assets/78444922/8e474cb6-e2b8-4db4-ad3c-c021917e3762)



## Functional Microservices
| Microservice  | Description | Technologies Used |
| --- | --- | --- |
| [CRUD and User Log-out Microservice] | CRUD Todo List & Log User out from all devices. | A REST API built using NodeJS, ExpressJS relies MongoDB as a data store. | 
| [Sign In/Sign Up Page] | User Sign in and Sign up Page. | A Login Page using NodeJS, ReactJS, and ExpressJS relies MongoDB as a data store. |

## Getting Started
### Build
Log in to MongoDB-Compass (For testing purposes, but for production, use strong username and password)

| Username  | Password | 
| --- | --- |
| root | rootpassword |

#### Run only the Backend
```cd backend```

Run the docker file
``docker-compose up``
#### Run only the Frontend
Go to frontend folder
``cd frontend``

Install all the packages
``npm install``

Start the server
``npm start``
#### Run only the Frontend, Backend and DB inside Docker
To build and run
``docker-compose up --build``

To run in the background
``docker-compose up -d``

Down the docker
``docker-compose down``



