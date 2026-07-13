import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const categoryImages = {
  face: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
  body: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
  hair: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
  specialty: "https://images.unsplash.com/photo-1615397323214-3a216f446059?auto=format&fit=crop&w=600&q=80"
};

async function fixImages() {
  const { data: services, error } = await supabase.from('services').select('*');
  if (error) {
    console.error("Error fetching services:", error);
    return;
  }
  
  for (const service of services) {
    // If image url contains unsplash, replace it with a valid one based on category to ensure it works
    const newImage = categoryImages[service.category] || categoryImages.face;
    await supabase.from('services').update({ imageUrl: newImage }).eq('_id', service._id);
    console.log(`Updated ${service.titleEn} to ${newImage}`);
  }
  console.log("All done!");
}

fixImages();
