init();

function init() {
  addScheduleInputs();

  const addScheduleBtn = document.getElementById("addScheduleBtn");
  addScheduleBtn.addEventListener("click", addScheduleInputs);
}

function addScheduleInputs() {
  const scheduleHtml = `
          <div class="scheduleSets">
            <label for="CRN">CRN: </label>
            <input type="text" class="CRN" name="CRN" />
            <label for="classType">Class Type: </label>
            <select name="classType" class="classType">
              <option value="lecture">Lecture</option>
              <option value="lab">Lab</option>
            </select>
            <label for="day">Day: </label>
            <select name="day" class="day">
              <option value="mon">MON</option>
              <option value="tue">TUE</option>
              <option value="wed">WED</option>
              <option value="thu">THU</option>
              <option value="fri">FRI</option>
            </select>
            <label for="startTime">Class Start Time: </label>
            <input type="time" class="startTime" name="startTime" />
            <label for="endTime">Class End Time: </label>
            <input type="time" class="endTime" name="endTime" />
            <label for="classroom">Classroom: </label>
            <input type="text" class="classroom" name="classroom" />
            <button type="button" class="deleteScheduleBtns" onClick="deleteSchedule(this)">
              Delete Schedule
            </button>
          </div>`;

  const scheduleFieldset = document.getElementById("scheduleFieldset");
  scheduleFieldset.innerHTML += scheduleHtml;
}

function deleteSchedule(self) {
  self.parentNode.remove();
}
