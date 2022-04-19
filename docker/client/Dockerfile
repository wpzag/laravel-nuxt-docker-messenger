# Image
FROM node:14.16.1-alpine

# Set up work directory
WORKDIR /var/www/client

# needs to be avaiable for nuxt build
ARG SOKETI_APP_KEY
ARG SOKETI_PORT
ARG HOSTNAME
ARG API_URL
ARG APP_ENV

# Copy nuxt app
COPY . .
RUN yarn install

RUN if [ "$APP_ENV" = "production" ] ; then yarn build  ; fi

# Configure host
ENV HOST 0.0.0.0
EXPOSE 3000

# Init command
CMD if [ "$APP_ENV" = "local" ] ; then yarn dev ; else yarn start ; fi

