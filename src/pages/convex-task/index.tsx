"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const ConvexTask = () => {
  const tasks = useQuery(api.tasks.get);
  const id = "j57dhtkd7ypa5fkr72qzrbgs9d6yx0cd" as Id<"tasks">

  const task = useQuery(api.tasks.getById, { id });

  const mutationTask = useMutation(api.tasks.createTask);
  const onClick = () => {
    mutationTask({ text: "khanh mutation", isCompleted: true, personInCharge: "khanh" })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text, isCompleted }) => <div key={_id}>{text}</div>)}
      <button onClick={onClick}>Insert</button>
    </main>
  );
}

export default ConvexTask;
