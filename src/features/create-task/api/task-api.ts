import type { CreateTaskFormData } from "../model/schema";

export async function createNewTask(data: CreateTaskFormData) {
  return new Promise<{ success: boolean; message: string }>((resolve) => {
    setTimeout(() => {
      console.log(data);
      resolve({
        success: true,
        message: "Task created successfully",
      });
    }, 3000);
  });
}
