import { Link, generatePath, useNavigate } from "react-router-dom";
import { selectNotes } from "src/features/notes/notesSlice";
import classNames from "classnames";
import { AppRoutes } from "src/constants";
import { useCreateNote } from "src/hooks";

export default function Explorer() {
	const notes = selectNotes();
	const navigate = useNavigate();
	const createNote = useCreateNote();

	const handleNewNoteClick = () => {
		const note = createNote();
		navigate(
			generatePath(AppRoutes.note, {
				id: note.id,
			}),
		);
	};

	return (
		<div
			className={classNames(
				"w-1/6",
				"h-100vh",
				"box-border",
				"bg-gray-900",
				"p-1rem",
				"overflow-y-auto",
			)}
		>
			<div>
				<div className={classNames("flex", "mb-14px")}>
					<p className={classNames("color-main-red", "font-bold", "text-18px")}>
						Notes
					</p>
					<button
						onClick={handleNewNoteClick}
						type="button"
						className={classNames(
							"btn-main",
							"flex",
							"ml-auto",
							"my-auto",
							"rounded-full",
							"h-22px",
							"w-22px",
							"justify-center",
							"items-center",
						)}
					>
						+
					</button>
				</div>
				<div className={classNames("flex", "flex-col", "space-y-2px")}>
					{notes.map((note) => (
						<Link
							className={classNames("hover-op70")}
							key={note.id}
							to={generatePath(AppRoutes.note, {
								id: note.id,
							})}
						>
							{note.title}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
