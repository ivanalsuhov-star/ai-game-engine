import type { HandbookTopic, Topic } from "../types";
import { probabilityHandbook } from "./probability";
import { statisticsHandbook } from "./statistics";
import { economicsHandbook } from "./economics";
import { geometryHandbook } from "./geometry";

export const handbook: HandbookTopic[] = [
  ...probabilityHandbook,
  ...statisticsHandbook,
  ...economicsHandbook,
  ...geometryHandbook,
];

export function getHandbookByTopic(topic: Topic): HandbookTopic[] {
  return handbook.filter((h) => h.topic === topic);
}

export function getHandbookTopicById(id: string): HandbookTopic | undefined {
  return handbook.find((h) => h.id === id);
}
