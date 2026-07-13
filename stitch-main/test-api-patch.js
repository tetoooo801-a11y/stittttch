const test = async () => {
  const res = await fetch("https://stittttch.vercel.app/api/services/2273dc2a-9001-480a-a840-68a60811272e", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titleEn: "Test Service Script Updated",
    }),
  });
  const data = await res.json();
  console.log(data);
};
test();
