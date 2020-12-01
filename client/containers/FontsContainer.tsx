import { useState, useCallback, useRef } from 'react';
import { createContainer } from 'unstated-next';
import { api } from '../utils/api';

interface Font {
  family: string;
}

function useFonts() {
  const requestDoneRef = useRef(false);
  const [fonts, setFonts] = useState<Font[]>();

  const fetchFonts = useCallback(async () => {
    if (requestDoneRef.current) {
      return;
    }

    requestDoneRef.current = true;
    const { data } = await api.get<Font[]>('/fonts');
    setFonts(data);
  }, []);

  return {
    fonts,
    fetchFonts,
  };
}

export const FontsContainer = createContainer(useFonts);
