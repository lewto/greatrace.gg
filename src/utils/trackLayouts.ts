export const getTrackSvg = (trackName: string): string => {
  const tracks: Record<string, string> = {
    'Daytona International Speedway': `
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 200 C100 100, 300 100, 400 100 C500 100, 700 100, 700 200 C700 300, 500 300, 400 300 C300 300, 100 300, 100 200" 
              stroke="currentColor" 
              fill="none" 
              stroke-width="4"
              class="text-[#FF1801]" />
        <path d="M400 100 C420 120, 450 150, 450 200 C450 250, 420 280, 400 300" 
              stroke="currentColor" 
              fill="none" 
              stroke-width="4"
              stroke-dasharray="8 8"
              class="text-[#FF1801]" />
        <line x1="390" y1="100" x2="410" y2="100" 
              stroke="currentColor" 
              stroke-width="6"
              class="text-white" />
      </svg>
    `,
    'Watkins Glen International': `
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200 100 L600 100 C650 100, 700 150, 700 200 L700 300 L600 300 L500 200 L300 200 L200 300 L100 300 L100 200 C100 150, 150 100, 200 100" 
              stroke="currentColor" 
              fill="none" 
              stroke-width="4"
              class="text-[#FF1801]" />
        <line x1="190" y1="100" x2="210" y2="100" 
              stroke="currentColor" 
              stroke-width="6"
              class="text-white" />
      </svg>
    `
  };

  return tracks[trackName] || '';
};