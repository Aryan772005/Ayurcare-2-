const apiKey = process.env.NVIDIA_API_KEY || "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";
async function test() {
  const payload = {
    model: "meta/llama-3.2-11b-vision-instruct", 
    messages: [
      { 
        role: "user", 
        content: [
          { type: "text", text: "hello" },
          { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" } }
        ] 
      }
    ],
    temperature: 0.2,
    max_tokens: 50,
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
  console.log(response.status, txt);
}
test();
