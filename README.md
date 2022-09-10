# Piges Birthday API

Simple API, that returns birthdays of minipigs

## Created with

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare KV](https://workers.cloudflare.com/)
- [SheetsDB](https://sheetsdb.io/)
- [Hono](https://honojs.dev)

### Deployment

1. Create sheets in SheetsDB
2. Create KV in Cloudflare
3. Copy ID of KV to `wrangler.toml` in `kv_namespaces`
4. Put SheetsDB API url in secrets
    ```bash
    echo "<API_URL>" | wrangler secret put SHEETSDB_API_URL
    ```
5. (Optional) Put SheetsDB authentication in secrets
    ```bash
    echo "<USERNAME>:<PASSWORD>" | wrangler secret put SHEETSDB_AUTH_TOKEN
    ```
6. Deploy with `wrangler publish`

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ivanprograming/piges-birthday-api)

### Working with API

API documentation can be built with Swagger UI. 
You can find it [here](https://birthday-docs.ivanprograming.xyz/).