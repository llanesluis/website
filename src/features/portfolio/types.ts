export type Work = {
  type: "contribution" | "work";
  name: string;
  description: string;
  details?: string;
  features?: string[];
  url: string;
};

export type Project = {
  name: string;
  description: string;
  url: string;
};
