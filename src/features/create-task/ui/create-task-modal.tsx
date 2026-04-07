import { Button, Dialog, IconButton, Tabs } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { TbCheckbox } from "react-icons/tb";
import CreateTaskForm from "./create-task-form";

export default function CreateTaskModal() {
  return (
    <Dialog.Root open>
      <Dialog.Trigger>
        <Button>+ Create new task</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header padding={4}>
            <Dialog.Title display="flex" alignItems="center" gap="2">
              <TbCheckbox className="text-primary size-6" />
              Создание задачи
            </Dialog.Title>
            <Dialog.CloseTrigger top={4} right={3}>
              <IconButton
                size="xs"
                className="border-secondary text-secondary rounded-full bg-transparent"
              >
                <IoClose className="size-5" />
              </IconButton>
            </Dialog.CloseTrigger>
          </Dialog.Header>

          <Dialog.Body>
            <Tabs.Root defaultValue="members" variant="plain">
              <Tabs.List
                bg="bg.muted"
                rounded="l3"
                p="1"
                width="100%"
                padding={0}
                background="transparent"
                border="1px solid var(--primary)"
                borderRadius="full"
                overflow="hidden"
              >
                <Tabs.Trigger
                  value="members"
                  width="50%"
                  justifyContent="center"
                  fontWeight={600}
                  className="transition-all duration-200 data-selected:text-white"
                >
                  Создание задачи
                </Tabs.Trigger>

                <Tabs.Trigger
                  value="projects"
                  width="50%"
                  justifyContent="center"
                  fontWeight={600}
                  className="transition-all duration-200 data-selected:text-white"
                >
                  Создание напоминания
                </Tabs.Trigger>

                <Tabs.Indicator
                  rounded="l2"
                  background="var(--primary)"
                  borderRadius="full"
                />
              </Tabs.List>

              <Tabs.Content value="members">
                <CreateTaskForm />
              </Tabs.Content>

              <Tabs.Content value="projects">Скоро!</Tabs.Content>
            </Tabs.Root>
          </Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
