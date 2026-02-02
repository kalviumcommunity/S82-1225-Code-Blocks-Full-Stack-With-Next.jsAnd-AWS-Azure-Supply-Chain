"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import FormInput from "@/components/FormInput";
import Loader from "@/components/Loader";
import ConfirmModal from "@/components/ConfirmModal";
import { saveUser } from "@/lib/fakeApi";

/* ---------- SCHEMA ---------- */
const userSchema = z.object({
  email: z.string().email("Invalid email"),
  role: z.enum(["USER", "ADMIN"]),
});

type UserFormData = z.infer<typeof userSchema>;

export default function UsersPage() {
  const [showModal, setShowModal] = useState(false);
  const [pendingData, setPendingData] = useState<UserFormData | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormData) => {
    setPendingData(data);
    setShowModal(true);
  };

  const confirmSave = async () => {
    if (!pendingData) return;

    setShowModal(false);
    setLoading(true);

    toast.loading("Saving user...");

    try {
      await saveUser(pendingData);
      toast.success("User saved successfully!");
    } catch {
      toast.error("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        User Feedback Demo (Unit 2.31)
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border p-6 rounded bg-gray-50"
      >
        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        <div>
          <label className="font-medium">Role</label>
          <select {...register("role")} className="border p-2 rounded w-full">
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        {loading && <Loader />}

        <button className="bg-blue-600 text-white py-2 rounded">
          Submit
        </button>
      </form>

      <ConfirmModal
        open={showModal}
        title="Confirm Submission"
        message="Are you sure you want to save this user?"
        onConfirm={confirmSave}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}
