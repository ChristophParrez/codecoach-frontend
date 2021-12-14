import { CoachingTopic } from "./CoachingTopic";

export interface CoachInformation {
  coachInfoId: string;
  coachXp: number;
  introduction: string;
  availability: string;
  coachingTopics: CoachingTopic[];
}
