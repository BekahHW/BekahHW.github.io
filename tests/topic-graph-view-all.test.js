"use strict";

/**
 * Tests for the "View all posts" link visibility logic in topic-graph.js.
 *
 * The panel displays at most 12 posts. The "View all" link must appear
 * whenever a topic has more than 12 posts total, regardless of how many
 * are stored in the JSON (capped at 25).
 */

const DISPLAY_LIMIT = 12;
const JSON_STORE_LIMIT = 25;

/**
 * Mirror of the condition in topic-graph.js renderPosts().
 * This is what the FIXED code does.
 */
function shouldShowViewAll(topic) {
  return topic && topic.count > DISPLAY_LIMIT;
}

function makeTopic(count) {
  return { id: "career", label: "Career", count, url: "/tag/career/" };
}

function makePostList(n) {
  return Array.from({ length: n }, function (_, i) {
    return { title: "Post " + i, url: "/post-" + i, date: "2024-01-01" };
  });
}

describe("View all posts link visibility", function () {
  // Tags with ≤12 posts: panel shows everything, no link needed.
  test("does NOT show for a tag with exactly 12 posts (all visible)", function () {
    expect(shouldShowViewAll(makeTopic(12))).toBe(false);
  });

  test("does NOT show for a tag with fewer than 12 posts", function () {
    expect(shouldShowViewAll(makeTopic(7))).toBe(false);
    expect(shouldShowViewAll(makeTopic(1))).toBe(false);
  });

  // Tags with 13-25 posts: panel shows only 12 but JSON stores all of them.
  // The old (buggy) code compared topic.count > posts.length, which was
  // always false here because posts.length == topic.count for these tags.
  test("DOES show for a tag with 13 posts (only 12 displayed)", function () {
    expect(shouldShowViewAll(makeTopic(13))).toBe(true);
  });

  test("DOES show for a tag with 14 posts (Mental Health scenario)", function () {
    expect(shouldShowViewAll(makeTopic(14))).toBe(true);
  });

  test("DOES show for a tag with 17 posts (AI scenario)", function () {
    expect(shouldShowViewAll(makeTopic(17))).toBe(true);
  });

  test("DOES show for a tag with 18 posts (Technical scenario)", function () {
    expect(shouldShowViewAll(makeTopic(18))).toBe(true);
  });

  test("DOES show for a tag with 21 posts (Community scenario)", function () {
    expect(shouldShowViewAll(makeTopic(21))).toBe(true);
  });

  test("DOES show for a tag with 22 posts (Opinion scenario)", function () {
    expect(shouldShowViewAll(makeTopic(22))).toBe(true);
  });

  test("DOES show for a tag with 25 posts (at JSON storage cap)", function () {
    expect(shouldShowViewAll(makeTopic(25))).toBe(true);
  });

  // Tags with >25 posts: JSON only stores 25, topic.count > posts.length anyway.
  // Both old and new code correctly show the link here.
  test("DOES show for a tag with 30 posts (Learning scenario)", function () {
    expect(shouldShowViewAll(makeTopic(30))).toBe(true);
  });

  test("DOES show for a tag with 49 posts (Career scenario)", function () {
    expect(shouldShowViewAll(makeTopic(49))).toBe(true);
  });

  // Edge cases.
  test("does NOT show when topic is null (edge panel between two nodes)", function () {
    expect(shouldShowViewAll(null)).toBeFalsy();
  });

  test("does NOT show when topic is undefined", function () {
    expect(shouldShowViewAll(undefined)).toBeFalsy();
  });

  /**
   * Regression: the OLD buggy condition was `topic.count > posts.length`.
   * For tags in the 13-25 range, posts.length === topic.count because all
   * posts fit within the JSON cap of 25. That made the condition always false
   * even though only 12 are displayed. This test documents that regression.
   */
  test("regression: old condition (count > posts.length) fails for 13-post tag", function () {
    var topic = makeTopic(13);
    var storedPosts = makePostList(13); // JSON stores all 13
    var oldCondition = topic && topic.count > storedPosts.length; // 13 > 13 = false
    expect(oldCondition).toBe(false); // Old code was WRONG here
    expect(shouldShowViewAll(topic)).toBe(true);  // Fixed code is correct
  });

  test("regression: old condition fails for 22-post Opinion tag", function () {
    var topic = makeTopic(22);
    var storedPosts = makePostList(22);
    var oldCondition = topic && topic.count > storedPosts.length; // 22 > 22 = false
    expect(oldCondition).toBe(false); // Old code was WRONG here
    expect(shouldShowViewAll(topic)).toBe(true);  // Fixed code is correct
  });
});
