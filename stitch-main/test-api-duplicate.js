const test = async () => {
  const res = await fetch("https://stittttch.vercel.app/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titleEn: "Test Service Script 2",
      category: "face",
      price: 150,
      slug: "test-service-script-2",
    }),
  });
  const data = await res.json();
  console.log(data);
};
test();
