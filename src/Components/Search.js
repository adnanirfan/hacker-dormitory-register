import React, { useState } from "react";
import { STUDENTS } from "../studentsList";

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split("-");
  const [yyyy, mm, dd] = validityDate.split("-");
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}

function Search({ setError, addToResidentsList }) {
  const [form, setForm] = useState({
    studentName: "",
    joiningDate: "",
  });

  const onChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const onAdd = () => {
    const student = STUDENTS.find((v) => {
      return form.studentName.toLowerCase() === v.name.toLowerCase();
    });

    if (!student) {
      setError(`Sorry, ${form.studentName} is not a verified student!`);
    } else if (
      student &&
      checkValidity(form.joiningDate, student.validityDate)
    ) {
      debugger;
      setError("");
      addToResidentsList(student.name);
      setForm({
        studentName: "",
        joiningDate: "",
      });
    } else {
      setError(`Sorry, ${student.name}'s validity has Expired!`);
    }
  };

  return (
    <div className="my-50 layout-row align-items-end justify-content-end">
      <label htmlFor="studentName">
        Student Name:
        <div>
          <input
            id="studentName"
            data-testid="studentName"
            type="text"
            className="mr-30 mt-10"
            value={form.studentName}
            onChange={(v) => onChange("studentName", v.target.value)}
          />
        </div>
      </label>
      <label htmlFor="joiningDate">
        Joining Date:
        <div>
          <input
            id="joiningDate"
            data-testid="joiningDate"
            type="date"
            className="mr-30 mt-10"
            value={form.joiningDate}
            onChange={(v) => onChange("joiningDate", v.target.value)}
          />
        </div>
      </label>
      <button
        type="button"
        data-testid="addBtn"
        className="small mb-0"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}

export default Search;
