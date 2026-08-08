import { createEvents } from "ics";
import { saveAs } from "file-saver";

/* ===========================
Helper
=========================== */

const getDateArray = (date) => {
  const d = new Date(date);

  return [
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
    10, // Start Time (10:00 AM)
    0,
  ];
};

/* ===========================
Google Calendar
=========================== */

export const openGoogleCalendar = (plan) => {
  const start = new Date(plan.study_date);

  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  const format = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(plan.topic)}` +
    `&details=${encodeURIComponent(
      `Subject: ${plan.subject}`
    )}` +
    `&dates=${format(start)}/${format(end)}`;

  window.open(url, "_blank");
};

/* ===========================
Outlook Calendar
=========================== */

export const openOutlookCalendar = (plan) => {
  const start = new Date(plan.study_date);

  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  const url =
    "https://outlook.live.com/calendar/0/deeplink/compose?" +
    `subject=${encodeURIComponent(plan.topic)}` +
    `&body=${encodeURIComponent(
      `Subject: ${plan.subject}`
    )}` +
    `&startdt=${start.toISOString()}` +
    `&enddt=${end.toISOString()}`;

  window.open(url, "_blank");
};

/* ===========================
Download ICS
=========================== */

export const downloadICS = (plan) => {
  const event = {
    title: plan.topic,
    description: `Subject: ${plan.subject}`,
    start: getDateArray(plan.study_date),
    duration: {
      hours: 1,
      minutes: 0,
    },
    status: "CONFIRMED",
    busyStatus: "BUSY",
  };

  createEvents([event], (error, value) => {
    if (error) {
      console.error(error);
      return;
    }

    const blob = new Blob([value], {
      type: "text/calendar;charset=utf-8",
    });

    saveAs(blob, `${plan.topic}.ics`);
  });
};