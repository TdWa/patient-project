document.getElementById("patientID").addEventListener("change", changePatientID);

function changePatientID () {
  const id = document.getElementById("patientID").value
  document.getElementById("link").setAttribute("href", `http://localhost:3000/patient/${id}`);
}

