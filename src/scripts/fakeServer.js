const fastify = require('fastify')();

fastify.register(require('@fastify/cors'), () => (_, cb) => {
  cb(null, {
    origin: true,
  });
});

const getRandomSlice = (n, m) => {
  return Array.from({ length: n }, (_, i) => ({
    i,
    r: Math.random(),
  }))
    .sort((a, b) => a.r - b.r)
    .map(({ i }) => i)
    .slice(0, m)
    .sort((a, b) => a - b);
};

let counter = 0;

fastify.post('/ticket', async (request, reply) => {
  reply.type('application/json');

  if (Math.random() > 0.5) {
    console.log(++counter, ' code: 555');
    reply.code(555); // кастомный код при котором произоёдёт re-fetch
    return { error: 'Ошибка на стороне сервера. Попробуйте ещё раз...' };
  }
  console.log(++counter, ' code: 200');

  const { selectedNumber } = request.body;
  const firstField = getRandomSlice(19, 8);
  const secondField = getRandomSlice(2, 1);

  const firstMatchesCount = firstField.reduce(
    (acc, curr) => (selectedNumber.firstField.includes(curr) ? acc + 1 : acc),
    0
  );

  const secondMatchesCount = secondField.reduce(
    (acc, curr) => (selectedNumber.secondField.includes(curr) ? acc + 1 : acc),
    0
  );

  return {
    correctTicket: {
      firstField,
      secondField,
    },
    isTicketWon:
      firstMatchesCount > 3 ||
      (firstMatchesCount === 3 && secondMatchesCount > 0),
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
