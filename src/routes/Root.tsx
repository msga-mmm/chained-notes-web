import { useNotesCreate } from "src/api/chainedNotesAPI";
import Explorer from "src/components/Explorer/Explorer";
import { AppRoutes } from "src/constants";

import { useAuth0 } from "@auth0/auth0-react";
import classNames from "classnames";
import { useNavigate, generatePath } from "react-router";

export default function Root() {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const { mutate: createNote } = useNotesCreate({
    mutation: {
      onSuccess: async (note) => {
        /* eslint-disable-next-line functional/no-expression-statements */
        await navigate(
          generatePath(AppRoutes.note, {
            id: note.id.toString(),
          }),
        );
      },
    },
  });

  const handleNewNoteClick = () => {
    createNote({
      data: {
        title: "untitled",
        body: "empty",
      },
    });
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
