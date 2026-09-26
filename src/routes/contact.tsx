import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — FandomVerse" },
      {
        name: "description",
        content: "Suggest a title, report a problem, or just say hello to the FandomVerse crew.",
      },
      { property: "og:title", content: "Contact Us — FandomVerse" },
      {
        property: "og:description",
        content: "Get in touch with the team behind FandomVerse.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "That email doesn't look right.";
    if (form.message.trim().length < 10) next.message = "A little more detail, please (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    toast.success("Message sent", { description: "We'll reply within a couple of days." });
    setForm({ name: "", email: "", message: "" });
  };

  const field =
    "mt-1.5 w-full rounded-lg border border-input bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold sm:text-5xl">Contact us</h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        Missing a title you love? Spotted a bug in orbit? Send it our way.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-xl border border-border bg-card p-6"
          noValidate
        >
          <label className="block text-sm font-medium">
            Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
              placeholder="Your name"
            />
          </label>
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}

          <label className="mt-5 block text-sm font-medium">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={field}
              placeholder="you@example.com"
            />
          </label>
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}

          <label className="mt-5 block text-sm font-medium">
            Message
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${field} resize-y`}
              placeholder="What's on your mind?"
            />
          </label>
          {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}

          <button
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <Send className="size-4" /> Send message
          </button>
        </motion.form>

        <div>
          <div
            className="rounded-2xl border border-border p-3"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              initial={{ opacity: 0, rotateX: 22, rotateY: -14 }}
              animate={{ opacity: 1, rotateX: 14, rotateY: -9 }}
              whileHover={{ rotateX: 4, rotateY: -2, scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="overflow-hidden rounded-xl border border-border shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <iframe
                title="FandomVerse studio location"
                src="https://www.google.com/maps?q=25.2541944,51.5429354(Aptech%20Qatar)&z=16&output=embed"
                className="h-[340px] w-full border-0 grayscale-[35%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          <div className="mt-8 space-y-4 text-sm">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span className="text-muted-foreground">Doha, Qatar</span>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-accent" />
              <span className="text-muted-foreground">codebusterssss@gmail.com</span>
            </p>
            <p className="flex items-center gap-3">
              <MessageSquare className="size-4 shrink-0 text-accent" />
              <span className="text-muted-foreground">Replies usually within two days.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
