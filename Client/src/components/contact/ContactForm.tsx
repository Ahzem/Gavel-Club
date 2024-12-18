import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });

    try {
      console.log("Env variables check:", {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        hasPublicKey: !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      });
      if (
        !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
        !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
        !import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ) {
        throw new Error(`Missing EmailJS configuration: 
          ${!import.meta.env.VITE_EMAILJS_SERVICE_ID ? "SERVICE_ID" : ""} 
          ${!import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? "TEMPLATE_ID" : ""} 
          ${!import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? "PUBLIC_KEY" : ""}`);
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ loading: false, error: "", success: true });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        loading: false,
        error: "Failed to send message. Please try again.",
        success: false,
      });
    }
  };

  return (
    <motion.div
      className="contact-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="contact-form__title">Send us a message</h2>
      <form className="contact-form__form" onSubmit={handleSubmit}>
        <div className="contact-form__group">
          <label className="contact-form__label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="contact-form__input"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact-form__group">
          <label className="contact-form__label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="contact-form__input"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact-form__group">
          <label className="contact-form__label" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="contact-form__textarea"
            placeholder="Type your message here"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="contact-form__button"
          disabled={status.loading}
        >
          {status.loading ? "Sending..." : "Send Message"}
        </button>

        {status.error && (
          <p className="contact-form__message contact-form__error">
            {status.error}
          </p>
        )}

        {status.success && (
          <p className="contact-form__message contact-form__success">
            Message sent successfully!
          </p>
        )}
      </form>
    </motion.div>
  );
}
