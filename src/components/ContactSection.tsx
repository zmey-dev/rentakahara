import { useState } from "react";
import { Mail, MessageSquare, Send, MapPin, Phone, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AngelCanvas from "./AngelCanvas";

const ContactSection = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
        duration: 5000,
      });

      // Reset form after success
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success state after a delay
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 relative overflow-hidden bg-secondary/30"
    >
      {/* Angel-themed Canvas Background */}
      <AngelCanvas />

      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary/10 via-primary/5 to-transparent opacity-50 blur-3xl" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
            Get in Touch
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Contact Me
          </h3>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Have a project in mind or want to discuss AI-powered solutions? I'm
            here to answer your questions and help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-6 rounded-xl backdrop-blur-sm">
              <h4 className="text-xl font-display font-medium mb-6">
                Contact Information
              </h4>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="text-sm text-foreground/60 mb-1">Email</h5>
                    <a
                      href="mailto:lavendarsolution@outlook.com"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      lavendarsolution@outlook.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="text-sm text-foreground/60 mb-1">Phone</h5>
                    <a
                      href="tel:+380914817095"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      +380914817095
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="text-sm text-foreground/60 mb-1">
                      Location
                    </h5>
                    <p className="text-foreground">
                      21 Dniprovska Street
                      <br />
                      Pridniprianske, Poltavska Oblast
                      <br />
                      Ukraine, 39282
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 md:p-8 rounded-xl backdrop-blur-sm">
              <h4 className="text-xl font-display font-medium mb-6">
                Send Me a Message
              </h4>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-foreground/80 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-foreground/80 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm text-foreground/80 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-foreground/80 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="I'm interested in discussing a web or AI project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    isSuccess
                      ? "bg-green-600 text-white"
                      : "bg-primary text-primary-foreground hover:brightness-110"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check size={18} />
                      Message Sent
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
