import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { ClassNames } from "react-day-picker";
import { eventsApi } from "../../services/api";
import { Event } from "../../lib/types";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import '../../styles/components/calendar.css';

interface ExtendedClassNames extends ClassNames {
  day_hasEvent?: string;
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const fetchedEvents = await eventsApi.getAllEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        setError("Failed to load events");
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="calendar__error">{error}</div>;
  }

  // Get all dates that have events
  const eventDates = events.map(event => new Date(event.date));
  
  // Create modifier for days with events
  const modifiers = {
    hasEvent: (date: Date) =>
      eventDates.some(
        eventDate => eventDate.toDateString() === date.toDateString()
      ),
  };

  const extendedClassNames: ExtendedClassNames = {
    ...classNames,
    months: "calendar__months",
    month: "calendar__month",
    caption: "calendar__header",
    caption_label: "calendar__month-label",
    nav: "calendar__nav",
    nav_button: "calendar__nav-button",
    nav_button_previous: "calendar__nav-button--prev",
    nav_button_next: "calendar__nav-button--next",
    table: "calendar__table",
    head_row: "calendar__weekdays",
    head_cell: "calendar__weekday",
    row: "calendar__week",
    cell: "calendar__cell",
    day: "calendar__day",
    day_selected: "calendar__day--selected",
    day_today: "calendar__day--today",
    day_outside: "calendar__day--outside",
    day_disabled: "calendar__day--disabled",
    day_hidden: "calendar__day--hidden",
    day_range_middle: "calendar__day--range-middle",
    day_hasEvent: "calendar__day--has-event"
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`calendar ${className || ""}`}
      modifiers={modifiers}
      classNames={extendedClassNames}
      modifiersClassNames={{
        hasEvent: "calendar__day--has-event"
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="calendar__nav-icon" />,
        IconRight: () => <ChevronRightIcon className="calendar__nav-icon" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };