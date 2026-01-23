'use client';

import React from 'react';
import Image from 'next/image';

const SocialProof: React.FC = () => {
  const networks = [
    {
      logo: '/hyperion/hyperion.png',
      alt: 'Hyperion Network',
    },
    {
      logo: '/hyperion/mantle.png',
      alt: 'Mantle Network',
    },
    {
      logo: '/hyperion/avalanche.png',
      alt: 'Avalanche Network',
    },
    {
      logo: '/hyperion/metis.png',
      alt: 'Metis Network',
    },
  ];

  return (
    <section className="mb-32">
      <p className="text-center text-xs font-medium text-slate-600 uppercase tracking-widest mb-8">
        Trusted by engineering teams at
      </p>

      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
        {networks.map((network, index) => (
          <div
            key={index}
            className="relative w-32 h-32 hover:opacity-100 transition-opacity"
          >
            <Image
              src={network.logo}
              alt={network.alt}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
