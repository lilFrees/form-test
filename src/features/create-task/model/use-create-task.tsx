import { useMutation } from "@tanstack/react-query";
import { createNewTask } from "../api/task-api";

export function useCreateTask() {
  const mutation = useMutation({
    mutationKey: ["create-task"],
    mutationFn: createNewTask,
  });

  return mutation;
}
