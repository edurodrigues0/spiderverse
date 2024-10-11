export interface IHero {
  id: string;
  name: string;
  universe: number;
  details: Details;
}

interface Details {
  fullName: string;
  birthday: string;
  homeland: string;
  height: number;
  weight: number;
}
