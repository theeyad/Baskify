import { ImageResponse } from "next/og";

export const alt = "Baskify — Modern E-Commerce Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function BaskifyLogo({ width = 56, height = 56 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-2.05 0 227.57 227.57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Basket body yellow */}
        <path
          fill="#ffc742"
          d="M204.58,66.4A13.14,13.14,0,0,0,191.5,54.61H32A13.14,13.14,0,0,0,18.91,66.4L4.07,209.07a13.14,13.14,0,0,0,13.07,14.5h189.2a13.14,13.14,0,0,0,13.07-14.5Z"
        />
        {/* Top rim cream */}
        <rect fill="#f7ead0" opacity="0.5" height="10.46" width="181.51" x="20.99" y="58.36" />
        {/* Bottom rim amber */}
        <rect fill="#efa536" height="10.46" width="211.48" x="6" y="209.42" />
        {/* Basket outline teal */}
        <path
          fill="#275563"
          d="M206.34,227.57H17.14A17.14,17.14,0,0,1,.09,208.65L14.93,66A17.1,17.1,0,0,1,32,50.61H191.5A17.1,17.1,0,0,1,208.55,66l3.71,35.72a4,4,0,1,1-8,.83L200.6,66.81a9.12,9.12,0,0,0-9.09-8.2H32a9.12,9.12,0,0,0-9.09,8.2L8,209.48a9.14,9.14,0,0,0,9.09,10.09h189.2a9.14,9.14,0,0,0,9.09-10.09l-5.19-49.91a4,4,0,1,1,8-.83l5.19,49.91a17.14,17.14,0,0,1-17.05,18.92Z"
        />
        {/* Handle */}
        <path
          fill="#275563"
          d="M168.7,65a4,4,0,0,1-4-4A53,53,0,1,0,58.78,61a4,4,0,0,1-8,0A61,61,0,1,1,172.7,61,4,4,0,0,1,168.7,65Z"
        />
        {/* Percentage badge background */}
        <ellipse fill="#908152" cx="111.74" cy="107.28" rx="44.38" ry="44.45" />
        <circle fill="#ffffff" cx="111.74" cy="96.16" r="44.45" />
        <path
          fill="#d9f0ff"
          opacity="0.5"
          d="M156.2,95.82A44.45,44.45,0,1,1,69.58,81.7c3.65,20.54,22.55,39,42.16,39s37.51-14.86,42.16-39A44.22,44.22,0,0,1,156.2,95.82Z"
        />
        <path
          fill="#d9f0ff"
          d="M156.2,95.14a44.45,44.45,0,1,1-88.91,0,45,45,0,0,1,.38-5.79,44.46,44.46,0,0,0,88.15,0A45,45,0,0,1,156.2,95.14Z"
        />
        <path
          fill="#275563"
          d="M111.74,143.83A48.45,48.45,0,1,1,160.2,95.37,48.51,48.51,0,0,1,111.74,143.83Zm0-88.91A40.45,40.45,0,1,0,152.2,95.37,40.5,40.5,0,0,0,111.74,54.92Z"
        />
        {/* Percentage text */}
        <path
          fill="#275563"
          d="M91.37,90.41V82.64q0-3.83,2.14-5.61a8.85,8.85,0,0,1,5.81-1.79A9,9,0,0,1,105.15,77q2.19,1.78,2.2,5.61v7.77q0,3.83-2.19,5.61a9,9,0,0,1-5.83,1.79A8.84,8.84,0,0,1,93.53,96Q91.37,94.25,91.37,90.41Zm5.26,0q0,2.63,2.71,2.62t2.76-2.63V82.63q0-2.63-2.77-2.62t-2.71,2.63Zm2.9,24.47a2.36,2.36,0,0,1,.27-1l18.83-39.5A2.29,2.29,0,0,1,120.88,73a3.45,3.45,0,0,1,2.22.82,2.57,2.57,0,0,1,1,2.08,2.35,2.35,0,0,1-.21,1L105,116.4a2.43,2.43,0,0,1-2.42,1.37,2.93,2.93,0,0,1-2.2-.9A2.81,2.81,0,0,1,99.53,114.88ZM116.14,108v-7.77q0-3.83,2.14-5.61a8.84,8.84,0,0,1,5.81-1.79,9,9,0,0,1,5.83,1.77q2.19,1.78,2.2,5.61V108q0,3.83-2.19,5.61a9,9,0,0,1-5.83,1.79,8.84,8.84,0,0,1-5.82-1.77Q116.14,111.85,116.14,108Zm5.26,0q0,2.63,2.71,2.62t2.76-2.63v-7.77q0-2.63-2.77-2.62t-2.71,2.63Z"
        />
        {/* Accent dots */}
        <path
          fill="#275563"
          d="M211.83,144.57a4,4,0,0,1-4-3.59l-.75-7.27a4,4,0,1,1,8-.82l.75,7.27a4,4,0,0,1-3.57,4.39Z"
        />
        <path
          fill="#275563"
          d="M209.78,124.68a4,4,0,0,1-4-3.59l0-.3a4,4,0,1,1,8-.82l0,.3a4,4,0,0,1-3.57,4.39Z"
        />
        <g opacity="0.7">
          <path
            fill="#ffffff"
            d="M28.67,146.35h-.27a3,3,0,0,1-2.73-3.25l1-11.32a3,3,0,1,1,6,.53l-1,11.32A3,3,0,0,1,28.67,146.35Z"
          />
          <path
            fill="#327556"
            d="M30.51,125.53h-.27a3,3,0,0,1-2.73-3.25l.54-6.13a3,3,0,1,1,6,.53l-.54,6.13A3,3,0,0,1,30.51,125.53Z"
          />
        </g>
        <circle fill="#ffffff" opacity="0.7" cx="27.43" cy="156.95" r="3.59" />
      </g>
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 74px",
          background: "linear-gradient(135deg, #0d1e24 0%, #162f37 45%, #275563 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Soft glowing ambient circles from the palette */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 199, 66, 0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "80px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217, 240, 255, 0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
            display: "flex",
          }}
        />

        {/* Top Header: Logo + Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Logo Badge in clean white-cream surface */}
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #ffffff 0%, #f7ead0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 199, 66, 0.4)",
              }}
            >
              <BaskifyLogo width={46} height={46} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "34px",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                }}
              >
                Baskify
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              borderRadius: "9999px",
              background: "rgba(247, 234, 208, 0.1)",
              border: "1px solid rgba(255, 199, 66, 0.3)",
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffc742",
              letterSpacing: "0.02em",
            }}
          >
            baskify.com
          </div>
        </div>

        {/* Center Content: Headline + Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              alignSelf: "flex-start",
              padding: "6px 14px",
              borderRadius: "8px",
              background: "rgba(255, 199, 66, 0.15)",
              border: "1px solid rgba(255, 199, 66, 0.35)",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#ffc742",
            }}
          >
            Smart E-Commerce Platform
          </div>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: 0,
              color: "#ffffff",
            }}
          >
            Curated Products. Exceptional Deals. Lightning Fast Delivery.
          </h1>
          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.5,
              color: "#f7ead0",
              opacity: 0.9,
              margin: 0,
              maxWidth: "840px",
            }}
          >
            Discover top-tier electronics, fashion, and lifestyle essentials with secure Stripe checkout.
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 22px",
              borderRadius: "14px",
              background: "rgba(39, 85, 99, 0.5)",
              border: "1px solid rgba(255, 199, 66, 0.35)",
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#ffc742",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#275563",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#275563"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Fast Global Delivery</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 22px",
              borderRadius: "14px",
              background: "rgba(39, 85, 99, 0.5)",
              border: "1px solid rgba(255, 199, 66, 0.35)",
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#efa536",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>100% Secure Checkout</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 22px",
              borderRadius: "14px",
              background: "rgba(39, 85, 99, 0.5)",
              border: "1px solid rgba(255, 199, 66, 0.35)",
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#d9f0ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#275563",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#275563"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>Guaranteed Quality</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
