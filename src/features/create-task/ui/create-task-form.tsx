import Datepicker from "@/shared/ui/datepicker";
import FormSelect, {
  AvatarItemRenderer,
  AvatarTriggerRenderer,
} from "@/shared/ui/select";
import {
  Button,
  Checkbox,
  createListCollection,
  Field,
  Fieldset,
  Input,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { createTaskSchema, type CreateTaskFormData } from "../model/schema";
import FileInput from "@/shared/ui/file-input";
import { useEffect, useRef } from "react";
import { useCreateTask } from "../model/use-create-task";

export default function CreateTaskForm() {
  const assigneesSelectRef = useRef<HTMLButtonElement>(null);
  const { mutate, isPending } = useCreateTask();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      context: "",
      for_team: false,
      is_routine: false,
      routine_name: "",
      routine_description: "",
      assignees: [],
      deadline: null,
      file: null,
    },
  });

  const isRoutine = watch("is_routine");
  const forTeam = watch("for_team");
  const context = watch("context");
  const routineDescription = watch("routine_description");

  useEffect(() => {
    if (forTeam) {
      setTimeout(() => {
        assigneesSelectRef.current?.focus();
        assigneesSelectRef.current?.click();
      }, 0);
    }
  }, [forTeam]);

  const onSubmit: SubmitHandler<CreateTaskFormData> = (data) => {
    console.log("Form submitted:", data);
    mutate(data);
  };

  const options = createListCollection({
    items: [
      { label: "Ежедневно", value: "daily" },
      { label: "Еженедельно", value: "weekly" },
      { label: "Ежемесячно", value: "monthly" },
    ],
  });

  const people = createListCollection({
    items: [
      {
        name: "Leilani Crist",
        value: "person-0",
        avatar: "https://i.pravatar.cc/150?img=0",
      },
      {
        name: "Lola Cummerata",
        value: "person-1",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        name: "Janis Davis IV",
        value: "person-2",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        name: "Chet Ritchie",
        value: "person-3",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      {
        name: "Edwin Metz",
        value: "person-4",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      {
        name: "Tommy Collins",
        value: "person-5",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        name: "Blanche Zemlak",
        value: "person-6",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      {
        name: "Miss Eileen Stamm Sr.",
        value: "person-7",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      {
        name: "Jill Krajcik",
        value: "person-8",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      {
        name: "Jody Balistreri",
        value: "person-9",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
    ],
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label className="text-secondary ml-4 gap-2 font-normal">
              Контекст задачи
              <FaStar className="text-primary size-2.5" />
            </Field.Label>
            <div className="relative w-full">
              <Textarea
                {...register("context")}
                borderRadius="lg"
                _focus={{ borderColor: "var(--primary)" }}
                rows={3}
                minHeight="70px"
                maxLength={4096}
              />
              <span className="text-secondary absolute right-4 bottom-4 text-[12px]">
                {context.length} / 4096
              </span>
              {errors.context && (
                <span className="text-sm text-red-500">
                  {errors.context.message}
                </span>
              )}
            </div>
          </Field.Root>

          <div className="flex w-full items-center justify-between">
            <Field.Root>
              <Controller
                name="for_team"
                control={control}
                render={({ field }) => (
                  <Switch.Root
                    size="lg"
                    colorPalette="purple"
                    checked={field.value}
                    onCheckedChange={(details) =>
                      field.onChange(details.checked)
                    }
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                    <Switch.Label>Назначить на команду</Switch.Label>
                  </Switch.Root>
                )}
              />
            </Field.Root>

            <Field.Root>
              <Controller
                name="is_routine"
                control={control}
                render={({ field }) => (
                  <Checkbox.Root
                    colorPalette="purple"
                    checked={field.value}
                    onCheckedChange={(details) =>
                      field.onChange(details.checked)
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control borderRadius="5px" />
                    <Checkbox.Label className="flex items-center gap-2">
                      Рутинная задача
                      <IoMdInformationCircleOutline className="text-primary size-5" />
                    </Checkbox.Label>
                  </Checkbox.Root>
                )}
              />
            </Field.Root>
          </div>

          {isRoutine && (
            <div className="border-primary w-full space-y-2 rounded-2xl border border-dashed p-4">
              <Field.Root>
                <Field.Label className="text-secondary ml-4 gap-2 font-normal">
                  Название рутинной задачи
                  <FaStar className="text-primary size-2.5" />
                </Field.Label>
                <Input
                  {...register("routine_name")}
                  borderRadius="lg"
                  _focus={{ borderColor: "var(--primary)" }}
                  placeholder="Укажите название рутинной задачи"
                />
                {errors.routine_name && (
                  <span className="text-sm text-red-500">
                    {errors.routine_name.message}
                  </span>
                )}
              </Field.Root>

              <Field.Root>
                <Field.Label className="text-secondary ml-4 gap-2 font-normal">
                  Периодичность
                  <FaStar className="text-primary size-2.5" />
                </Field.Label>
                <Controller
                  name="periodicity"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      collection={options}
                      value={field.value ? [field.value] : []}
                      onValueChange={(values) => field.onChange(values[0])}
                      placeholder="Выберите периодичность"
                    />
                  )}
                />
                {errors.periodicity && (
                  <span className="text-sm text-red-500">
                    {errors.periodicity.message}
                  </span>
                )}
              </Field.Root>

              <Field.Root>
                <Field.Label className="text-secondary ml-4 gap-2 font-normal">
                  Описание
                </Field.Label>
                <div className="relative w-full">
                  <Textarea
                    {...register("routine_description")}
                    borderRadius="lg"
                    _focus={{ borderColor: "var(--primary)" }}
                    rows={3}
                    minHeight="70px"
                    maxLength={4096}
                    placeholder="Описание рутинной задачи"
                  />
                  <span className="text-secondary absolute right-4 bottom-4 text-[12px]">
                    {routineDescription.length} / 4096
                  </span>
                  {errors.routine_description && (
                    <span className="text-sm text-red-500">
                      {errors.routine_description.message}
                    </span>
                  )}
                </div>
              </Field.Root>
            </div>
          )}

          <Field.Root>
            <Field.Label className="text-secondary ml-4 gap-2 font-normal">
              Исполнители задачи
            </Field.Label>
            <Controller
              name="assignees"
              control={control}
              render={({ field }) => (
                <FormSelect
                  ref={assigneesSelectRef}
                  collection={people}
                  multiple
                  value={field.value}
                  onValueChange={field.onChange}
                  renderTrigger={(items, selectedValues) =>
                    AvatarTriggerRenderer(items, selectedValues)
                  }
                  renderItem={(item) => AvatarItemRenderer(item)}
                />
              )}
            />
            {errors.assignees && (
              <span className="text-sm text-red-500">
                {errors.assignees.message}
              </span>
            )}
          </Field.Root>

          <Field.Root>
            <Field.Label className="text-secondary ml-4 gap-2 font-normal">
              Срок выполнения
            </Field.Label>
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => <Datepicker onChange={field.onChange} />}
            />
            {errors.deadline && (
              <span className="text-sm text-red-500">
                {errors.deadline.message}
              </span>
            )}
          </Field.Root>
          <Field.Root>
            <Field.Label className="text-secondary ml-4 gap-2 font-normal">
              Файлы
            </Field.Label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FileInput onChange={(files) => field.onChange(files)} />
              )}
            />
            {errors.file && (
              <span className="text-sm text-red-500">
                {errors.file.message}
              </span>
            )}
          </Field.Root>
        </Fieldset.Content>
        <Button type="submit" colorPalette="purple" loading={isPending}>
          Отправить
        </Button>
      </Fieldset.Root>
    </form>
  );
}
