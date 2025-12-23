FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi

COPY . .

RUN chown -R node:node /usr/src/frontend

USER node

EXPOSE 19000 19001 19002 8081

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
    REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0 \
    EXPO_NO_TELEMETRY=1

CMD ["npx", "expo", "start", "--tunnel"]
