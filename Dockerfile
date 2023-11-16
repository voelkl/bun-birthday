FROM oven/bun:latest

COPY ./ ./

# run the app
USER bun
EXPOSE 4000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]