// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { require } from "https://deno.land/x/require/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

serve(async (req) => {
  console.log(req);
  var mercadopago = require("mercadopago");
  mercadopago.configurations.setAccessToken(
    "TEST-2421207288296147-071212-c351e728c659f3bef0f9ec86bf9003dd-98574482",
  );

  const app = new Application();
  app.use(oakCors());

  app.use("/", () => {
    mercadopago.payment
      .save(req.body)
      .then(function (response) {
        const { status, status_detail, id } = response.body;
        res.status(response.status).json({ status, status_detail, id });
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
