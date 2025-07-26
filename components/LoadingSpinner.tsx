// components/LoadingSpinner.tsx
export function LoadingSpinner() {
    return (
      <div className="relative">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-transparent border-t-cyan-400 border-r-purple-400"></div>
        <div className="absolute inset-0 animate-ping rounded-full h-6 w-6 border-2 border-cyan-400/20"></div>
      </div>
    );
  }