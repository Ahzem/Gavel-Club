import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`calendar ${className || ''}`}
      classNames={{
        months: 'calendar__months',
        month: 'calendar__month',
        caption: 'calendar__header',
        caption_label: 'calendar__month-label',
        nav: 'calendar__nav',
        nav_button: 'calendar__nav-button',
        nav_button_previous: 'calendar__nav-button--prev',
        nav_button_next: 'calendar__nav-button--next',
        table: 'calendar__table',
        head_row: 'calendar__weekdays',
        head_cell: 'calendar__weekday',
        row: 'calendar__week',
        cell: 'calendar__cell',
        day: 'calendar__day',
        day_range_start: 'calendar__day--range-start',
        day_range_end: 'calendar__day--range-end',
        day_selected: 'calendar__day--selected',
        day_today: 'calendar__day--today',
        day_outside: 'calendar__day--outside',
        day_disabled: 'calendar__day--disabled',
        day_range_middle: 'calendar__day--range-middle',
        day_hidden: 'calendar__day--hidden',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="calendar__nav-icon" />,
        IconRight: () => <ChevronRightIcon className="calendar__nav-icon" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };