import { useState, useEffect } from 'react';
import { Waypoint } from '@/app/types';

export const NotesPanel = ({
  waypoint,
  onChange,
}: {
  waypoint: Waypoint;
  onChange: (notes: string, images: string[]) => void;
}) => {
  const [notes, setNotes] = useState(waypoint.notes || '');
  const [images, setImages] = useState<string[]>(waypoint.images || []);

  useEffect(() => {
    onChange(notes, images);
  }, [notes, images]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImages([...images, ev.target?.result as string]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h3 className="text-lg font-bold mb-2">{waypoint.id}</h3>
      <div
        contentEditable
        className="min-h-[120px] bg-neutral-700 rounded p-2 outline-none"
        onBlur={(e) => setNotes(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: notes }}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-4" />
      {images.map((img, i) => (
        <img key={i} src={img} className="mt-2 rounded" />
      ))}
    </div>
  );
};