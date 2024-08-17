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

  const mutationTaskWithObject = useMutation(api.tasks.createTaskWithObjectField);
  const onClickCreateTaskWithObject = () => {
    mutationTaskWithObject({
      tasks: {
        name: "my name",
        label: "frontend"
      }
    })
  }
  
  const mutationTaskWithArrObject = useMutation(api.tasks.createTaskWithArrObjectField);
  const onClickCreateTaskWithArrObject = () => {
    mutationTaskWithArrObject({
      tasks: [
        {
          name: "my task",
          label: "frontend"
        },
        {
          name: "my task 2",
          label: "backend"
        },
      ]
    })
  }

  const mutationAddMember = useMutation(api.rooms.addMember);
  const onClickAddMember = () => {
    mutationAddMember({
      id: "j972tdx8xy5b09ga9frjjagcsn6yztc3" as Id<"rooms">,
      newMember: "user2"
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {tasks?.map(({ _id, text, isCompleted }) => <div key={_id}>{text}</div>)} */}
      <button onClick={onClickAddMember}>Insert</button>
    </main>
  );
}

export default ConvexTask;
