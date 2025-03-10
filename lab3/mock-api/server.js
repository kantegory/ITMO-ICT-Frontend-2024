const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Настройка CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешаем все домены
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Разрешаем все методы
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  next();
});

server.use(middlewares);
server.use('/images', express.static(path.join(__dirname, 'mock-api/images')));
server.use(router);

server.listen(8081, () => {
  console.log('JSON Server is running on http://localhost:5503');
});
