export interface Country {
    name: {
      common: string;
      official: string;
    };
    population: number;
    region: string;
    flags: {
      png: string;
      svg: string;
    };
  }