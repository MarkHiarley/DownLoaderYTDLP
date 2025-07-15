import Fastify from 'fastify';
import downloadVideo from './route/donwload';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: true,
});

fastify.get('/', async (request, reply) => {
  return { message: 'Hello, World!' };
});

fastify.register(downloadVideo);

const start = async () => {
  try {
    await fastify.listen({ port: 3000});
    console.log('Servidor está rodando em http://localhost:3000');
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

start();



