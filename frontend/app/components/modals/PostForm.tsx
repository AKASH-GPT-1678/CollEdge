"use client";

import React from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { z } from "zod";

interface PostProps {
  setShowActivity: React.Dispatch<React.SetStateAction<boolean>>;
}

const activitySchema = z.object({
  actorId: z.string().min(1, "Actor ID is required"),
  actorName: z.string().min(1, "Actor Name is required"),
  type: z.enum(["NOTICE", "REPORT", "ACTIVITY", "UPDATE"], {
    message: "Please select a type",
  }),
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters"),
});

export default function PostCreatedForm({
  setShowActivity,
}: PostProps) {
  const endpoint =
    process.env.NEXT_PUBLIC_ENDPOINT ?? "http://localhost:3000";

  const tenantId =
    typeof window !== "undefined"
      ? localStorage.getItem("tenant-id")
      : null;

  const [form, setForm] = React.useState({
    tenantId: "",
    actorId: "",
    actorName: "",
    type: "",
    title: "",
    description: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result = activitySchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        actorId: fieldErrors.actorId?.[0] ?? "",
        actorName: fieldErrors.actorName?.[0] ?? "",
        type: fieldErrors.type?.[0] ?? "",
        title: fieldErrors.title?.[0] ?? "",
        description: fieldErrors.description?.[0] ?? "",
      });

      return;
    }

    setErrors({});

    const payload = {
      tenantId,
      actorId: form.actorId,
      actorName: form.actorName,
      type: form.type,
      metadata: {
        title: form.title,
        description: form.description,
      },
    };

    try {
      const res = await axios.post(`${endpoint}/activities`, payload);

      if (res.status === 201) {
        setShowActivity(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative rounded-2xl bg-white p-8 shadow-2xl">
      <div
        className="absolute -right-1 -top-3 cursor-pointer rounded-full bg-white p-2"
        onClick={() => setShowActivity(false)}
      >
        <ImCross size={20} className="text-red-500" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-4 sm:w-72 md:w-96"
      >
   
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Actor ID
          </span>

          <input
            name="actorId"
            value={form.actorId}
            onChange={handleChange}
            placeholder="Enter actor ID"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          {errors.actorId && (
            <p className="text-sm text-red-500">{errors.actorId}</p>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Actor Name
          </span>

          <input
            name="actorName"
            value={form.actorName}
            onChange={handleChange}
            placeholder="Enter actor name"
            className="w-full rounded-lg border border-gray-300 px-4 text-black py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          {errors.actorName && (
            <p className="text-sm text-red-500">
              {errors.actorName}
            </p>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Type
          </span>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select a type</option>
            <option value="NOTICE">NOTICE</option>
            <option value="REPORT">REPORT</option>
            <option value="ACTIVITY">ACTIVITY</option>
            <option value="UPDATE">UPDATE</option>
          </select>

          {errors.type && (
            <p className="text-sm text-red-500">{errors.type}</p>
          )}
        </label>

        {/* Title */}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Title
          </span>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">
            Description
          </span>

          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          {errors.description && (
            <p className="text-sm text-red-500">
              {errors.description}
            </p>
          )}
        </label>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}