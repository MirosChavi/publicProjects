export default function Logo({ className }: { className: string }) {
  return (
    <>
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 400 200"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "rgb(255,0,128)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(0,128,255)", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "rgb(255,128,0)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(255,255,0)", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Жирный текст */}
        <text
          x="50"
          y="70"
          fontFamily="Verdana"
          fontSize="50"
          fontWeight="bold" // Добавлен атрибут для жирности
          fill="url(#grad1)"
          stroke="black"
          strokeWidth="3"
        >
          GTA LEAKS
        </text>

        <text
          x="50"
          y="130"
          fontFamily="Verdana"
          fontSize="50"
          fontWeight="bold" // Жирный текст
          fill="url(#grad2)"
          stroke="black"
          strokeWidth="3"
        >
          DOT SIX
        </text>
      </svg>
    </>
  );
}
