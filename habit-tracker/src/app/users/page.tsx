"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";

/* ---------------- SCHEMA ---------------- */

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["USER", "ADMIN"]),
});

type UserFormData = z.infer<typeof userSchema>;

/* ---------------- PAGE ---------------- */

export default function UsersPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormData) => {
    console.log("User Form Submitted:", data);
    alert("User data submitted successfully!");
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Add User (Unit 2.30)
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-gray-50 p-6 border rounded-lg"
      >
        {/* EMAIL */}
        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        {/* ROLE */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Role</label>

          <select
            {...register("role")}
            className={`border p-2 rounded ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.role}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          {errors.role && (
            <p className="text-red-500 text-sm">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}
