import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
 v.literal("image"),
 v.literal("csv"),
 v.literal("pdf")
);

export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
 files: defineTable({
  name: v.string(),
  type: fileTypes,
  fileId: v.id("_storage"),
  orgId: v.string(),
  shouldDelete: v.optional(v.boolean()),
  updatedAt: v.optional(v.any()),
 })
  .index("by_orgId", ["orgId"])
  .index("by_shouldDelete", ["shouldDelete"]),
 fevorites: defineTable({
  fileId: v.id("files"),
  orgId: v.string(),
  userId: v.id("users"),
 }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId"]),
 users: defineTable({
  tokenIdentifier: v.string(),
  orgIds: v.array(
   v.object({
    orgId: v.string(),
    role: roles,
   })
  ),
 }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
