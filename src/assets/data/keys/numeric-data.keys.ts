export enum NumericFields {
  Confirmed = 'confirmed',
  ConfirmedYesterday = 'confirmed.yesterday',
  ConfirmedSinceMidnight = 'confirmed.since_midnight',
  ConfirmedTotal = 'confirmed.total',

  Active = 'active',
  ActiveCurrent = 'active.current',
  ActiveHospitalized = 'active.hospitalized',

  Vaccinations = 'vaccinations',
  VaccinationsDose1 = 'vaccinations.dose1',
  VaccinationsDose2 = 'vaccinations.dose2',
  VaccinationsDose3 = 'vaccinations.dose3',
  VaccinationsDose4 = 'vaccinations.dose4',
  VaccinationsOmicron = 'vaccinations.omicron',

  Deceased = 'deceased',
  DeceasedTotal = 'deceased.total',

  Tests = 'tests',
  TestsPositiveRate = 'tests.positive_rate',
  TestsVirusDetection = 'tests.virus_detection_tests',
  TestsTotal = 'tests.total_tests',

  last7daysConfirmedCases = 'last7days.ConfirmedCases',
  last7daysConfirmedPercent = 'last7days.confirmedPercent',
  last7daysDeaths = 'last7days.deaths',
  last7daysDeathsPercent = 'last7days.deathspercent',
  last7daysTests = 'last7days.tests',
  last7daysTestsPercent = 'last7days.testsPercent',
  last7daysPositiveResults = 'last7days.positiveResults'
  
}
