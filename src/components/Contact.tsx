"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [activeFormats, setActiveFormats] = useState<{
    bold: boolean;
    italic: boolean;
    underline: boolean;
  }>({
    bold: false,
    italic: false,
    underline: false,
  });
  const messageRef = useRef<HTMLDivElement>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const htmlContent = messageRef.current?.innerHTML || '';
    console.log("Form submission:", { email, name, message: htmlContent });
  };

  const applyFormat = (command: string, value?: string) => {
    try {
      if (messageRef.current) {
        messageRef.current.focus();
      }
      const success = document.execCommand(command, false, value);
      if (!success && (command === 'insertUnorderedList' || command === 'insertOrderedList')) {
        document.execCommand(command);
      }
    } catch (error) {
      console.error('Format command failed:', command, error);
    }
  };

  const handleMessageChange = () => {
    if (messageRef.current) {
      const textContent = messageRef.current.textContent?.trim() || '';
      setMessage(textContent);
      if (!textContent) {
        document.execCommand('insertUnorderedList', false);
        document.execCommand('insertOrderedList', false);
        messageRef.current.innerHTML = '';
        setMessage('');
      }
      updateActiveFormats();
    }
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };

  const handleFormatClick = (command: string) => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
    applyFormat(command);
    setTimeout(() => {
      updateActiveFormats();
    }, 10);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="md:hidden bg-gradient-to-b from-white/5 to-transparent text-gray-200 py-12 px-4 sm:px-6 border-y border-white/10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="max-w-2xl mx-auto"
      >

        {/* Contact Form */}
        <motion.div variants={sectionVariants}>
          <h3 className="text-xs font-bold mb-4 tracking-widest uppercase text-white/60" style={{ fontFamily: 'KH Teka, sans-serif' }}>
            Start a Project
          </h3>
          <motion.p 
            className="text-base sm:text-lg font-light mb-6 text-white/80 leading-relaxed"
            variants={itemVariants}
            style={{ fontFamily: 'KH Teka, sans-serif' }}
          >
            Ready to bring your ideas to life? Let's discuss your next project.
          </motion.p>
          
          <motion.form 
            onSubmit={handleNewsletterSubmit} 
            className="space-y-3"
            variants={sectionVariants}
          >
            <div className="grid grid-cols-1 gap-3">
              <motion.div variants={itemVariants}>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="px-0 h-10 placeholder-gray-400 bg-transparent border-0 border-b border-white/30 text-white font-light focus:border-white hover:border-white/60 transition-colors focus:outline-none focus-visible:ring-0 rounded-none text-base"
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-0 h-10 placeholder-gray-400 bg-transparent border-0 border-b border-white/30 text-white font-light focus:border-white hover:border-white/60 transition-colors focus:outline-none focus-visible:ring-0 rounded-none text-base"
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                />
              </motion.div>
            </div>
            <motion.div variants={itemVariants}>
              <div className="relative border-0 border-b border-white/30 focus-within:border-white transition-colors">
                {message && (
                  <div className="absolute top-0 right-0 flex gap-2 z-10 pr-1">
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormatClick('bold')}
                      className={`py-2 px-1.5 transition-all duration-200 text-xs font-semibold ${
                        activeFormats.bold
                          ? 'text-white bg-white/10 rounded'
                          : 'text-white/60 hover:text-white'
                      }`}
                      title="Bold (Ctrl+B)"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormatClick('italic')}
                      className={`py-2 px-1.5 transition-all duration-200 text-xs italic ${
                        activeFormats.italic
                          ? 'text-white bg-white/10 rounded'
                          : 'text-white/60 hover:text-white'
                      }`}
                      title="Italic (Ctrl+I)"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormatClick('underline')}
                      className={`py-2 px-1.5 transition-all duration-200 text-xs underline ${
                        activeFormats.underline
                          ? 'text-white bg-white/10 rounded'
                          : 'text-white/60 hover:text-white'
                      }`}
                      title="Underline (Ctrl+U)"
                    >
                      U
                    </button>
                    <span className="w-px bg-white/20"></span>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormatClick('insertUnorderedList')}
                      className="py-2 px-1.5 hover:text-white transition-all duration-200 text-white/60 text-xs"
                      title="Bullet List"
                    >
                      •
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormatClick('insertOrderedList')}
                      className="py-2 px-1.5 hover:text-white transition-all duration-200 text-white/60 text-xs font-semibold"
                      title="Numbered List"
                    >
                      1.
                    </button>
                  </div>
                )}
                <div
                  ref={messageRef}
                  contentEditable
                  onInput={handleMessageChange}
                  suppressContentEditableWarning
                  className="w-full px-0 py-2 bg-transparent text-white font-light focus:outline-none text-base min-h-[100px] max-h-[150px] overflow-y-auto whitespace-pre-wrap break-words [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1"
                  style={{
                    fontFamily: 'KH Teka, sans-serif',
                    paddingTop: message ? '32px' : '8px',
                    backgroundImage: message ? 'none' : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="0" y="14" font-size="16" fill="rgba(255,255,255,0.3)" font-family="KH Teka, sans-serif" font-weight="300">Your Message</text></svg>')`,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="group bg-white text-black px-6 py-2.5 font-medium uppercase text-xs tracking-widest hover:bg-white/90 transition-all duration-300 w-auto"
              >
                Send Message
                <ExternalLink className="ml-2 w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.form>
          
          <motion.p 
            className="text-xs mt-4 text-gray-500 font-light"
            variants={itemVariants}
          >
            Your information is secure and will never be shared with third parties.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
