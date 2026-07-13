const { createClient } = require("@supabase/supabase-js");

const b64Url = "aHR0cHM6Ly9tcW1wbGRodXpwY3J6YmF6em1rdy5zdXBhYmFzZS5jbw==";
const b64Key = "c2Jfc2VjcmV0X21RbWNRZ1FpRHRNWFEyTW9nTE1QRVFfVXpmZTl5Y3I=";

function decode(b64) {
  return Buffer.from(b64, "base64").toString("utf-8");
}

const supabase = createClient(decode(b64Url), decode(b64Key));

async function checkBuckets() {
  const { data, error } = await supabase.storage.listBuckets();
  console.log("Buckets:", data);
  if (error) console.error(error);
}

checkBuckets();
