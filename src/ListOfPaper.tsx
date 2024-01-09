import React from 'react';
import './ListOfPaper.css';
import Block5On7 from "./components/5x7/Block5on7";
import Block3On4Point5 from "./components/3x4point5/Block3on4point5";
import Block9On2 from "../src/components/9x2/Block9on2";

interface Block {
        width: number;
        height: number;
        component: React.FC;
}

interface Row {
        width: number;
        height: number;
        blocks: Block[];
}

function sortBlocks(blocks: Block[]): Block[] {
        return blocks.sort((a, b) => (b.width * b.height) - (a.width * a.height));
}

function packBlocks(blocks: Block[], paperWidth: number, paperHeight: number): Row[] {
        let sortedBlocks = sortBlocks(blocks);
        let packedBlocks: Row[] = [];

        for (let block of sortedBlocks) {
                let bestFitIndex = -1;
                let minWaste = paperWidth;

                for (let i = 0; i < packedBlocks.length; i++) {
                        let waste = packedBlocks[i].width - block.width;

                        if (waste >= 0 && waste < minWaste) {
                                bestFitIndex = i;
                                minWaste = waste;
                        }
                }

                if (bestFitIndex !== -1) {
                        packedBlocks[bestFitIndex].blocks.push(block);
                        packedBlocks[bestFitIndex].width -= block.width;
                } else {
                        let newRow: Row = { width: paperWidth - block.width, height: block.height, blocks: [block] };
                        packedBlocks.push(newRow);
                }
        }

        return packedBlocks;
}

const ListOfPaper: React.FC = () => {
        const blocks: Block[] = [
                ...Array(5).fill({ width: 9, height: 2, component: Block9On2 }),
                ...Array(5).fill({ width: 5, height: 7, component: Block5On7 }),
                ...Array(7).fill({ width: 3, height: 4.5, component: Block3On4Point5 })
        ];

        const packedBlocks = packBlocks(blocks, 20, 40);

        return (
            <div className="paper-list">
                    {packedBlocks.map((row, i) =>
                        row.blocks.map((block, j) =>
                            <block.component key={`${i}-${j}`} />
                        )
                    )}
            </div>
        );
};

export default ListOfPaper;