## Overview
The **Neko Search API** provides a powerful search interface that allows applications to query the web, fetch AI-generated summaries, search for images, and get news results.

### Base URL
```
https://neko-search-backend.crabby605.workers.dev/
```

## Endpoints

### 1. Web Search
Search for general web results.

**Request:**
```
GET /search?q={query}&type=web
```

**Example:**
```
GET /search?q=elon+musk&type=web
```

**Response:**
```json
{
  "query": "elon musk",
  "results": [
    {
      "title": "Elon Musk - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Elon_Musk",
      "snippet": "Elon Musk is a business magnate and investor..."
    },
    {
      "title": "Tesla CEO Elon Musk",
      "url": "https://www.tesla.com/elonmusk",
      "snippet": "Tesla CEO Elon Musk is known for..."
    }
  ]
}
```

---

### 2. Image Search
Fetch images based on a query.

**Request:**
```
GET /search?q={query}&type=images
```

**Example:**
```
GET /search?q=cat&type=images
```

**Response:**
```json
{
  "query": "cat",
  "results": [
    {
      "url": "https://example.com/cat1.jpg",
      "thumbnail": "https://example.com/cat1_thumb.jpg",
      "source": "example.com"
    },
    {
      "url": "https://example.com/cat2.jpg",
      "thumbnail": "https://example.com/cat2_thumb.jpg",
      "source": "example.com"
    }
  ]
}
```

---

### 3. News Search
Fetch news articles related to a query.

**Request:**
```
GET /search?q={query}&type=news
```

**Example:**
```
GET /search?q=technology&type=news
```

**Response:**
```json
{
  "query": "technology",
  "results": [
    {
      "title": "Latest Tech Trends",
      "url": "https://news.com/tech",
      "snippet": "Discover the latest advancements in technology...",
      "published_at": "2025-02-28T12:00:00Z"
    },
    {
      "title": "AI in 2025",
      "url": "https://news.com/ai-2025",
      "snippet": "How AI is shaping the future...",
      "published_at": "2025-02-27T18:45:00Z"
    }
  ]
}
```

---

### 4. AI-Generated Summary
Get an AI-generated summary of a topic.

**Request:**
```
GET /search?q={query}&type=ai
```

**Example:**
```
GET /search?q=quantum+computing&type=ai
```

**Response:**
```json
{
  "query": "quantum computing",
  "summary": "Quantum computing is a revolutionary field that leverages quantum mechanics..."
}
```

---

## Caching Mechanism
- The API caches search results to reduce redundant requests and improve performance.
- If a query has been searched recently, the API will return cached results instead of making a new request.

---

## Error Handling
If an error occurs, the API returns a response like this:
```json
{
  "error": "Invalid request",
  "message": "Query parameter is missing."
}
```

### Common Errors:
| Error Code | Description |
|------------|-------------|
| 400 | Missing or invalid query parameter |
| 500 | Internal server error |

---

## Example Usage in JavaScript
```js
async function fetchSearchResults(query, type) {
  const response = await fetch(`https://neko-search-backend.crabby605.workers.dev/search?q=${encodeURIComponent(query)}&type=${type}`);
  const data = await response.json();
  console.log(data);
}

fetchSearchResults("open source", "web");
```

---
For any issues open an issue here

🚀 Happy Searching!

