import { test, describe } from "node:test";
import assert from "node:assert";
import { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } from "../utils/list_helper.js";
// below is import for data only
import { blogs, listWithOneBlog, blogs_six, blogs_seven } from "./data.js";

// https://stackoverflow.com/questions/16745855/difference-between-equal-deep-equal-and-strict-equal/73937068#73937068
// above link for more info in strictEqual(value) and deepStrictEqual(object)

// ex. 4.3
describe("Dummy function", () => {
  test("dummy returns one", () => {
    assert.strictEqual(dummy([1, 2, 3]), 1);
  });
});

// ex 4.4
describe("Total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(totalLikes([]), 0);
  });

  test("should equal to 5", () => {
    assert.strictEqual(totalLikes(listWithOneBlog), 5);
  });

  test("of a bigger list is calculated right, 36", () => {
    assert.strictEqual(totalLikes(blogs), 36);
  });
});

// ex 4.5
describe("Most Favorite", () => {
  test("of empty list is zero", () => {
    assert.deepStrictEqual(favoriteBlog([]), 0);
  });

  test("should equal: Should return with 5 likes", () => {
    assert.deepStrictEqual(favoriteBlog(listWithOneBlog), {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list: Should return with 12 likes", () => {
    assert.deepStrictEqual(favoriteBlog(blogs), {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

//ex 4.6
describe("Most blogs", () => {
  test("of empty list return zero", () => {
    assert.deepStrictEqual(mostBlogs([]), 0);
  });

  test("of most blogs: Willie Faucherand = 100", () => {
    assert.deepStrictEqual(mostBlogs(blogs_six), {
      author: "Willie Faucherand",
      blogs: 100,
    });
  });
});

// 4.7
describe("Most likes", () => {
  test("of empty list return zero", () => {
    assert.deepStrictEqual(mostLikes([]), 0);
  });

  test("of 10 posts, return: Timmie Brideoke = 1000 ", () => {
    assert.deepStrictEqual(mostLikes(blogs_seven), {
      author: "Timmie Brideoke",
      likes: 1000,
    });
  });
});
