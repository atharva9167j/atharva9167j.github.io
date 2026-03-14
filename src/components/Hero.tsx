import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 360; // Number of frames extracted via ffmpeg (60fps)

interface HeroProps {
	onProgress?: (progress: number) => void;
}

export const Hero = ({ onProgress }: HeroProps = {}) => {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [imagesLoaded, setImagesLoaded] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const targetFrameRef = useRef(0);
	const currentFrameRef = useRef(0);
	
	const loadedImagesRef = useRef<HTMLImageElement[]>([]);

	// Preload images
	useEffect(() => {
		let loadedCount = 0;
		for (let i = 1; i <= TOTAL_FRAMES; i++) {
			const img = new Image();
			const paddedIndex = i.toString().padStart(4, '0');
			img.src = `/hero_frames_webp/frame_${paddedIndex}.webp`;
			
			img.onload = () => {
				loadedCount++;
				setImagesLoaded(loadedCount);
				
				if (onProgress) {
					onProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
				}

                if (loadedCount === 1) {
                    // Draw first frame immediately if canvas is ready
                    drawFrameToCanvas(0);
                }
			};
			loadedImagesRef.current.push(img);
		}
	}, []);

	// Handle Canvas & Drawing
	const drawFrameToCanvas = (frameIndex: number) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const img = loadedImagesRef.current[frameIndex];
		if (!img || !img.complete || img.naturalWidth === 0) return;

		// Set canvas size to match the window container accurately
		if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		// CSS object-cover equivalent drawing
		const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
		
		// Shift video to show more of the right side on mobile devices
		const isMobile = window.innerWidth < 768;
		const xAlignment = isMobile ? 0.356 : 0.5;
		
		const x = (canvas.width - img.width * ratio) * xAlignment;
		const y = (canvas.height - img.height * ratio) / 1;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
	};

	// Scroll listener & Render Loop
	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;
			
			const rect = containerRef.current.getBoundingClientRect();
			const containerTop = rect.top;
			const containerHeight = rect.height - window.innerHeight;
            
			let progress = 0;
            if (containerTop <= 0) {
				progress = Math.min(1, Math.max(0, -containerTop / containerHeight));
			}
            
            setScrollProgress(progress);
			// Calculate target frame (0 to 191)
			targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
		};

		const handleResize = () => drawFrameToCanvas(Math.round(currentFrameRef.current));

		window.addEventListener("scroll", handleScroll, { passive: true });
        // Handle resize so canvas redraws crisply
        window.addEventListener("resize", handleResize);
        handleScroll();

		// Lerping Animation Loop for butter-smooth scrubbing
		let animationFrameId: number;
		const render = () => {
            // Lerp mathematical formula: current = current + (target - current) * factor
            // A factor of 0.08 offers a buttery smooth catch-up without feeling detached
			currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.08;
			
            const roundedFrame = Math.round(currentFrameRef.current);
			drawFrameToCanvas(roundedFrame);

			animationFrameId = requestAnimationFrame(render);
		};
		render();

		return () => {
			window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	// Text Animation Logic
	const getStyle = (startIn: number, endIn: number, startOut: number, endOut: number) => {
		let opacity = 0;
		let translateY = 40;

		if (scrollProgress >= startIn && scrollProgress <= endIn) {
			opacity = (scrollProgress - startIn) / (endIn - startIn);
			translateY = 40 - (40 * opacity);
		} else if (scrollProgress > endIn && scrollProgress < startOut) {
			opacity = 1;
			translateY = 0;
		} else if (scrollProgress >= startOut && scrollProgress <= endOut) {
			const fadeOutProgress = (scrollProgress - startOut) / (endOut - startOut);
			opacity = 1 - fadeOutProgress;
			translateY = -40 * fadeOutProgress;
		} else if (scrollProgress > endOut) {
			opacity = 0;
			translateY = -40;
		}

		return {
			opacity,
			transform: `translateY(${translateY}px)`,
			transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
			pointerEvents: opacity > 0.5 ? 'auto' : 'none',
		} as React.CSSProperties;
	};

	return (
		<div id="home" ref={containerRef} className="relative w-full bg-background" style={{ height: '900vh' }}>
			
			{/* Sticky container that stays in view */}
			<div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
				
				{/* Canvas Background (Replaced Video) */}
				<canvas
					ref={canvasRef}
					className="absolute inset-0 z-0 bg-background constrast-150 brightness-125"
				/>
				
				{/* Overlay for contrast against the video */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />

				{/* Main content container (F-scan layout offset to the left) */}
				<div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-12 h-full flex flex-col items-start justify-center pt-20">
					
					<div className="relative w-full md:max-w-4xl h-full flex items-center">
						
						{/* Phase 1: Greeting */}
						<div className="absolute top-1/2 -translate-y-1/2 left-0 w-full">
                            <div style={getStyle(0.00, 0.05, 0.20, 0.25)}>
                                <p className="text-primary font-sans uppercase tracking-[0.3em] text-sm mb-4">
                                    Portfolio
                                </p>
                                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-foreground leading-[1.1]">
                                    Heyyy<span className="text-primary">.</span>
                                </h1>
                            </div>
						</div>

						{/* Phase 2: Introduction */}
						<div className="absolute top-1/2 -translate-y-1/2 left-0 w-full">
                            <div style={getStyle(0.25, 0.30, 0.45, 0.50)}>
							    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-foreground leading-[1.1]">
							    	I'm<br />Atharva Jagtap<span className="text-primary">.</span><br/>
                                    <span className="text-2xl md:text-3xl lg:text-4xl text-foreground/60 font-sans tracking-tight">Known online as Atharva9167j</span>
							    </h1>
                            </div>
						</div>

						{/* Phase 3: Role */}
						<div className="absolute top-1/2 -translate-y-1/2 left-0 w-full">
                            <div style={getStyle(0.50, 0.55, 0.70, 0.75)}>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-foreground leading-[1.1]">
                                    Full-Stack Developer<br /><span className="text-primary font-serif font-normal italic">& AI Engineer.</span>
                                </h1>
                            </div>
						</div>

						{/* Phase 4: Final static CTA */}
						<div className="absolute top-1/2 -translate-y-1/2 left-0 w-full">
                            <div style={getStyle(0.75, 0.80, 2.0, 3.0)}>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-foreground leading-[1.1]">
                                    Full-Stack Developer<br /><span className="text-primary font-serif font-normal italic">& AI Engineer.</span>
                                </h1>
                                <p className="mt-8 text-xl md:text-2xl font-serif font-light leading-relaxed text-foreground/80 max-w-2xl">
                                    Crafting high-performance digital experiences and intelligent solutions.
                                </p>
                                <div className="mt-12 flex flex-col sm:flex-row items-start gap-6">
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/80 transition-all duration-300 font-sans px-8 py-6 rounded-none uppercase tracking-widest text-xs" asChild>
                                        <a href="#contact">Get in Touch</a>
                                    </Button>
                                    <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 transition-all duration-300 font-sans px-8 py-6 rounded-none uppercase tracking-widest text-xs flex items-center gap-3" asChild>
                                        <a href="/Atharva_Dharmendra_Jagtap_Resume.pdf" target="_blank" rel="noopener noreferrer">
                                            View Resume ↗
                                        </a>
                                    </Button>
                                </div>
                            </div>
						</div>
					</div>

				</div>

				{/* Global progress bar */}
				<div className="absolute -bottom-1 left-0 h-1 bg-primary z-50 transition-all duration-75" style={{ width: `${scrollProgress * 100}%` }} />

				{/* Scroll indicator arrow */}
				<div 
					className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 cursor-pointer ${scrollProgress > 0.9 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
					onClick={() => {
						const nextSection = document.getElementById('about');
						if (nextSection) {
							nextSection.scrollIntoView({ behavior: 'smooth' });
						}
					}}
				>
					<div className="flex flex-col items-center gap-2">
						<span className="text-[10px] uppercase tracking-[0.3em] text-primary/60 font-sans mb-1">Scroll</span>
						<div className="animate-bounce p-1 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm">
							<ChevronDown className="w-6 h-6 text-primary" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
