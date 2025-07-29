//These functions handle server-side data fetching via REST from Strapi backend.
// Used by getStaticProps, getStaticPaths for SSG/ISR in pages.


export async function getArticles() {
  const res = await fetch('http://localhost:1337/api/articles?populate=*');
  const json = await res.json();

  console.log('Raw articles from Strapi:', json.data);

  // Since attributes are already at top-level, just return the data as-is
  return json.data;
}



export async function getArticleBySlug(slug) {
  const res = await fetch(`http://localhost:1337/api/articles?filters[Slug][$eq]=${slug}&populate=*`);
  const data = await res.json();

  console.log("📦 Raw fetched data for slug:", slug, JSON.stringify(data, null, 2));

  if (!data?.data?.length) return null;

  const item = data.data[0];

  console.log("🎯 Extracted article:", item);

  return {
    id: item.id,
    ...item,
  };
}


export async function getCategories() {
  const res = await fetch(`http://localhost:1337/api/categories?populate=*`);
  const data = await res.json();

  if (!data || !data.data) {
    console.warn('No categories found:', data);
    return [];
  }

  return data.data.map((item) => ({
    id: item.id,
    name: item.Title,  // Top-level Title
    slug: item.Slug,   // Top-level Slug
    articles: item.articles || [], // already populated
  }));
}



export async function getFeaturedCategory() {
  const res = await fetch(`http://localhost:1337/api/category?populate=articles`);
  const data = await res.json();
  return data.data;
}

export async function getCategoryBySlug(slug) {
  const res = await fetch(
    `http://localhost:1337/api/categories?filters[Slug][$eq]=${slug}&populate[articles][populate]=*`
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

