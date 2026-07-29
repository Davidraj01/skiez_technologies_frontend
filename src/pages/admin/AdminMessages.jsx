import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Mail, MailOpen, Trash2, ChevronDown } from "lucide-react";
import api from "../../lib/api";
import AdminNav from "../../components/admin/AdminNav";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadMessages = () => {
    setLoading(true);
    api
      .get("/admin/contact")
      .then((res) => setMessages(res.data))
      .catch(() => toast.error("Couldn't load messages"))
      .finally(() => setLoading(false));
  };

  useEffect(loadMessages, []);

  const toggleOpen = async (msg) => {
    const willOpen = openId !== msg._id;
    setOpenId(willOpen ? msg._id : null);

    if (willOpen && !msg.read) {
      try {
        const res = await api.patch(`/admin/contact/${msg._id}/read`, { read: true });
        setMessages((prev) => prev.map((m) => (m._id === msg._id ? res.data : m)));
      } catch {
        // silently ignore, read state is non-critical
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message? This can't be undone.")) return;

    setDeletingId(id);
    try {
      await api.delete(`/admin/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success("Message deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete message");
    } finally {
      setDeletingId(null);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <AdminNav />

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-cyan-600 text-white text-xs font-semibold">
              {unreadCount} unread
            </span>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
          </div>
        )}

        {!loading && messages.length === 0 && (
          <p className="text-center text-slate-400 py-16">No messages yet.</p>
        )}

        {!loading && messages.length > 0 && (
          <div className="bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden">
            {messages.map((msg) => {
              const open = openId === msg._id;
              return (
                <div key={msg._id} className="border-b border-slate-800 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleOpen(msg)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {msg.read ? (
                        <MailOpen className="w-5 h-5 text-slate-500 flex-shrink-0" />
                      ) : (
                        <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className={`font-semibold truncate ${msg.read ? "text-slate-300" : "text-white"}`}>
                          {msg.name}
                          <span className="text-slate-500 font-normal ml-2 text-sm">{msg.email}</span>
                        </p>
                        {!open && (
                          <p className="text-sm text-slate-500 truncate mt-0.5">{msg.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-slate-500 hidden sm:block">
                        {new Date(msg.createdAt).toLocaleDateString("en-IN")}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {open && (
                    <div className="px-6 pb-6 pl-16">
                      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        disabled={deletingId === msg._id}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors disabled:opacity-50 text-sm"
                      >
                        {deletingId === msg._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
