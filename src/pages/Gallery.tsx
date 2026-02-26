import React, { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import Container from "../components/ui/Container";
import { X, ZoomIn, ArrowLeft, ArrowRight,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const images = [
    { id: 1, src: "https://ruson.su/upload/iblock/003/n8v1utizsg47h660mdcfwg9rhbdn6pcn.png", category: "modern", year: "2023", area: "18 м²" },
    { id: 2, src: "https://www.mebelmsk.ru/upload/resize_cache/iblock/05d/950_700_1/05ddcc51abb5e211db489ba6a84a3fdd.jpg",  category: "modern", year: "2022", area: "24 м²" },
    { id: 3, src: "https://bigmebel-msk.ru/wp-content/uploads/2017/01/klasskika-belaya-uglovaya-patina1.jpg",  category: "classic", year: "2023", area: "30 м²" },
    { id: 4, src: "https://mebelbor.ru/upload/iblock/36b/4xrte6l34egan7o97q3egqlajv15l0er.jpg", category: "loft", year: "2022", area: "16 м²" },
    { id: 5, src: "https://cache3.youla.io/files/images/780_780/5d/da/5ddac0b73f53c4b8772c0294.jpg",  category: "scandi", year: "2023", area: "12 м²" },
    { id: 6, src: "https://cs1.livemaster.ru/storage/80/4a/ba78c87cf8e544969819e9fc59qo--dlya-doma-i-interera-kuhnya-uglovaya.jpg",  category: "modern", year: "2023", area: "28 м²" },
    { id: 7, src: "https://cs2.livemaster.ru/storage/05/4d/dd97adc25138bf2f735c53cc4c7z--dlya-doma-i-interera-kuhnya-uglovaya-pod-zakaz.jpg",  category: "scandi", year: "2022", area: "9 м²" },
    { id: 8, src: "http://furniture-mos.ru/userfiles/живые%20фото%20мебели/живые%20фото%20мебели%202/image5.JPEG", category: "scandi", year: "2023", area: "14 м²" },
    { id: 9, src: "https://cdn0.youla.io/files/images/720_720_out/62/91/6291e56538184f6c22238b6c-1.jpg",  category: "loft", year: "2023", area: "20 м²" },
  ];

  const categories = [
    { id: "all", label: "Все проекты" },
    { id: "modern", label: "Современные" },
    { id: "classic", label: "Классика" },
    { id: "scandi", label: "Сканди" },
    { id: "loft", label: "Лофт" },
  ];

  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  const currentImage = images.find(img => img.id === selectedImage);

  return (
    <Layout>
      <div className="pt-24 pb-12 min-h-screen bg-[#FAFAF8]">
        <Container>
           {/* Header */}
           <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-primary"
              >
                Галерея работ
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-text-medium max-w-2xl mx-auto text-lg leading-relaxed"
              >
                 Вдохновение в каждой детали. Посмотрите реализованные проекты, 
                 чтобы найти идеи для вашего идеального пространства
              </motion.p>
           </div>

           {/* Filters */}
           <div className="flex justify-center mb-12 sticky top-20 z-30">
              <div className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-soft border border-gray-100 flex items-center gap-2 overflow-x-auto max-w-full scrollbar-hide">
                 {categories.map(cat => (
                    <button
                       key={cat.id}
                       onClick={() => setActiveCategory(cat.id)}
                       className={cn(
                          "px-5 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium",
                          activeCategory === cat.id 
                            ? "bg-primary text-white shadow-md" 
                            : "text-text-medium hover:bg-gray-100 hover:text-primary"
                       )}
                    >
                       {cat.label}
                    </button>
                 ))}
              </div>
           </div>

           {/* Masonry Grid */}
           <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              <AnimatePresence>
                {filteredImages.map((img) => (
                   <motion.div
                      layout
                      key={img.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                      onClick={() => setSelectedImage(img.id)}
                   >
                      <img src={img.src}  className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                         <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-white">
                            <p className="text-xs uppercase tracking-wider mb-2 opacity-80">{img.category} • {img.year}</p>
                            <h3 className="font-playfair text-2xl font-bold flex items-center justify-between">
                               
                               <ZoomIn className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
                            </h3>
                         </div>
                      </div>
                   </motion.div>
                ))}
              </AnimatePresence>
           </motion.div>
        </Container>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && currentImage && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
             onClick={() => setSelectedImage(null)}
           >
              {/* Close Button */}
              <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]">
                 <X size={40} />
              </button>

              {/* Navigation Buttons */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-[110] hidden md:block"
              >
                <ArrowLeft size={39} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-[110] hidden md:block"
              >
                <ArrowRight size={40} />
              </button>

              {/* Image Container */}
              <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.9, opacity: 0 }}
                 className="relative max-w-[90vw] max-h-[90vh]"
                 onClick={e => e.stopPropagation()} 
              >
                 <img 
                    src={currentImage.src} 
                  
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
                 />
                 
                 {/* Image Info */}
                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white rounded-b-lg">
                    <div className="flex justify-between items-end">
                       <div>
                          
                          <div className="flex gap-4 text-sm text-white/80">
                             <span>{categories.find(c => c.id === currentImage.category)?.label}</span>
                             <span>•</span>
                             <span>{currentImage.area}</span>
                             <span>•</span>
                             <span>{currentImage.year}</span>
                          </div>
                       </div>
                       <div className="text-white/50 text-sm hidden sm:block">
                          {filteredImages.findIndex(img => img.id === selectedImage) + 1} / {filteredImages.length}
                       </div>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;