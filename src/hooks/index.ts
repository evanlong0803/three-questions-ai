import { useState, useEffect, RefObject } from 'react';

export const useTripleQuestionMarks = (
  targetElement: RefObject<HTMLElement>,
  delay: number
): boolean => {
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === '?' && event.shiftKey) {
        clearTimeout(timeoutId); // Clear any existing timeout
        timeoutId = setTimeout(() => {
          setQuestionCount(0);
        }, delay);

        setQuestionCount((prevCount) => ++prevCount);
      }
    };

    if (targetElement.current) {
      targetElement.current.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      clearTimeout(timeoutId);
      if (targetElement.current) {
        targetElement.current.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, [targetElement, delay]);

  return questionCount === 2;
};
