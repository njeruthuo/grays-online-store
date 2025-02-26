import { useState } from "react";

const Images = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <section className="w-full">
      <div className="w-full" id="currentImage">
        <img src={currentImage} className="w-full rounded-md" alt="" />
      </div>

      {images.length > 1 && (
        <div id="allImages" className="flex overflow-x-auto space-x-1 my-1">
          {images.map((image) => (
            <div className="w-1/5 " onClick={() => setCurrentImage(image)}>
              <img src={image} alt="" className="h-16" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default Images;
