const T = 'M20 10.5C18.5 7.5 15.5 6.5 12.5 7.2 9.5 8 8 11 8.6 14.5c.6 3.5 2 6 2.6 9.5.6 4 1 9 3.4 9 2.2 0 2.8-4.500 3.800-6.800.5-1.200 1-1.600 1.600-1.600s1.100.4 1.600 1.600c1 2.300 1.600 6.800 3.800 6.800 2.400 0 2.800-5 3.400-9 .6-3.500 2-6 2.600-9.500C32 11 30.500 8 27.500 7.200 24.500 6.500 21.500 7.500 20 10.500Z';
const C = [['#FFD02E', 28], ['#2FB463', 70], ['#E8474B', 112]];
export const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 56">${C.map(([f, x]) => `<circle cx="${x}" cy="28" r="26" fill="${f}" fill-opacity=".94"/>`).join('')}${C.map(([, x]) => `<path d="${T}" fill="#fff" transform="translate(${x} 28) scale(1.28) translate(-20 -19.8)"/>`).join('')}</svg>`;
export default function Logo({ className = '' }) {
  return (
    <svg className={'logo ' + className} viewBox="0 0 140 56" role="img" aria-label="Dr. Sapna's Advanced Dental Care logo">
      {C.map(([f, x]) => <circle key={x} cx={x} cy="28" r="26" fill={f} fillOpacity=".94" />)}
      {C.map(([, x]) => <path key={x} d={T} fill="#fff" transform={`translate(${x} 28) scale(1.28) translate(-20 -19.8)`} />)}
    </svg>
  );
}
