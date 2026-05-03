import type { HandbookTopic, Topic } from "../types";
import { probabilityHandbook } from "./probability";
import { statisticsHandbook } from "./statistics";
import { economicsHandbook } from "./economics";
import { geometryHandbook } from "./geometry";
import { algebraHandbook } from "./algebra";
import { functionsHandbook } from "./functions";
import { textProblemsHandbook } from "./text-problems";
import { numbersHandbook } from "./numbers";

export const handbook: HandbookTopic[] = [
  ...probabilityHandbook,
  ...statisticsHandbook,
  ...economicsHandbook,
  ...geometryHandbook,
  ...algebraHandbook,
  ...functionsHandbook,
  ...textProblemsHandbook,
  ...numbersHandbook,
];

export function getHandbookByTopic(topic: Topic): HandbookTopic[] {
  return handbook.filter((h) => h.topic === topic);
}

export function getHandbookTopicById(id: string): HandbookTopic | undefined {
  return handbook.find((h) => h.id === id);
}
