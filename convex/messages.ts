import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

export const getByRoom = query({
  args: { roomId: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("roomId"), args.roomId)).collect();

    return Promise.all(
      messages.map(async (message) => ({
        ...message,
        ...(message.type !== "string"
          ? { url: await ctx.storage.getUrl(message.storageId) }
          : {}),
      })),
    );;
  }
})

export const insertMessage = mutation({
  args: { roomId: v.string(), sender: v.string(), message: v.string(), type: v.string() },
  handler: async (ctx, args) => {
    const newMessage = await ctx.db.insert("messages", { roomId: args.roomId, sender: args.sender, message: args.message, type: args.type });
    return newMessage;
  },
});

export const insertMessageV2 = mutation({
  args: { storageId: v.optional(v.id("_storage")), roomId: v.string(), sender: v.string(), message: v.string(), type: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      roomId: args.roomId,
      sender: args.sender,
      message: args.message,
      storageId: args.storageId,
      type: args.type,
    });
  },
});
