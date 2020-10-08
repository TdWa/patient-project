const patients = require('./patients')
const express = require('express')
const app = express()

function formatDossier(dossier) {
  let printOut = ''
  for (const [key, value] of Object.entries(dossier)) {
    printOut += `${key}: ${value}<br>`
  }
  return printOut
}

function render(patient) {
 return ` 
 <html>
    <head>
      <title>Hospital</title>
    </head>

    <body>
      <div>
        <h1>Welcome ${patient.firstName} ${patient.lastName}</h1>
        <p>${formatDossier(patient)}</p>
      </div>
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

const port =  process.env.PORT || 3000
app.listen(port, () => console.log(`listening to port: ${port}`))


