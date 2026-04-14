"use client";

import { followAuthor, unfollowAuthor } from "@/actions/follow";

export function FollowButton({
  authorId,
  isFollowed,
}: {
  authorId: number;
  isFollowed: boolean;
}) {
  return (
    <button
      className="btn btn-xs btn-ghost w-20"
      onClick={() => (isFollowed ? unfollowAuthor(authorId) : followAuthor(authorId))}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
}
