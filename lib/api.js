// Get the API base URL from .env file (NEXT_PUBLIC makes it available in browser too)
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//Fetches all articles from Strapi for use in article lists
export async function getArticles() {
  const res = await fetch(`${API_URL}/api/articles?populate=*`);// populate=* gets all related fields like images, categories
  const json = await res.json();

  console.log('Raw articles from Strapi:', json.data);

  return json.data;// returns array of articles to be used in SSG/ISR
}

 //Fetches a single article by its slug, used in [slug].js dynamic route.
export async function getArticleBySlug(slug) {
  const res = await fetch(`${API_URL}/api/articles?filters[Slug][$eq]=${slug}&populate=*`);
  const data = await res.json();

  console.log(" Raw fetched data for slug:", slug, JSON.stringify(data, null, 2));

  if (!data?.data?.length) return null;

  const item = data.data[0];

  console.log("Extracted article:", item);

  return {
    id: item.id,
    ...item,
  };
}

//Fetches all categories from Strapi for use on Home page or category listing
export async function getCategories() {
  const res = await fetch(`${API_URL}/api/categories?populate=*`);
  const data = await res.json();

  if (!data || !data.data) {
    console.warn('No categories found:', data);
    return [];
  }

  return data.data.map((item) => ({
    id: item.id,
    name: item.Title,
    slug: item.Slug,
    articles: item.articles || [],
  }));
}

//Fetches a "featured" category 
export async function getFeaturedCategory() {
  const res = await fetch(`${API_URL}/api/category?populate=articles`);
  const data = await res.json();
  return data.data;
}

//Fetches a specific category by its slug, and all its articles, used in [slug].js for categories.
export async function getCategoryBySlug(slug) {
  const res = await fetch(
    `${API_URL}/api/categories?filters[Slug][$eq]=${slug}&populate[articles][populate]=*`
  );
  const data = await res.json();

  if (!data?.data?.length) {
    console.warn('Category not found for slug:', slug);
    return null;
  }

  const cat = data.data[0];

  return {
    id: cat.id,
    name: cat.Title,
    slug: cat.Slug,
    articles: (cat.articles || []).map((a) => ({
      id: a.id,
      Title: a.Title,
      Slug: a.Slug,
      Description: a.Description,
      coverImage: a.Image?.url || null,
    })),
  };
}
