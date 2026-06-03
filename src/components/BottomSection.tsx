const BottomGreenSection = () => {
    return (
        <section className="relative z-30 bg-[#052c22] h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Content for your green section */}
            <h2 className="text-white text-6xl md:text-[10vw] font-bold tracking-tighter text-center">
                Awaken Within
            </h2>

            {/* Abstract moving dots/shapes like the video */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white rounded-full animate-bounce" />
            </div>
        </section>
    );
};

export default BottomGreenSection;