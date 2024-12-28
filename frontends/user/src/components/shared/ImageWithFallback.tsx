'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import ThImage from '../../../public/th.webp';

interface IImageWithFallback extends ImageProps {
  src: string;
}

export default function ImageWithFallback(props: IImageWithFallback) {
  const { src, ...rest } = props;
  const [imgSrc, setImageSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImageSrc(ThImage.src);
      }}
    />
  );
}
