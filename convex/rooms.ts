import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("rooms").collect();
  },
});

export const getById = query({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    const messages = ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("_id"), args.id)).first();

    return messages;
  }
})

export const addMember = mutation({
  args: { id: v.id("rooms"), newMember: v.string() },
  handler: async (ctx, args) => {
    const { id } = args;
    const room = await ctx.db.get(id);

    await ctx.db.patch(id, { members: [...room.members, args.newMember] });
  }
})
