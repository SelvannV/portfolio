export type TimelineEvent = {
  id: string;
  start: string;
  end: string;
  text: string;
};

export type AboutData = {
  letter: {
    content: string[];
    modifiedAt: string;
  };
  timeline: TimelineEvent[];
  interests: string[];
  languages: Record<string, string>;
  tools: string[];
};
