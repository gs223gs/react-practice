import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TodoEditing = ({
  handleUpdate,
  editedTitle,
  setEditedTitle,
}: {
  handleUpdate: () => void;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
      <Input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <Button onClick={handleUpdate}>確定</Button>
    </div>
  );
};

export default TodoEditing;
