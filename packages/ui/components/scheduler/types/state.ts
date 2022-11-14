import { TimeRange } from "@calcom/types/schedule";

import { SchedulerEvent } from "./events";

export type View = "month" | "week" | "day";
export type Hours =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;

// These will be on eventHandlers - e.g. do more actions on viewchange if required
export type SchedulerPublicActions = {
  onViewChange?: (view: View) => void;
  onEventClick?: (event: SchedulerEvent) => void;
  onEventContextMenu?: (event: SchedulerEvent) => void;
  /** Passing in a emptyCellClick will also show the on hover for creating new events. */
  onEmptyCellClick?: (date: Date) => void;
  onDateChange?: (startDate: Date, endDate?: Date) => void;
};

// We have private actions here that we want to be avalbile in state but not as component props.
export type SchedulerPrivateActions = {
  // initState is used to init the state from public props -> Doesnt override internal state
  initState: (state: SchedulerState & SchedulerPublicActions) => void;
  setView: (view: SchedulerComponentProps["view"]) => void;
  setStartDate: (startDate: SchedulerComponentProps["startDate"]) => void;
  setEndDate: (endDate: SchedulerComponentProps["endDate"]) => void;
  setEvents: (events: SchedulerComponentProps["events"]) => void;
  selectedEvent?: SchedulerEvent;
  setSelectedEvent: (event: SchedulerEvent) => void;
  handleDateChange: (payload: "INCREMENT" | "DECREMENT") => void;
};

export type SchedulerState = {
  /** @NotImplemented This in future will change the view to be daily/weekly/monthly  DAY/WEEK are supported currently however WEEK is the most adv.*/
  view?: View;
  startDate: Date;
  /** By default we just dynamically create endDate from the viewType */
  endDate: Date;
  /**Please enter events already SORTED. This is required to setup tab index correctly.
   *
   * @Note Ideally you should pass in a sorted array from the DB however, pass the prop `sortEvents` if this is not possible and we will sort this for you..
   */
  events: SchedulerEvent[];
  /** Any time ranges passed in here will display as blocked on the users calendar. Note: Anything < than the current date automatically gets blocked. */
  blockingDates?: TimeRange[];
  /** Loading will only expect events to be loading. */
  loading?: boolean;
  /** Disables all actions on Events*/
  eventsDisabled?: boolean;
  /** If you don't want the date to be scrollable past a certian date */
  minDate?: Date;
  /** If you don't want the date to be scrollable past a certian date */
  maxDate?: Date;
  /** Defined the time your calendar will start at
   *
   * @default 0
   */
  startHour?: Hours;
  /** Defined the time your calendar will end at
   *
   * @default 23
   */
  endHour?: Hours;
  /** Toggle the ablity to scroll to currentTime */
  scrollToCurrentTime?: boolean;
  /** Toggle the ablity show the current time on the calendar*/
  showCurrentTimeLine?: boolean;
  /** This indicates the number of gridstops that are avalabile per hour. 4 -> Grid set to 15 minutes.
   *
   * @default 4
   */
  gridCellsPerHour?: number;
  /**If passed in we will sort the events internally. */
  sortEvents?: boolean;
};

export type SchedulerComponentProps = SchedulerPublicActions & SchedulerState;

export type SchedulerStoreProps = SchedulerComponentProps & SchedulerPrivateActions;
