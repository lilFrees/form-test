import { z } from "zod";

export const createTaskSchema = z
  .object({
    context: z
      .string()
      .min(1, "Контекст задачи обязателен")
      .max(4096, "Контекст не может быть больше 4096 символов"),
    for_team: z.boolean(),
    is_routine: z.boolean(),
    routine_name: z.string(),
    periodicity: z.enum(["daily", "weekly", "monthly"]).optional(),
    routine_description: z.string(),
    assignees: z.array(z.string()),
    deadline: z.date().optional().nullable(),
    file: z.array(z.instanceof(File)).optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.is_routine) {
        return data.routine_name && data.routine_name.trim().length > 0;
      }
      return true;
    },
    {
      message: "Название рутинной задачи обязательно",
      path: ["routine_name"],
    },
  )
  .refine(
    (data) => {
      if (data.is_routine) {
        return data.periodicity !== undefined;
      }
      return true;
    },
    {
      message: "Периодичность обязательна для рутинной задачи",
      path: ["periodicity"],
    },
  );

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
