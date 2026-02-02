"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";

// 1️⃣ Zod schema
const addUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

export default function AddUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
  });

  // 2️⃣ Submit handler
  const onSubmit = async (data: AddUserFormData) => {
    console.log("User Data:", data);

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    reset();
  };

  return (
    <div className="max-w-md mt-6 p-6 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Add User</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        <button
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
}
