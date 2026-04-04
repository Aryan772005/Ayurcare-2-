import "dotenv/config";

async function testApi() {
  const apiKey = process.env.NVIDIA_API_KEY.trim();
  const promptText = `Analyze this food image. Provide ONLY a JSON response without markdown formatting. You must detect the food and estimate its details. Follow this exact JSON structure:
    {
      "food_name": "Name of dish",
      "calories": "Number kcal",
      "health_category": "Healthy / Moderate / Unhealthy",
      "ayurvedic_nature": "Vata / Pitta / Kapha effect",
      "suggestion": "Brief Ayurvedic suggestion"
    }`;

  const payload = {
    model: "meta/llama-3.2-11b-vision-instruct",
    messages: [
      { 
        role: "user", 
        content: [
          { type: "text", text: promptText },
          { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" } }
        ] 
      }
    ],
    temperature: 0.2,
    max_tokens: 500,
  };

  const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  const txt = await response.text();
  console.log("Status:", response.status);
  console.log("Body:", txt);
}

testApi();
