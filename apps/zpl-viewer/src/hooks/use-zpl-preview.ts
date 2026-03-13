import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchLabelaryPng } from '@/api/labelary';
import type { FetchLabelaryPngParams, ZplPreviewError } from '@/types/zpl-preview';

export function useZplPreview() {
  const isMountedRef = useRef(true);
  const controllerRef = useRef<AbortController | null>(null);
  const imageUrlRef = useRef<string | null>(null);
  const generationRef = useRef(0);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState(0);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      controllerRef.current?.abort();
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    };
  }, []);

  const startCountdown = (seconds: number) => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setRetryCountdown(seconds);

    countdownIntervalRef.current = setInterval(() => {
      setRetryCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current!);
          countdownIntervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const { mutate, isPending, isError, error, reset } = useMutation<
    Blob | null,
    ZplPreviewError,
    FetchLabelaryPngParams
  >({
    mutationFn: async (params) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      const generation = ++generationRef.current;
      const blob = await fetchLabelaryPng(params, controller.signal);

      if (generation !== generationRef.current) return null;
      return blob;
    },
    onSuccess: (blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const prev = imageUrlRef.current;
      imageUrlRef.current = url;
      if (prev) URL.revokeObjectURL(prev);

      if (isMountedRef.current) {
        setImageUrl(url);
      } else {
        URL.revokeObjectURL(url);
        imageUrlRef.current = null;
      }
    },
    onError: (err) => {
      if ('name' in (err as unknown as Error)) {
        const name = (err as unknown as Error).name;
        if (name === 'AbortError' || name === 'TimeoutError') return;
      }
      if (err.code === 'RATE_LIMIT') {
        startCountdown(err.retryAfterSeconds);
      }
    },
    retry: 0,
  });

  const clearPreview = () => {
    reset();
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = null;
    }
    setImageUrl(null);
  };

  return {
    trigger: mutate,
    clearPreview,
    imageUrl,
    isPending,
    isError,
    error: isError ? (error as ZplPreviewError) : null,
    retryCountdown,
  };
}
