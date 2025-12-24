const courses = [
  {
    code: "COMP2121",
    name: "Discrete Mathematics",
    instructor: "Simin Jolfaee",
    credit: 4,
    schedule: [
      {
        CRN: 86154,
        classType: "Lecture",
        day: "MON",
        time: "0830-1020",
        classroom: "DTC 581",
      },
      {
        CRN: 72567,
        classType: "Lab",
        day: "MON",
        time: "1330-1520",
        classroom: "DTC 686",
      },
    ],
  },
];

init();

function init() {
  drawTimetable(insertCourses);

  const addCourseBtn = document.getElementById("addCourseBtn");
  addCourseBtn.addEventListener("click", () => {
    location.href = "./courseForm.html";
  });
}

function drawTimetable(callback) {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const timetable = document.getElementById("timetable");
  const timetableStartHour = 8;
  const timetableEndHour = 18;
  const timetableMinuteInterval = 30;
  const timetableDays = 5;

  const timetableWidth = (timetableDays + 1) * 100;
  timetable.style.width = timetableWidth.toString() + "px";

  const mainSectionDiv = document.getElementById("mainSectionDiv");
  mainSectionDiv.style.width = (timetableWidth + 100).toString() + "px";

  for (let i = timetableStartHour - 1; i < timetableEndHour; i++) {
    for (let j = 0; j < 60; j += timetableMinuteInterval) {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      const hour = i.toString().padStart(2, "0");
      const minute = j.toString().padStart(2, "0");
      const timeString = hour + minute;

      if (i < timetableStartHour) {
        th.innerText = "TIME";
        j += 60;
      } else {
        th.innerText = timeString;
      }
      tr.append(th);
      for (let k = 0; k < timetableDays; k++) {
        if (i < timetableStartHour) {
          const daysTh = document.createElement("th");
          daysTh.innerText = days[k];
          tr.append(daysTh);
        } else {
          const td = document.createElement("td");
          td.className = days[k] + "-" + hour;
          td.id = days[k] + "-" + timeString;
          tr.append(td);
        }
      }
      timetable.append(tr);
    }
  }

  if (callback) {
    callback(timetableMinuteInterval);
  }
}

function insertCourses(timetableMinuteInterval) {
  courses.forEach((course) => {
    const schedules = course.schedule;
    schedules.forEach((schedule) => {
      const day = schedule.day;
      const time = schedule.time;
      const startTime = time.slice(0, 4);
      let endTime = time.slice(5);
      let endHour = parseInt(endTime.slice(0, 2));
      let endMinute = parseInt(endTime.slice(2));

      const remainder = endMinute % timetableMinuteInterval;
      if (remainder != 0) {
        endMinute = timetableMinuteInterval - remainder + endMinute;
        if (endMinute == 0) endHour += 1;
      }
      endTime = endHour.toString() + endMinute.toString();

      const minuteDiff = timeDiff(startTime, endTime);
      const tdCount = minuteDiff / timetableMinuteInterval;

      const tdId = day + "-" + startTime;
      removeTd(tdId, tdCount, timetableMinuteInterval);

      const scheduleTd = document.getElementById(tdId);
      scheduleTd.setAttribute("rowspan", tdCount);
      scheduleTd.innerHTML = `
      ${course.code}<br>
      <strong>${course.name}</strong><br>
      ${schedule.classType}<br>
      ${schedule.time}<br>
      ${schedule.classroom}<br>
      `;
    });
  });
}

function timeDiff(startTime, endTime) {
  const startHour = parseInt(startTime.slice(0, 2));
  const startMinute = parseInt(startTime.slice(2));
  const endHour = parseInt(endTime.slice(0, 2));
  const endMinute = parseInt(endTime.slice(2));
  return (endHour - startHour) * 60 + endMinute - startMinute;
}

function removeTd(tdId, tdCount, timetableMinuteInterval) {
  const day = tdId.slice(0, 3);
  const startHour = tdId.slice(4, 6);
  const startHourToMinute = parseInt(startHour) * 60;
  const startMinute = startHourToMinute + parseInt(tdId.slice(6, 8));
  const endMinute = startMinute + timetableMinuteInterval * tdCount;
  for (
    let i = startMinute + timetableMinuteInterval;
    i < endMinute;
    i += timetableMinuteInterval
  ) {
    const targetTimeInMinute = i;
    const targetTimeHour = parseInt(targetTimeInMinute / 60)
      .toString()
      .padStart(2, 0);
    const targetTimeMinute = (targetTimeInMinute % 60)
      .toString()
      .padStart(2, 0);

    const targetTd = document.getElementById(
      day + "-" + targetTimeHour + targetTimeMinute
    );
    targetTd.remove();
  }
}

function roughjsTest() {
  const mainSectionDiv = document.getElementById("mainSectionDiv");
  const mainRect = mainSectionDiv.getBoundingClientRect();
  // 왼쪽 위 꼭지점
  const x = mainRect.x;
  const y = mainRect.y;
  // 각각 너비, 높이
  const width = mainRect.width;
  const height = mainRect.height;

  console.log(x, y, width, height);

  // 따라서
  // 왼쪽 위 꼭짓점 좌표: (x, y)
  // 오른쪽 위 꼭짓점 좌표: (x + width, y)
  // 왼쪽 아래 꼭짓점 좌표: (x, y + height)
  // 오른쪽 아래 꼭짓점 좌표: (x + width, y + height)
}
