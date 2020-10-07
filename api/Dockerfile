FROM node:12

# Create app directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Migate prisma before building.
RUN npx prisma migrate up --experimental 
RUN npx prisma generate



RUN npm run build

# Copy graphql schema + prisma stuff to dist/.
COPY src/gql/schema.graphql ./dist/src/gql/
COPY prisma ./dist/
COPY .env ./dist/

WORKDIR /usr/app/dist

EXPOSE 8080
CMD node src/index.js