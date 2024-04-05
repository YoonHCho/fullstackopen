import _ from "lodash";

export const dummy = array => {
  return 1;
};

export const totalLikes = blogPosts => {
  return blogPosts.length === 0
    ? 0
    : blogPosts.reduce((acc, curr) => {
        return acc + curr.likes;
      }, 0);
};

export const favoriteBlog = blogPosts => {
  if (blogPosts.length === 0) return 0;

  const blogPost = blogPosts.reduce((max, curr) => {
    return curr.likes > max.likes ? curr : max;
  }, blogPosts[0]);

  const { title, author, likes } = blogPost;
  return { title, author, likes };

  // return blogPosts.length === 0
  //   ? 0
  //   : blogPosts.reduce((max, curr) => {
  //       return curr.likes > max.likes ? curr : max;
  //     }, blogPosts[0]);
};

export const mostBlogs = blogPosts => {
  if (blogPosts.length === 0) return 0;
  const maxBlogObj = _.maxBy(blogPosts, "blogs");
  const { author, blogs } = maxBlogObj;
  return { author, blogs };
};

export const mostLikes = blogPosts => {
  if (blogPosts.length === 0) return 0;
  const mostLikeObj = _.maxBy(blogPosts, "likes");
  const { author, likes } = mostLikeObj;
  return { author, likes };
};
