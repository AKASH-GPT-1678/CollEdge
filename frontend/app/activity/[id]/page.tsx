"use client";

import { use, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Activity } from "@/app/types/Activity";
import { useRouter } from "next/navigation";
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTitleEdit, setShowTitleEdit] = React.useState(false);
  const [showDescriptionEdit, setShowDescriptionEdit] = React.useState(false);
  const [showSaveButton, setShowSaveButton] = React.useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT ?? "http://localhost:3000";
  const router = useRouter()
  useEffect(() => {
    const loadById = async () => {
      try {
        const response = await axios.get(
          `${endpoint}/activity_id/${id}`,
        );
        console.log(response.data);

        setActivity(response.data.data);
      } catch (error) {
        console.error("Failed to fetch activity:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadById();
    }
  }, [id]);

  const handleUpdateActivity = async () => {
    try {
      const response = await axios.put(
        `${endpoint}/update/${id}`,
        {
          metadata: {
            title: editedTitle,
            description: editedDescription,
          },
        },
      );

      setActivity(response.data.data);

      setEditedTitle(response.data.data.metadata.title);
      setEditedDescription(response.data.data.metadata.description);
      setShowSaveButton(false);

      setShowTitleEdit(false);
      setShowDescriptionEdit(false);

      console.log("Activity updated successfully");
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  };
  const handleDeleteActivity = async () => {
  try {
    await axios.delete(`${endpoint}/delete/${id}`);

    console.log("Activity deleted successfully");

    // Optional: redirect back to the activity list
    router.push("/");
  } catch (error) {
    console.error("Failed to delete activity:", error);
  }
};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
  ) => {
    if (!showSaveButton) {
      setShowSaveButton(true);
    }
    if (type === "title") {
      setEditedTitle(e.target.value);
    } else if (type === "description") {
      setEditedDescription(e.target.value);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">Activity Details</h1>
            <p className="text-sm text-zinc-400">
              View and manage this activity
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-5 py-10">
        {loading ? (
          <div className="text-center text-zinc-400">Loading...</div>
        ) : activity ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
            {/* Top */}
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-black">
                {activity.actorName.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold">{activity.actorName}</h2>

                <p className="mt-1 text-zinc-400">{activity.type}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button className="bg-red-500 p-2 cursor-pointer text-white rounded-lg" onClick={handleDeleteActivity}>
                  Delete
                </button>

                <span className="text-sm text-zinc-500">
                  {new Date(activity.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Divider */}

            <div className="my-8 border-b border-zinc-800" />

            {/* Title */}

            <div>
              <p className="mb-2 text-sm uppercase tracking-widest text-zinc-500">
                Title
              </p>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {showTitleEdit ? (
                    <input
                      type="text"
                      defaultValue={activity.metadata.title}
                      placeholder="Enter title..."
                      onChange={(e) => handleInputChange(e, "title")}
                      className="
            w-full
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-800/70
            px-5
            py-3
            text-3xl
            font-bold
            text-white
            placeholder:text-zinc-500
            outline-none
            transition-all
            duration-300
            focus:border-white
            focus:bg-zinc-800
            focus:ring-2
            focus:ring-white/20
          "
                    />
                  ) : (
                    <h3 className="text-3xl font-bold">
                      {activity.metadata.title}
                    </h3>
                  )}
                </div>

                <button
                  onClick={() => setShowTitleEdit(!showTitleEdit)}
                  className="
        rounded-full
        border
        border-zinc-700
        bg-zinc-800
        px-4
        py-2
        text-sm
        font-medium
        text-zinc-300
        transition-all
        duration-200
        hover:border-white
        hover:bg-zinc-700
        hover:text-white
      "
                >
                  {showTitleEdit ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>

            {/* Description */}

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm uppercase tracking-widest text-zinc-500">
                  Description
                </p>

                <button
                  onClick={() => setShowDescriptionEdit(!showDescriptionEdit)}
                  className="
        rounded-full
        border
        border-zinc-700
        bg-zinc-800
        px-4
        py-2
        text-sm
        font-medium
        text-zinc-300
        transition-all
        duration-200
        hover:border-white
        hover:bg-zinc-700
        hover:text-white
      "
                >
                  {showTitleEdit ? "Cancel" : "Edit"}
                </button>
              </div>

              {showDescriptionEdit ? (
                <textarea
                  defaultValue={activity.metadata.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  placeholder="Enter description..."
                  rows={8}
                  className="
        w-full
        resize-none
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-800/70
        px-5
        py-4
        text-lg
        leading-8
        text-white
        placeholder:text-zinc-500
        outline-none
        transition-all
        duration-300
        focus:border-white
        focus:bg-zinc-800
        focus:ring-2
        focus:ring-white/20
      "
                />
              ) : (
                <p className="whitespace-pre-line text-lg leading-8 text-zinc-300">
                  {activity.metadata.description}
                </p>
              )}
            </div>

            {/* Info Cards */}

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-zinc-800 p-5">
                <p className="text-sm text-zinc-400">Entity ID</p>

                <p className="mt-2 text-xl font-semibold">
                  {activity.entityId}
                </p>
              </div>

              <div className="rounded-2xl bg-zinc-800 p-5">
                <p className="text-sm text-zinc-400">Tenant ID</p>

                <p className="mt-2 break-all text-sm">{activity.tenantId}</p>
              </div>

              <div className="rounded-2xl bg-zinc-800 p-5">
                <p className="text-sm text-zinc-400">Last Updated</p>

                <p className="mt-2 text-sm">
                  {new Date(activity.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            {showSaveButton && (
              <button
                className="bg-blue-500 p-3 mt-4 rounded-2xl cursor-pointer w-full"
                onClick={handleUpdateActivity}
              >
                Save Changes
              </button>
            )}
          </div>
        ) : (
          <div className="text-center text-zinc-500">Activity not found.</div>
        )}
      </div>
    </div>
  );
}
