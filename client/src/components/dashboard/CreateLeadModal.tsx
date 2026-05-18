import { useState } from "react";

interface Props {
  open: boolean;

  onClose: () => void;

  onSubmit: (data: {
    name: string;
    email: string;
    company: string;
    status: string;
  }) => void;
}

const CreateLeadModal = ({
  open,
  onClose,
  onSubmit,
}: Props) => {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      company: "",
      status: "new",
    });

  if (!open) return null;

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      name: "",
      email: "",
      company: "",
      status: "new",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Add Lead
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-black dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Lead Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 text-black dark:text-white rounded-xl px-4 py-3"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 text-black dark:text-white rounded-xl px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: e.target.value,
              })
            }
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 text-black dark:text-white rounded-xl px-4 py-3"
            required
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 text-black dark:text-white rounded-xl px-4 py-3"
          >
            <option value="new">
              New
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="qualified">
              Qualified
            </option>

            <option value="won">
              Won
            </option>

            <option value="lost">
              Lost
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Create Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadModal;