import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../model/User";

@Pipe({
  name: 'topicFilter'
})
export class TopicFilterPipe implements PipeTransform {

  transform(coaches: User[], selectedTopics: string[]): any[] {
    if (selectedTopics === null) return coaches;
    if (selectedTopics.length == 0) return coaches;
    return coaches.filter(
      coach => selectedTopics.includes(coach.coachInformation.coachingTopics[0]?.topic.name) ||
        selectedTopics.includes(coach.coachInformation.coachingTopics[1]?.topic.name));
  }
}
