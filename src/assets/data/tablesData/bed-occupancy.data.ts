export interface HospitalData {
  nameKey: string;
  generalOccupancy: number;
  internalWardOccupancy: number;
}

export const hospitalBedOccupancyData: HospitalData[] = [
  { nameKey: 'hadasa', generalOccupancy: 92, internalWardOccupancy: 105 },
  { nameKey: 'ichilov', generalOccupancy: 85, internalWardOccupancy: 91 },
  { nameKey: 'shiba', generalOccupancy: 90, internalWardOccupancy: 93 },
  { nameKey: 'soroka', generalOccupancy: 88, internalWardOccupancy: 95 },
  { nameKey: 'rambam', generalOccupancy: 82, internalWardOccupancy: 89 },
  { nameKey: 'barzilay', generalOccupancy: 98, internalWardOccupancy: 110 },
  { nameKey: 'meir', generalOccupancy: 80, internalWardOccupancy: 87 },
  { nameKey: 'hilelyafe', generalOccupancy: 101, internalWardOccupancy: 89 },
  { nameKey: 'wolfson', generalOccupancy: 81, internalWardOccupancy: 85 },
  { nameKey: 'benyatzion', generalOccupancy: 79, internalWardOccupancy: 83 },
  { nameKey: 'ziv', generalOccupancy: 35, internalWardOccupancy: 40 },
  { nameKey: 'pouria', generalOccupancy: 77, internalWardOccupancy: 81 }
];