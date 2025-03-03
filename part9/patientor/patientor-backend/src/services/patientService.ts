import patientData from "../../data/patients"
import { NewPatientEntry, NonSsnPatient, Patient } from "../types"
import { v1 as uuid } from "uuid"

const patients: Patient[] = patientData as Patient[]

const getPatientsWithoutSsn = (): NonSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = (entry: NewPatientEntry): Patient => {
  const newDiaryEntry = {
    id: uuid(),
    ...entry,
  }

  patients.push(newDiaryEntry)
  return newDiaryEntry
}

export default {
  getPatientsWithoutSsn,
  addPatient
}
