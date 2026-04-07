import {
  Checkbox,
  createListCollection,
  Field,
  Fieldset,
  Image,
  Input,
  Portal,
  Select,
  Span,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function CreateTaskForm() {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

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
    <Fieldset.Root>
      <Fieldset.Content>
        <Field.Root>
          <Field.Label className="text-secondary ml-4 gap-2 font-normal">
            Контекст задачи
            <FaStar className="text-primary size-2.5" />
          </Field.Label>
          <div className="relative w-full">
            <Textarea
              borderRadius="lg"
              _focus={{ borderColor: "var(--primary)" }}
              rows={3}
              minHeight="70px"
              name="context"
              maxLength={4096}
            />
            <span className="text-secondary absolute right-4 bottom-4 text-[12px]">
              123 / 4096
            </span>
          </div>
        </Field.Root>
        <div className="flex w-full items-center justify-between">
          <Field.Root>
            <Switch.Root size="lg" name="for_team" colorPalette="purple">
              <Switch.HiddenInput />
              <Switch.Control />
              <Switch.Label>Назначить на команду</Switch.Label>
            </Switch.Root>
          </Field.Root>
          <Field.Root>
            <Checkbox.Root name="is_routine" colorPalette="purple">
              <Checkbox.HiddenInput />
              <Checkbox.Control borderRadius="5px" />
              <Checkbox.Label className="flex items-center gap-2">
                Рутинная задача
                <IoMdInformationCircleOutline className="text-primary size-5" />
              </Checkbox.Label>
            </Checkbox.Root>
          </Field.Root>
        </div>

        <div className="border-primary w-full space-y-2 rounded-2xl border border-dashed p-4">
          <Field.Root>
            <Field.Label className="text-secondary ml-4 gap-2 font-normal">
              Название рутинной задачи
              <FaStar className="text-primary size-2.5" />
            </Field.Label>
            <Input
              name="routine_name"
              borderRadius="lg"
              _focus={{ borderColor: "var(--primary)" }}
              placeholder="Укажите название рутинной задачи"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label className="text-secondary ml-4 gap-2 font-normal">
              Периодичность
              <FaStar className="text-primary size-2.5" />
            </Field.Label>
            <Select.Root collection={options} size="sm">
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger borderRadius="lg" width="full" height={10}>
                  <Select.ValueText placeholder="Выберите периодичность" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {options.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Field.Root>

          <Field.Root>
            <Field.Label className="text-secondary ml-4 gap-2 font-normal">
              Описание
            </Field.Label>
            <div className="relative w-full">
              <Textarea
                borderRadius="lg"
                _focus={{ borderColor: "var(--primary)" }}
                rows={3}
                minHeight="70px"
                name="context"
                maxLength={4096}
                placeholder="Описание рутинной задачи"
              />
              <span className="text-secondary absolute right-4 bottom-4 text-[12px]">
                123 / 4096
              </span>
            </div>
          </Field.Root>
        </div>

        <Field.Root>
          <Field.Label className="text-secondary ml-4 gap-2 font-normal">
            Исполнители задачи
          </Field.Label>
          <Select.Root
            collection={people}
            size="sm"
            multiple
            value={selectedPeople}
            onValueChange={(details) => setSelectedPeople(details.value)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger borderRadius="lg" width="full" height={10}>
                <div className="flex items-center gap-2">
                  {selectedPeople.length === 0 ? (
                    <Select.ValueText placeholder="Укажите исполнителей проекта" />
                  ) : (
                    <>
                      {selectedPeople.length >= 1 && (
                        <div className="flex items-center gap-1.5 rounded-full bg-purple-100 px-2 py-1">
                          <Image
                            src={
                              people.items.find(
                                (p) => p.value === selectedPeople[0],
                              )?.avatar
                            }
                            height={24}
                            width={24}
                            borderRadius="full"
                            className="h-6 w-6"
                          />
                          <Span className="text-sm font-medium">
                            {
                              people.items.find(
                                (p) => p.value === selectedPeople[0],
                              )?.name
                            }
                          </Span>
                        </div>
                      )}
                      {selectedPeople.length > 1 && (
                        <Span className="text-primary text-sm">
                          ещё {selectedPeople.length - 1}
                        </Span>
                      )}
                    </>
                  )}
                </div>
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content gap={2}>
                  {people.items.map((person) => (
                    <Select.Item
                      item={person}
                      key={person.value}
                      className="border-primary border"
                      borderRadius="sm"
                      justifyContent="start"
                    >
                      <Image
                        src={person.avatar}
                        height={30}
                        width={30}
                        borderRadius="full"
                      />
                      <Span fontWeight={400}>{person.name}</Span>
                      <Select.ItemIndicator className="ml-auto" />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Field.Root>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}
