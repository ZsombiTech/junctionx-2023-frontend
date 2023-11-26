export const allDevices = [
  { id: 1, name: "TrueBeam#1" },
  { id: 2, name: "TrueBeam#2" },
  { id: 3, name: "VitalBeam#3" },
  { id: 4, name: "VitalBeam#4" },
  { id: 5, name: "Unique#5" },
];

const startingDays = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];

const daysCount = [30, 31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31];

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const monthsNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const hoursInADay = [
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 AM",
  "13 PM",
  "14 PM",
  "15 PM",
  "16 PM",
  "17 PM",
  "18 PM",
  "19 PM",
  "20 PM",
  "21 PM",
  "22 PM",
  "23 PM",
  "24 PM",
];

export const calendarDataConverter = (rawData: any) => {
  const monthsSet = new Set<number>();
  rawData.days.forEach((day: any) => {
    monthsSet.add(day.month_number);
  });

  const result: any = {};
  allDevices.forEach((device) => {
    result[device.name] = [];

    monthsSet.forEach((month: number) => {
      let week: any;
      let hasRemainderFromLastWeek = false;

      if (result[device.name].length === 0) {
        week = {
          months: month,
          days: [],
          events: [],
        };
      } else {
        week = {
          months: month,
          days: [...result[device.name][result[device.name].length - 1].days],
          events: [
            ...result[device.name][result[device.name].length - 1].events,
          ],
        };
      }

      if (week.days.length > 0) {
        hasRemainderFromLastWeek = true;
      }

      let dayCounter = 1;
      let currentDayName = startingDays[month - 1];

      while (dayCounter <= daysCount[month - 1]) {
        const day = {
          name: days[currentDayName],
          number: dayCounter,
        };

        week.days.push(day);

        if (week.days.length === 7) {
          hoursInADay.forEach((hour) => {
            week.events.push(hour);

            for (let i = 0; i < 7; i++) {
              week.events.push({
                events: [],
              });
            }
          });

          if (hasRemainderFromLastWeek) {
            result[device.name][result[device.name].length - 1] = {
              ...week,
            };
            hasRemainderFromLastWeek = false;
          } else {
            result[device.name].push({
              ...week,
            });
          }

          week.days = [];
          week.events = [];
        }

        currentDayName = (currentDayName + 1) % 7;
        dayCounter++;
      }

      if (week.days.length > 0) {
        if (month === Array.from(monthsSet.values())[monthsSet.size - 1]) {
          hoursInADay.forEach((hour) => {
            week.events.push(hour);

            for (let i = 0; i < 7; i++) {
              week.events.push({
                events: [],
              });
            }
          });

          for (let x = 1; x <= 7 - week.days.length + 1; x++) {
            week.days.push({
              name: days[currentDayName],
              number: x,
            });
            currentDayName = (currentDayName + 1) % 7;
          }
        }

        result[device.name].push({
          ...week,
        });
      }
    });
  });

  rawData.days.forEach((day: any) => {
    const month = day.month_number;
    const dayNumber = day.day_number;
    const machines = day.machines;

    machines.forEach((machine: any) => {
      const machineName = machine.resource.type;
      const machineId = machine.resource.id;
      let arrayIndexByMonth = -1;

      // @ts-ignore
      for (let i = 0; i < result[`${machineName}#${machineId}`].length; i++) {
        // @ts-ignore
        if (
          result[`${machineName}#${machineId}`][i].months === month ||
          (result[`${machineName}#${machineId}`][i].months - 1 === month &&
            dayNumber > 23)
        ) {
          // @ts-ignore
          for (
            let j = 0;
            j < result[`${machineName}#${machineId}`][i].days.length;
            j++
          ) {
            // @ts-ignore
            if (
              result[`${machineName}#${machineId}`][i].days[j].number ===
              dayNumber
            ) {
              if (arrayIndexByMonth === -1) {
                arrayIndexByMonth = i;
              }
            }
          }
        }
      }

      const events = machine.events;

      events.forEach((event: any) => {
        if (event.start_minute + event.duration >= 60) {
          const eventObj = {
            name: event.display_name,
            startingMinute: event.start_minute,
            endingMinute: 60,
            color: event.color,
            start_hour: event.start_hour,
            appointment_id: event.appointment_id,
          };

          const eventObj2 = {
            name: event.display_name,
            startingMinute: 0,
            endingMinute: event.start_minute + event.duration - 60,
            color: event.color,
            start_hour: event.start_hour,
            appointment_id: event.appointment_id,
          };

          let eventStartHourIndex = -1;
          for (
            let v = 0;
            v <
            result[`${machineName}#${machineId}`][arrayIndexByMonth].events
              .length;
            v++
          ) {
            if (
              typeof result[`${machineName}#${machineId}`][arrayIndexByMonth]
                .events[v] === "string" &&
              (result[`${machineName}#${machineId}`][arrayIndexByMonth].events[
                v
              ] === `${event.start_hour} AM` ||
                result[`${machineName}#${machineId}`][arrayIndexByMonth].events[
                  v
                ] === `${event.start_hour} PM`)
            ) {
              eventStartHourIndex = v;
            }
          }

          let eventStartDayIndex = -1;
          for (
            let v = 0;
            v <
            result[`${machineName}#${machineId}`][arrayIndexByMonth].days
              .length;
            v++
          ) {
            if (
              result[`${machineName}#${machineId}`][arrayIndexByMonth].days[v]
                .number === dayNumber
            ) {
              eventStartDayIndex = v;
            }
          }

          result[`${machineName}#${machineId}`][arrayIndexByMonth].events[
            eventStartHourIndex + eventStartDayIndex + 1
          ].events.push(eventObj);
          result[`${machineName}#${machineId}`][arrayIndexByMonth].events[
            eventStartHourIndex + eventStartDayIndex + 9
          ].events.push(eventObj2);
        } else {
          const eventObj = {
            name: event.display_name,
            startingMinute: event.start_minute,
            endingMinute: event.start_minute + event.duration,
            color: event.color,
            start_hour: event.start_hour,
            appointment_id: event.appointment_id,
          };

          let eventStartHourIndex = -1;
          for (
            let v = 0;
            v <
            result[`${machineName}#${machineId}`][arrayIndexByMonth].events
              .length;
            v++
          ) {
            if (
              typeof result[`${machineName}#${machineId}`][arrayIndexByMonth]
                .events[v] === "string" &&
              (result[`${machineName}#${machineId}`][arrayIndexByMonth].events[
                v
              ] === `${event.start_hour} AM` ||
                result[`${machineName}#${machineId}`][arrayIndexByMonth].events[
                  v
                ] === `${event.start_hour} PM`)
            ) {
              eventStartHourIndex = v;
            }
          }

          let eventStartDayIndex = -1;
          for (
            let v = 0;
            v <
            result[`${machineName}#${machineId}`][arrayIndexByMonth].days
              .length;
            v++
          ) {
            if (
              result[`${machineName}#${machineId}`][arrayIndexByMonth].days[v]
                .number === dayNumber
            ) {
              eventStartDayIndex = v;
            }
          }

          result[`${machineName}#${machineId}`][arrayIndexByMonth].events[
            eventStartHourIndex + eventStartDayIndex + 1
          ].events.push(eventObj);
        }
      });
    });
  });

  return result;
};
