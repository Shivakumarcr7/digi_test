export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
    
    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) return res.status(503).json({ error: "Missing SARVAM_API_KEY in Vercel settings" });

    try {
        const { messages } = req.body;
        const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Bearer ,
                "api-subscription-key": apiKey
            },
            body: JSON.stringify({
                model: "sarvam-105b",
                messages: messages,
                temperature: 0.3,
                max_tokens: 500,
                reasoning_effort: null
            })
        });
        
        if (!response.ok) throw new Error(HTTP );
        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content || "";
        return res.status(200).json({ reply });
    } catch (error) {
        return res.status(500).json({ error: "Backend proxy error" });
    }
}
