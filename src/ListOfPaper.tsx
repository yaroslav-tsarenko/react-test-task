import React, {useEffect, useRef} from 'react';
import './ListOfPaper.css';
import Isotope from 'isotope-layout';

const ListOfPaper = () => {
    const isoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isoRef.current) {
            // Initialize Isotope
            new Isotope(isoRef.current, {
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });
        }
    }, []);

    // Function to generate a container
    const generateContainer = (className: string, times: number) => {
        let containers = [];
        for (let i = 0; i < times; i++) {
            containers.push(<div className={`grid-item ${className}`}><p>{className.split('--')[1]}</p></div>);
        }
        return containers;
    }

    return (
        <div className="grid-paper-list">
            <div className="paper-list">
                {generateContainer('grid-item--3x4-5', 7)}
                {generateContainer('grid-item--5x7', 5)}
                {generateContainer('grid-item--9x2', 5)}
            </div>
        </div>
    );
};

export default ListOfPaper;