async function testLoc() {
  const payload = {
    imageBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  };

  try {
    const response = await fetch("http://localhost:3000/api/food-analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    console.log(response.status, text);
  } catch(e) {
    console.error(e);
  }
}
testLoc();
