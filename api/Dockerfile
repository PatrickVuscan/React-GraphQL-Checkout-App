FROM node:12

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Migate prisma before building.
RUN npx prisma migrate up --experimental 
RUN npx prisma generate



RUN npm run build

# Copy graphql schema to dist/
COPY src/gql/schema.graphql ./dist/src/gql/
COPY prisma ./dist/
COPY .env ./dist/

WORKDIR /usr/app/dist

EXPOSE 8080
CMD node src/index.js