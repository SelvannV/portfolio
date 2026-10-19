export type Project = {
  id: number;
  title: string;
  description: string;
  links?: Record<string, string>;
  image: string;
  stack: string[];
  tags: (
    | "archived"
    | "live"
    | "in progress"
    | "new"
    | "deprecated"
    | "open source"
    | "featured"
    | "experimental"
  )[];
};
