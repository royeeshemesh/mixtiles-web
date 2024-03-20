import React from "react";
import photo from '../assets/photo.png';
import { GRID_GAP, GRID_SIZE, TILE_SIZE, Tile } from "./PuzzleGrid";

type TileProps = {
    tile: Tile,
    onClick: (tile: Tile) => void;
}
const PuzzleTile: React.FC<TileProps> = (props) => {
    const row = Math.floor(props.tile.index / GRID_SIZE);
    const col = props.tile.index % GRID_SIZE;

    const styles = {
        top: GRID_GAP + (row * TILE_SIZE) + (row * GRID_GAP),
        left: GRID_GAP + (col * TILE_SIZE) + (col * GRID_GAP),
    };

    return (
        <div onClick={() => props.onClick(props.tile)} style={styles} className="grid-item">
            <div style={{
                backgroundImage: `url(${photo})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `auto ${(TILE_SIZE * GRID_SIZE) + (GRID_SIZE * GRID_GAP)}px `,
                backgroundPosition: `-${props.tile.x}px -${props.tile.y}px`,
                width: TILE_SIZE,
                height: TILE_SIZE,
            }} />
        </div>
    )
}

export default PuzzleTile;