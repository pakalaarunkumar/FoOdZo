import React, { useRef, useEffect, useCallback, useState } from "react";
import "./ScratchCard.css";

const Scratchcard = () => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [particles, setParticles] = useState([]);

  // 50% off image URL (use your own image or data URL)
  const prizeImageUrl =
    "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=50%25+OFF"; // Replace with real image

  const getClientPos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left,
      y: (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top,
    };
  }, []);

  // Simple particle system for fireworks (flowers/guns blowing)
  const createFireworks = useCallback(() => {
    const newParticles = [];
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
    ];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: 150,
        y: 100,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
      });
    }
    setParticles((p) => [...p, ...newParticles]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load and draw prize image first (50% off)
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Then overlay silver scratch layer
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      gradient.addColorStop(0, "#e0e0e0");
      gradient.addColorStop(1, "#c0c0c0");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    img.src = prizeImageUrl;

    // Animation loop for particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw particles
      setParticles((p) => {
        const updated = p
          .map((part) => {
            if (part.life <= 0) return part;
            part.x += part.vx;
            part.y += part.vy;
            part.vy += 0.1; // gravity
            part.life -= part.decay;
            return part;
          })
          .filter((part) => part.life > 0);
        return updated;
      });

      const drawParticles = () => {
        particles.forEach((part) => {
          if (part.life > 0) {
            ctx.save();
            ctx.globalAlpha = part.life;
            ctx.fillStyle = part.color;
            ctx.beginPath();
            ctx.arc(part.x, part.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      };
      drawParticles();

      // Redraw scratch layer if not fully scratched
      if (!isScratched) {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(192, 192, 192, 0.3)"; // Semi-transparent overlay
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {};
  }, [prizeImageUrl, isScratched, particles, createFireworks]);

  const scratch = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const pos = getClientPos(e);

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 30;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x + 1, pos.y + 1); // Small line for stroke
      ctx.stroke();

      // Check scratch progress (simple pixel check)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const transparentPixels = [];
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparentPixels.push(i);
      }
      if (
        transparentPixels.length / (canvas.width * canvas.height * 0.25) >
        0.5
      ) {
        // 50% scratched
        setIsScratched(true);
        createFireworks(); // Blow flowers/guns (fireworks)
      }
    },
    [getClientPos, createFireworks],
  );

  // Event handlers (same as before)
  const handleMouseDown = useCallback(
    (e) => {
      scratch(e);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [scratch],
  );

  const handleMouseMove = useCallback((e) => scratch(e), [scratch]);
  const handleMouseUp = useCallback(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleTouchStart = useCallback(
    (e) => {
      e.preventDefault();
      scratch(e);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    },
    [scratch],
  );

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      scratch(e);
    },
    [scratch],
  );

  const handleTouchEnd = useCallback(() => {
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  }, []);

  return (
    <div className="scratch-container">
      <div className="prize">🎉 Scratch to Reveal Prize!</div>
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="scratch-canvas"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      {isScratched && <div className="celebration">Congratulations! 🎊</div>}
    </div>
  );
};

export default Scratchcard;
