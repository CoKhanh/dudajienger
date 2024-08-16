import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const getById = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const tasks = ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("_id"), args.id)).first()

    return tasks;
  }
})

export const createTask = mutation({
  args: { text: v.string(), isCompleted: v.boolean(), personInCharge: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("tasks", { text: args.text, isCompleted: args.isCompleted, personInCharge: args.personInCharge });
    return newTaskId;
  },
});
