const test = async () => {
  const res = await fetch("https://stittttch.vercel.app/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titleEn: "Test",
      name: "Test",
      category: "face",
      price: 150,
      slug: "test-service-script-name",
    }),
  });
  const data = await res.json();
  console.log(data);
};
test();
