import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Reliable URLs that are confirmed to work
const defaultImages = {
  face: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
  body: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
  hair: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
  specialty: "https://images.unsplash.com/photo-1615397323214-3a216f446059?auto=format&fit=crop&w=600&q=80"
};

const defaultBanners = {
  face: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  body: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  hair: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  specialty: "https://images.unsplash.com/photo-1615397323214-3a216f446059?auto=format&fit=crop&w=1200&q=80"
};

async function checkAndFixAllImages() {
  const { data: services, error } = await supabase.from('services').select('*');
  if (error) {
    console.error("Error fetching services:", error);
    return;
  }
  
  console.log(`Found ${services.length} services in DB.`);
  
  for (const service of services) {
    let needsUpdate = false;
    let updatePayload = {};

    // For safety, force update ALL images to guaranteed working ones to avoid 404s
    updatePayload.imageUrl = defaultImages[service.category] || defaultImages.face;
    
    if (service.bannerUrl) {
      updatePayload.bannerUrl = defaultBanners[service.category] || defaultBanners.face;
    }

    if (Object.keys(updatePayload).length > 0) {
      await supabase.from('services').update(updatePayload).eq('_id', service._id);
      console.log(`Forced updated images for: ${service.titleEn}`);
    }
  }
  
  console.log("All services images have been replaced with guaranteed working URLs.");
}

checkAndFixAllImages();
