"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { FormEvent, useRef, useState } from "react";

const ConvexTask = () => {
  const tasks = useQuery(api.tasks.get);
  const id = "j57dhtkd7ypa5fkr72qzrbgs9d6yx0cd" as Id<"tasks">

  const task = useQuery(api.tasks.getById, { id });

  const files = useQuery(api.files.list);
  console.log('files: ', files);

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

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const sendImage = useMutation(api.files.sendImage);
  const sendImageToMsg = useMutation(api.messages.insertMessageV2);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
  async function handleSendImage(event: FormEvent) {
    event.preventDefault();

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    });
    const { storageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    // await sendImage({ storageId, author: name });
    await sendImageToMsg({
      // storageId,
      sender: "user1",
      roomId: "j976k8ybkqa5c3vycafgn3cs3n6yz5fj",
      message: "send file",
      type: "string"
    })

    setSelectedImage(null);
    imageInput.current!.value = "";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {tasks?.map(({ _id, text, isCompleted }) => <div key={_id}>{text}</div>)} */}
      <button onClick={onClickAddMember}>Insert</button>

      <form onSubmit={handleSendImage}>
        <input
          type="file"
          ref={imageInput}
          onChange={(event) => setSelectedImage(event.target.files![0])}
          disabled={selectedImage !== null}
        />
        <input
          type="submit"
          value="Send Image"
          disabled={selectedImage === null}
        />
      </form>
      {files?.map(({ _id, url }) => <img key={_id} src={url} height="300px" width="auto" />)}

    </main>
  );
}

export default ConvexTask;
