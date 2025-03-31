export default async function handler(req, res) {
    const country = req.headers["x-vercel-ip-country"] || "UNKNOWN";
    const r2Url = `https://blog-static.xeonzilla.top/${req.query.path}`;

    if (country === "CN") {
        try {
            const response = await fetch(r2Url, {
                headers: {
                    "User-Agent": "Vercel-Proxy",
                    "Origin": req.headers.origin || "",
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching ${r2Url}: ${response.statusText}`);
            }

            res.setHeader("Content-Type", response.headers.get("Content-Type"));
            res.setHeader("Cache-Control", "public, immutable, max-age=86400, s-maxage=604800");
            const body = await response.arrayBuffer();
            res.send(Buffer.from(body));
        } catch (error) {
            res.status(500).send(`Proxy error: ${error.message}`);
        }
    } else {
        res.redirect(302, r2Url);
    }
}
