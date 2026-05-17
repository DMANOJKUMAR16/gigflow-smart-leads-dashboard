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

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          Create Lead
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
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
            className="w-full border rounded-lg px-4 py-3"
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
            className="w-full border rounded-lg px-4 py-3"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="w-full border rounded-lg px-4 py-3"
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
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit(formData);

              onClose();
            }}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLeadModal;