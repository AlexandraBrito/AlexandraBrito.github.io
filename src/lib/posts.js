  import fs from 'fs';
  import path from 'path';
  import matter from 'gray-matter';

  // Get the posts directory path
  const postsDirectory = path.join(process.cwd(), 'posts');

  // Get all blog posts
  export function getAllPosts() {
    // Get all .md files from posts directory
    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        // Remove ".md" from filename to get the slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Parse metadata from file
        const { data, content } = matter(fileContents);

        // Extract first image from content if no featured image in frontmatter
        let featuredImage = data.image || null;
        if (!featuredImage) {
          const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
          if (imageMatch) {
            featuredImage = imageMatch[1];
          }
        }

        return {
          slug,
          content,
          featuredImage,
          ...data, // title, date, category, excerpt
        };
      });

    // Sort posts by date (newest first)
    return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  }

  // Get a single post by slug
  export function getPostBySlug(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    };
  }

  // Get all unique topics with their types and post counts
  export function getTopicsWithTypes() {
    const posts = getAllPosts();
    const topics = {};

    posts.forEach(post => {
      const topic = post.topic || 'uncategorized';
      const type = post.type || 'post';

      if (!topics[topic]) {
        topics[topic] = {
          name: topic,
          types: {},
          totalPosts: 0,
          latestPost: null
        };
      }

      if (!topics[topic].types[type]) {
        topics[topic].types[type] = [];
      }

      topics[topic].types[type].push(post);
      topics[topic].totalPosts++;

      // Track latest post
      if (!topics[topic].latestPost || post.date > topics[topic].latestPost.date) {
        topics[topic].latestPost = post;
      }
    });

    return Object.values(topics);
  }

  // Get all unique categories (for backwards compatibility)
  export function getAllCategories() {
    const posts = getAllPosts();
    const categoryCounts = {};

    posts.forEach(post => {
      const category = post.topic || post.category || 'uncategorized';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count
    }));
  }

  // Get posts grouped by year and month for archives
  export function getPostsByArchive() {
    const posts = getAllPosts();
    const archives = {};

    posts.forEach(post => {
      if (post.date) {
        const date = new Date(post.date);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        const key = `${year}-${month}`;

        if (!archives[key]) {
          archives[key] = {
            year,
            month,
            posts: []
          };
        }
        archives[key].posts.push(post);
      }
    });

    return Object.values(archives).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return new Date(`${b.month} 1, ${b.year}`) - new Date(`${a.month} 1, ${a.year}`);
    });
  }
