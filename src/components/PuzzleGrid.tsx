import { useEffect, useState } from 'react';
import PuzzleTile from './PuzzleTile';
import ShuffleIcon from './ShuffleIcon';
import SolvedMessageModal from './SolvedMessageModal';
import './puzzle-grid.css';

export const GRID_SIZE = 3;
export const GRID_GAP = 4;
export const TILE_SIZE = 165;
const SHUFFLE_COMPLEXITY = 10;
export type Tile = {
    key: string;
    index: number;
    x: number;
    y: number;
    isEmpty?: boolean;
}

const getNeighbors = (index: number) => {
    const neighbors = [];
    if (index % 3 !== 0) neighbors.push(index - 1);
    if (index % 3 !== 2) neighbors.push(index + 1);
    if (index >= 3) neighbors.push(index - 3);
    if (index < 6) neighbors.push(index + 3);
    return neighbors;
}

const PuzzleGrid = () => {
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [moves, setMoves] = useState(0);
    const [isSolved, setIsSolved] = useState(false);

    const shuffleTiles = (tilesToShuffle: Tile[]) => {
        const randomMove = () => {
            const _emptyTile = tilesToShuffle.find(t => t.isEmpty) as Tile;
            const _emptyTileNeighbors = getNeighbors(_emptyTile.index);
            const _tileIndex = _emptyTileNeighbors[Math.floor(Math.random() * _emptyTileNeighbors.length)];
            const _tile = tilesToShuffle.find(t => t.index === _tileIndex) as Tile;

            // swap empty with tile indexeces
            const _t = _tile.index;
            _tile.index = _emptyTile.index;
            _emptyTile.index = _t;
        }

        for (let i = 0; i < SHUFFLE_COMPLEXITY; i++) {
            randomMove();
        }

        return tilesToShuffle;
    }

    const splitImage = () => {
        let _tiles: Tile[] = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                const key = `${i}_${j}`;
                _tiles.push({
                    key,
                    index: i * GRID_SIZE + j,
                    x: GRID_GAP + (j * TILE_SIZE) + (j * GRID_GAP),
                    y: GRID_GAP + (i * TILE_SIZE) + (i * GRID_GAP),
                    isEmpty: i === GRID_SIZE - 1 && j === GRID_SIZE - 1
                });
            }
        }
        const _shuflledTiles: Tile[] = shuffleTiles(_tiles);
        setTiles(_shuflledTiles);
    };

    const handleTileClick = (tile: Tile) => {
        const _emptyTile = tiles.find(t => t.isEmpty) as Tile;
        const _emptyTileNaghbors = getNeighbors(_emptyTile.index);
        if (_emptyTileNaghbors.indexOf(tile.index) === -1) {
            return;
        }
        // swap empty with tile indexeces
        const _t = tile.index;
        tile.index = _emptyTile.index;
        _emptyTile.index = _t;

        setTiles([...tiles],);
        setMoves(moves + 1);

        let _isSolved = true;
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].index !== i) {
                _isSolved = false;
                break;
            }
        }
        setIsSolved(_isSolved);
    }

    const getPuzzleTiles = () => {
        return tiles.map(tile => !tile.isEmpty && <PuzzleTile onClick={handleTileClick} key={tile.key} tile={tile} />);
    };

    const newGame = () => {
        setIsSolved(false);
        setMoves(0);
        splitImage();
    }

    useEffect(() => {
        newGame();
    }, []);

    return (
        <>
            <div className="puzzle-grid-wrapper">
                <div className="grid-header">
                    <label>8-Puzzle</label>
                    <div className="btn-shuffle" onClick={newGame}>
                        <ShuffleIcon />
                        <span>Shuffle</span>
                    </div>
                    <div className="lbl-moves" >
                        <span>Moves: {moves}</span>
                    </div>
                </div>
                <div className="grid">
                    {getPuzzleTiles()}
                </div>
            </div>

            {isSolved && (
                <SolvedMessageModal onClose={newGame} movesCount={moves} />
            )}
        </>
    )
}

export default PuzzleGrid;