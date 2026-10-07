import React from 'react';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Add any custom props if needed
}

export function ResponsiveImage({ src, className, alt, loading = "lazy", ...props }: ResponsiveImageProps) {
  if (typeof src !== 'string' || !src.endsWith('.webp') || src.startsWith('http')) {
    return <img src={src} className={className} alt={alt} loading={loading} {...props} />;
  }

  const base = src.substring(0, src.lastIndexOf('.webp'));
  const srcSet = `${base}-sm.webp 640w, ${base}-md.webp 1024w, ${src} 1920w`;
  // Provide a reasonable default sizes attribute.
  const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw";

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      className={className}
      alt={alt}
      loading={loading}
      {...props}
    />
  );
}
