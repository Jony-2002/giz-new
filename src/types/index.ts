export interface ILanguage {
  name: string;
  description: string;
}

export interface ILocation {
  district: number;
  village: string;
  coordinates: any;
}

export interface IMedia {
  Id: string;
  title: string;
  imageUrl: string;
}

export interface INews {
  Id: string;
  category: string;
  english: ILanguage;
  tajik: ILanguage;
  russian: ILanguage;
  links: string[];
  banner_url: any;
  mediaFiles: IMedia[];
  date?: string;
}

export interface IProject {
  Id: any;
  category: string;
  english: ILanguage;
  tajik: ILanguage;
  russian: ILanguage;
  location: ILocation;
  links: string[];
  banner_url: any;
  mediaFiles: IMedia[];
}
