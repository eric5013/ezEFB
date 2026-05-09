// features/ui/gestures/useSwipe.ts
import { useState, useEffect } from 'react';

export function useSwipe(onLeft, onRight) {
  const [touch, setTouch] = useState(null);

  useEffect(() => {
    const h = (e) => {
      if (!touch) return setTouch(e.touches[0].clientX);
      if (touch - e.touches[0].clientX > 50) onLeft?.();
      if (e.touches[0].clientX - touch > 50) onRight?.();
      setTouch(null);
    };
    window.addEventListener('touchmove', h);
    return () => window.removeEventListener('touchmove', h);
  }, [touch]);
}