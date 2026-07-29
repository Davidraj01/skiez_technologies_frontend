import React from "react";

export default function JobApplyModal({ job, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Job Application:", data);
    alert("Application submitted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-card text-foreground w-full max-w-lg rounded-xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-1">Apply for {job.title}</h2>
        <p className="text-muted-foreground mb-6">
          {job.location} • {job.type}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="jobTitle" value={job.title} />

          <Field label="Full Name" name="name" />
          <Field label="Mobile Number" name="mobile" type="tel" />
          <Field label="Email ID" name="email" type="email" />
          <Field label="City" name="city" />
          <Field label="State" name="state" />
          <Field label="Date of Birth" name="dob" type="date" />

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:opacity-90 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        required
        type={type}
        name={name}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
