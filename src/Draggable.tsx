import React, { useState, useRef, useEffect } from 'react';

type DraggableProps = {
    children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ children }) => {

    const draggableRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp)
        };
    }, [])

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0) setIsDragging(true);

    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            const desiredLeft = e.pageX - (draggableRef?.current?.offsetWidth ?? 100) / 2;
            const desiredTop = e.pageY - (draggableRef?.current?.offsetHeight ?? 100) / 2;

            const maxLeft = window.innerWidth - (draggableRef?.current?.offsetWidth ?? 100);
            const maxTop = window.innerHeight - (draggableRef?.current?.offsetHeight ?? 100);

            const left = desiredLeft > maxLeft ? maxLeft : desiredLeft < 0 ? 0 : desiredLeft;
            const Top = desiredTop > maxTop ? maxTop : desiredTop < 0 ? 0 : desiredTop;

            setPosition({ left: left, top: Top })
        };
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    return (
        <div id="draggable" ref={draggableRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
            style={{ position: 'absolute', left: position.left + 'px', top: position.top + 'px' }}>
            {children}
        </div>
    )
}

export default Draggable;