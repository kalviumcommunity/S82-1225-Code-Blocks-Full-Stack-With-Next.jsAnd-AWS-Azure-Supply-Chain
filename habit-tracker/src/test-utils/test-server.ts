import { createServer } from "http";
import { parse } from "url";
import next from "next";

export async function createTestServer() {
  const app = next({ dev: true });
  const handle = app.getRequestHandler();

  await app.prepare();

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  return server;
}
