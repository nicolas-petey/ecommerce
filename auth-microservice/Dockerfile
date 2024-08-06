
FROM node:20

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY . .

RUN bun install

RUN bun prisma generate

EXPOSE 3000

CMD [ "bun", "run", "start:dev" ]