import { DatePicker, Portal } from "@chakra-ui/react";
import { LuCalendar } from "react-icons/lu";

interface DatepickerProps {
  onChange?: (date: Date | null) => void;
}

export default function Datepicker({ onChange }: DatepickerProps) {
  const handleChange = (details: DatePicker.ValueChangeDetails) => {
    if (details.value?.[0]) {
      const dateValue = details.value[0];
      const date = new Date(dateValue.year, dateValue.month - 1, dateValue.day);
      onChange?.(date);
    } else {
      onChange?.(null);
    }
  };

  return (
    <DatePicker.Root colorPalette="purple" onValueChange={handleChange}>
      <DatePicker.Control>
        <DatePicker.Input borderRadius="lg" />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  );
}
