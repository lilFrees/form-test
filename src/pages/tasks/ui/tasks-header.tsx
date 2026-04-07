import { CreateTaskModal } from "@/features/create-task";

export default function TasksHeader() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Manage Tasks</h1>
        <CreateTaskModal />
      </div>
    </div>
  );
}
