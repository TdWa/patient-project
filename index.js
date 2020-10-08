const patients = require('./patients')
const express = require('express')
const app = express()

function formatDossier(dossier) {
  let printOut = ''
  for (let [key, value] of Object.entries(dossier)) {
    const capital = key.search(/[A-Z]/)
    if (capital !== -1) {
      key = key.replace(key[capital], ` ${key[capital]}`)
    }
    key = key.replace(key[0], key[0].toUpperCase())
    printOut += `<strong>${key}:</strong><br>${value}<br><br>`
  }
  return printOut
}

function render(patient) {
 return ` 
 <html>
    <head>
      <title>${patient.firstName} ${patient.lastName}</title>

      <style>
        h1 {
          color: red;
        }
      </style>
    </head>

    <body>
      <h1>Patient: ${patient.firstName} ${patient.lastName}</h1>
      <p>${formatDossier(patient)}</p>
    </body>
  </html>
  `
}

const route = '/patient/:id'
app.get(route, (req, res) => {
  console.log(`requesting on path: ${req.path}`)
  const patient = patients.find((patient) => patient.id === Number(req.params.id))
  if (patient === undefined) {
    res.send('Patient not found')
    return
  }
  res.send(render(patient))
})

const port = 3000
app.listen(port, () => console.log(`listening to port: ${port}`))


