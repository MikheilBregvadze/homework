import {useState, useEffect, useLayoutEffect, useRef} from 'react'

export const useClickOutside = (handler) => {
    let domNode = useRef();
    useEffect(() => {
        let maybeHandler = (event) => {
            if(domNode && domNode.current && !domNode.current.contains(event.target)) {
                handler();
            }
        }
        document.addEventListener('mousedown', maybeHandler);
        return () => {
            document.removeEventListener('mousedown', maybeHandler);
        }
    });
    return domNode;
}

export const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
