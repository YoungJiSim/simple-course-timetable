init();

function init() {
  addScheduleInputs();

  const addScheduleBtn = document.getElementById("addScheduleBtn");
  addScheduleBtn.addEventListener("click", addScheduleInputs);

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", addCourse);
}

function addScheduleInputs() {
  const scheduleSets = document.createElement("div");
  scheduleSets.className = "scheduleSets";
  scheduleSets.innerHTML = `<div class="inputGroupDivs">
              <div class="inputDivs">
                <label for="CRN">CRN: </label>
                <input type="text" class="CRN" name="CRN" />
              </div>
            </div>
            <div class="inputGroupDivs">
              <div class="inputDivs">
                <label for="classroom">Classroom: </label>
                <input type="text" class="classroom" name="classroom" />
              </div>
              <div class="inputDivs">
                <label for="classType">Class Type: </label>
                <select name="classType" class="classType">
                  <option value="lecture">Lecture</option>
                  <option value="lab">Lab</option>
                </select>
              </div>
            </div>
            <div class="inputGroupDivs">
              <div class="inputDivs">
                <label for="day">Day: </label>
                <select name="day" class="day">
                  <option value="mon">MON</option>
                  <option value="tue">TUE</option>
                  <option value="wed">WED</option>
                  <option value="thu">THU</option>
                  <option value="fri">FRI</option>
                </select>
              </div>
            </div>
            <div class="inputGroupDivs">
              <div class="inputDivs">
                <label for="startTime">Class Start: </label>
                <input type="time" class="startTime" name="startTime" />
              </div>
              <div class="inputDivs">
                <label for="endTime">Class End: </label>
                <input type="time" class="endTime" name="endTime" />
              </div>
            </div>
            <button type="button" class="deleteScheduleBtns" onClick="deleteSchedule(this)">
            Delete Schedule
            </button>`;

  const scheduleFieldset = document.getElementById("scheduleFieldset");
  scheduleFieldset.append(scheduleSets);
}

function deleteSchedule(self) {
  self.parentNode.remove();
}

function addCourse() {
  const code = document.getElementById("code").value;
  const name = document.getElementById("name").value;
  const instructor = document.getElementById("instructor").value;
  const credit = document.getElementById("credit").value;

  let course = {
    code: code,
    name: name,
    instructor: instructor,
    credit: credit,
    schedule: [],
  };

  const scheduleSets = document.getElementsByClassName("scheduleSets");
  for (let i = 0; i < scheduleSets.length; i++) {
    const CRN = scheduleSets[i].querySelector(".CRN").value;
    const classroom = scheduleSets[i].querySelector(".classroom").value;
    const classType = scheduleSets[i].querySelector(".classType").value;
    const day = scheduleSets[i].querySelector(".day").value.toUpperCase();
    const startTime = scheduleSets[i].querySelector(".startTime").value;
    const endTime = scheduleSets[i].querySelector(".endTime").value;
    const formattedTime = timeformatter(startTime, endTime);
    course["schedule"][i] = {
      CRN: CRN,
      classroom: classroom,
      classType: classType,
      day: day,
      time: formattedTime,
    };
  }
  localStorage.setItem("course", JSON.stringify(course));
  location.href = "./index.html";
}

function timeformatter(startTime, endTime) {
  const startHour = startTime.slice(0, 2);
  const startMinute = startTime.slice(3);
  const endHour = endTime.slice(0, 2);
  const endMinute = endTime.slice(3);
  return startHour + startMinute + "-" + endHour + endMinute;
}
