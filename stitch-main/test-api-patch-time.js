const test = async () => {
  const res = await fetch("https://stittttch.vercel.app/api/services/2273dc2a-9001-480a-a840-68a60811272e", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titleEn: "Test Service Script Updated 2",
      createdAt: "2026-07-13T03:08:44.892195+00:00",
      updatedAt: "2026-07-13T03:09:30.702739+00:00",
    }),
  });
  const data = await res.json();
  console.log(data);
};
test();
