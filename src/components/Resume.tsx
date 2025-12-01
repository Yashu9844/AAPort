'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Resume() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Yashavanth_R_Siddesh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
      >
        {/* Preview Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePreview}
          className="group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white hover:border-white hover:bg-white/5 transition-all duration-300 rounded-lg text-sm sm:text-base font-light tracking-wider uppercase"
          style={{ fontFamily: 'KH Teka, sans-serif' }}
        >
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-300" />
          Preview Resume
        </motion.button>

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-lg text-sm sm:text-base font-medium tracking-wider uppercase"
          style={{ fontFamily: 'KH Teka, sans-serif' }}
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          Download Resume
        </motion.button>
      </motion.div>
    </div>
  );
}
