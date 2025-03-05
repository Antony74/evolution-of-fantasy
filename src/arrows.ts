import { Point } from "./matrices";

const fs = require('fs');

const generatePolygon = (pointsArray: Point[]) => {
    const pointsString = pointsArray.map((pair) => pair.join(',')).join(' ');
    return `<polygon points="${pointsString}" fill="white" />`;
};

const generateArrowhead = (size = 10) => {
    return [
        [0, 0],
        [size, -size],
        [-size, -size],
    ];
};

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" style="background-color:black;">
    <!-- Top to Left -->
    <line x1="200" y1="100" x2="120" y2="180" />
    ${generatePolygon([
        [120, 180],
        [130, 160],
        [110, 170],
    ])}
    
    <!-- Top to Right -->
    <line x1="200" y1="100" x2="280" y2="180" />
    ${generatePolygon([
        [280, 180],
        [270, 160],
        [290, 170],
    ])}
    
    <!-- Left to Bottom -->
    <line x1="120" y1="180" x2="200" y2="300" />
    ${generatePolygon([
        [200, 300],
        [190, 280],
        [210, 290],
    ])}
    
    <!-- Right to Bottom -->
    <line x1="280" y1="180" x2="200" y2="300" />
    ${generatePolygon([
        [200, 300],
        [210, 280],
        [190, 290],
    ])}
</svg>`;

fs.writeFileSync('diamond_arrows.svg', svgContent);
console.log('SVG file generated: diamond_arrows.svg');
