import Explorer from "src/components/Explorer/Explorer";
import { AppRoutes } from "src/constants";
import { useCreateNote } from "src/hooks";

import { useAuth0 } from "@auth0/auth0-react";
import classNames from "classnames";
import { useNavigate, generatePath } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  const createNote = useCreateNote();
  const { logout } = useAuth0();

  const handleNewNoteClick = () => {
    const note = createNote();
    navigate(
      generatePath(AppRoutes.note, {
        id: note.id,
      }),
    );
  };

  const handleLogout = () =>
    void logout({ logoutParams: { returnTo: window.location.origin } });

  return (
    <div className={classNames("flex", "h-100vh")}>
      <Explorer />
      <div
        className={classNames(
          "flex",
          "items-center",
          "justify-center",
          "w-full",
          "gap-[8px]",
        )}
      >
        <button className="btn-main" type="button" onClick={handleNewNoteClick}>
          new note
        </button>

        <button className="btn-main" type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
}
