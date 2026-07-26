import React, { useState, useEffect, useRef } from 'react';

function LazyVideo({
    videoRef,
    srcWebm,
    srcMp4,
    className,
    style,
    ...props
}) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px', // Start loading 200px before the video enters the viewport
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // Combine standard styles with fade-in opacity and potential user styles
    const videoStyle = {
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style
    };

    return (
        <div ref={containerRef} className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
            {shouldLoad && (
                <video
                    ref={videoRef}
                    {...props}
                    style={videoStyle}
                    onLoadedData={(e) => {
                        setIsLoaded(true);
                        if (props.onLoadedData) {
                            props.onLoadedData(e);
                        }
                    }}
                >
                    {srcWebm && <source src={srcWebm} type="video/webm" />}
                    {srcMp4 && <source src={srcMp4} type="video/mp4" />}
                </video>
            )}
        </div>
    );
}

export default LazyVideo;
