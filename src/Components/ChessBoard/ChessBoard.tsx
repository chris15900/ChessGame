import { useEffect, useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './ChessBoard.css';

const verticalAxis =["1","2","3","4","5","6","7","8"];
const horizontalAxis =["a","b","c","d","e","f","g","h"];

interface Piece {
    image:string
    x:number
    y:number 
}

const initialBoardState: Piece[] = [];

for (let p= 0 ; p < 2; p++ ) {
    const type = (p === 0 ) ? "d" : "l";
    const y = (p === 0 ) ? 7 : 0; 


    initialBoardState.push({image: `assets/Chess_r${type}t60.png`, x:0,y});
    initialBoardState.push({image: `assets/Chess_r${type}t60.png`, x:7,y});

    initialBoardState.push({image: `assets/Chess_n${type}t60.png`, x:1,y});
    initialBoardState.push({image: `assets/Chess_n${type}t60.png`, x:6,y});

    initialBoardState.push({image: `assets/Chess_b${type}t60.png`, x:2,y});
    initialBoardState.push({image: `assets/Chess_b${type}t60.png`, x:5,y});

    initialBoardState.push({image: `assets/Chess_k${type}t60.png`, x:4,y});
    initialBoardState.push({image: `assets/Chess_q${type}t60.png`, x:3,y});
}

for(let i = 0 ; i < 8; i++) {
    initialBoardState.push({image: `assets/Chess_pdt60.png`, x:i,y:6});
}

for(let i = 0 ; i < 8; i++) {
    initialBoardState.push({image: `assets/Chess_plt60.png`, x:i,y:1});
    }
    
export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [griDx,setGridX] = useState(0);
    const [griDy,setGridY] = useState(0);

    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const chessboardRef = useRef<HTMLDivElement>(null);


function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {

    const element = e.target as HTMLElement; 
    const chessboard = chessboardRef.current;

if (element.classList.contains("chess-piece") && chessboard) {

    setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
    setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 700) / 100)));
   
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    element.style.position ="absolute";
    element.style.left = `${x}px` ;
    element.style.top = `${y}px`;

    setActivePiece(element);
}

}

function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current; 
    if(activePiece && chessboard) {
        const minX = chessboard.offsetLeft - 25;
        const minY = chessboard.offsetTop - 25;
        const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
        const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        activePiece.style.position ="absolute";
        // activePiece.style.left = `${x}px` ;
        // activePiece.style.top = `${y}px`;
        
        if (x<minX) {
            activePiece.style.left=`${minX}px`;
        } else if (x > maxX) {
            activePiece.style.left =`${maxX}px`;
        } else {
            activePiece.style.left =`${x}px`;
        }

        if (y < minY) {
            activePiece.style.top=`${minY}px`;
        } else if (y > maxX) {
            activePiece.style.top =`${maxY}px`;
        } else {
            activePiece.style.top =`${y}px`;
        }

       

    }
}

function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if(activePiece && chessboard) {
        const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
        const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 700) / 100));
        console.log(x,y);
        setPieces(value => {
           
            const pieces = value.map(p => {
                if (p.x === griDx && p.y === griDy ) {
                    p.x = x;
                    p.y = y;
                }
                return p;
            })
            return pieces;
        });  
        
        setActivePiece(null);
            
    }
}

        let board = [];
        for (let j = verticalAxis.length-1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;
            let image = undefined;

            pieces.forEach(p=>{
                if (p.x === i && p.y === j) {
                    image = p.image;
                }
            })
            board.push(<Tile image={image} number={number}/>);
            }
        }
        return  <div 
        onMouseMove={(e) => movePiece(e)} 
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
         id="chessboard"
         ref ={chessboardRef}>{board}</div>;
}