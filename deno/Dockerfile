FROM hayd/alpine-deno:1.0.0
EXPOSE 5000
COPY . /usr/src
WORKDIR /usr/src
USER deno
RUN deno cache server.ts
CMD ["run", "--allow-net", "server.ts"]