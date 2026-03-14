export const LoadingScreen = ({ progress }: { progress: number }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background pointer-events-none">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
        <div className="text-4xl font-serif font-bold text-foreground tracking-widest animate-pulse">
            AJ<span className="text-primary">.</span>
        </div>
        
        <div className="w-full space-y-2">
            <div className="flex justify-between text-xs font-sans uppercase tracking-[0.2em] text-foreground/50">
                <span>Loading Assets</span>
                <span>{progress}%</span>
            </div>
            <div className="h-[1px] w-full bg-border/30 relative overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
      </div>
    </div>
  );
};
