import React, { useState } from "react";
import "./puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import img from "./1192413.jpg";
import './puzzle.css'

function Jigsaw() {
	const [text, setText] = useState("Unpuzzle the pieces!!");
	
	const set = () => {
		setText("Congratulations!!");
	};
	
	return (
		<div>
			
	
			<h2 className="tag">{text}</h2>
				<JigsawPuzzle
				imageSrc={img}
				rows={3}
				columns={3}
				onSolved={set}
				className="jigsaw-puzzle"
			/>

			
		</div>
	);
}

export default Jigsaw;
