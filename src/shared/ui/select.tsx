import {
  Select,
  Portal,
  Image,
  Span,
  type ListCollection,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { forwardRef } from "react";

interface SelectProps<
  T extends { label?: string; value: string; [key: string]: unknown },
> {
  collection: ListCollection<T>;
  value: string[] | undefined;
  onValueChange: (values: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  renderTrigger?: (items: T[], selectedValues: string[]) => ReactNode;
  renderItem?: (item: T) => ReactNode;
  size?: "sm" | "md" | "lg";
}

const FormSelect = forwardRef<HTMLButtonElement, SelectProps<any>>(
  function FormSelect(
    {
      collection,
      value = [],
      onValueChange,
      placeholder = "Выберите опцию",
      multiple = false,
      renderTrigger,
      renderItem,
      size = "sm",
    },
    ref,
  ) {
    return (
      <Select.Root
        collection={collection}
        size={size}
        multiple={multiple}
        value={value}
        onValueChange={(details) => onValueChange(details.value)}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger ref={ref} borderRadius="lg" width="full" height={10}>
            {renderTrigger ? (
              renderTrigger(collection.items, value)
            ) : (
              <Select.ValueText placeholder={placeholder} />
            )}
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content gap={2}>
              {collection.items.map((item) => (
                <Select.Item
                  item={item}
                  key={item.value}
                  className={renderItem ? "border-primary border" : ""}
                  borderRadius="sm"
                  justifyContent="start"
                >
                  {renderItem ? (
                    renderItem(item)
                  ) : (
                    <>
                      {item.label}
                      <Select.ItemIndicator />
                    </>
                  )}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    );
  },
);

export default FormSelect;

export function AvatarItemRenderer(item: {
  name?: string;
  avatar?: string;
  label?: string;
  [key: string]: unknown;
}) {
  return (
    <>
      {item.avatar && (
        <Image src={item.avatar} height={30} width={30} borderRadius="full" />
      )}
      <Span fontWeight={400}>{item.name || item.label}</Span>
      <Select.ItemIndicator className="ml-auto" />
    </>
  );
}

export function AvatarTriggerRenderer(
  items: {
    name?: string;
    avatar?: string;
    value: string;
    label?: string;
    [key: string]: unknown;
  }[],
  selectedValues: string[],
) {
  const selectedPeople = selectedValues.filter((v) =>
    items.some((item) => item.value === v),
  );

  if (selectedPeople.length === 0) {
    return <Select.ValueText placeholder="Укажите исполнителей проекта" />;
  }

  const firstPerson = items.find((p) => p.value === selectedPeople[0]);

  return (
    <div className="flex items-center gap-2">
      {selectedPeople.length >= 1 && (
        <div className="flex items-center gap-1.5 rounded-full bg-purple-100 px-2 py-1">
          {firstPerson?.avatar && (
            <Image
              src={firstPerson.avatar}
              height={24}
              width={24}
              borderRadius="full"
              className="h-6 w-6"
            />
          )}
          <Span className="text-sm font-medium">{firstPerson?.name}</Span>
        </div>
      )}
      {selectedPeople.length > 1 && (
        <Span className="text-primary text-sm">
          ещё {selectedPeople.length - 1}
        </Span>
      )}
    </div>
  );
}
