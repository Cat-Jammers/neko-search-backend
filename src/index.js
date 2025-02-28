export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const query = url.searchParams.get("q");
		const type = url.searchParams.get("type") || "web";

		if (!query) {
			return new Response(JSON.stringify({ error: "Missing query parameter" }), { status: 400 });
		}

		const cached = await env.DB.prepare("SELECT response FROM search_cache WHERE query = ?")
			.bind(query)
			.first();

		if (cached) {
			return new Response(cached.response, { headers: { "Content-Type": "application/json" } });
		}

		const API_KEY = env.BRAVE_API_KEY;
		const response = await fetch(`https://api.search.brave.com/res/v1/${type}/search?q=${encodeURIComponent(query)}`, {
			headers: {
				"Authorization": `Bearer ${API_KEY}`,
				"X-Subscription-Token": API_KEY,
			},
		});

		if (!response.ok) {
			return new Response(JSON.stringify({ error: "Brave API request failed" }), { status: response.status });
		}

		const data = await response.json();

		await env.DB.prepare("INSERT INTO search_cache (query, response, timestamp) VALUES (?, ?, ?)")
			.bind(query, JSON.stringify(data), Date.now())
			.run();

		return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
	}
};
