import CreateNote from "src/components/CreateNote";
import Explorer from "src/components/Explorer";

export default function Root() {
  return (
    <div flex="~" h="100vh">
      <Explorer />
      <div flex="~" items="center" justify="center" w="full">
        <CreateNote>new note</CreateNote>
      </div>
    </div>
  );
}
