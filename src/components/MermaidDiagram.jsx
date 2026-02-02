import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
        darkMode: true,
        primaryColor: '#000000',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#ffffff',
        lineColor: '#ffffff',
        secondaryColor: '#141414',
        tertiaryColor: '#141414',
        fontFamily: 'Inter',
    }
});

const MermaidDiagram = ({ chart }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && chart) {
            containerRef.current.innerHTML = '';
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

            mermaid.render(id, chart).then(({ svg }) => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = svg;
                }
            });
        }
    }, [chart]);

    return (
        <div className="mermaid-container">
            <div className="diagram-wrapper" ref={containerRef} />
            <style>{`
        .mermaid-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .diagram-wrapper {
          width: 100%;
          max-width: 800px;
          display: flex;
          justify-content: center;
        }
      `}</style>
        </div>
    );
};

export default MermaidDiagram;
