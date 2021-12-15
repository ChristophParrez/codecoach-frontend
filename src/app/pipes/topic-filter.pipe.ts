import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../model/User";

@Pipe({
  name: 'topicFilter'
})
export class TopicFilterPipe implements PipeTransform {

  transform(coaches: User[], selectedTopic: string): any[] {
    if (selectedTopic !== null) {
      let updatedCoaches: User[] = [];
      for (let coach of coaches) {
        for (let topic of coach.coachInformation.coachingTopics) {
          if (topic.topic.name === selectedTopic) {
            updatedCoaches.push(coach);
          }
        }
      }
      return updatedCoaches;
    }
    return coaches;
  }
}
