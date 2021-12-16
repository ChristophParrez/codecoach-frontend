import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../model/User";

@Pipe({
  name: 'topicFilter'
})
export class TopicFilterPipe implements PipeTransform {

  transform(coaches: User[], selectedTopics: string[]): any[] {
    return coaches.filter(
      coach => coach.coachInformation.coachingTopics.filter(
        topic => selectedTopics?.includes(topic?.topic?.name)
      ));
  }
}

/*

if (selectedTopics !== null) {
      let updatedCoaches: User[] = [];
      for (let coach of coaches) {
        for (let topic of coach.coachInformation.coachingTopics) {
          for (let selectedTopic of selectedTopics) {
            if (topic.topic.name === selectedTopic) {
              updatedCoaches.push(coach);
            }
          }
        }
      }
      return updatedCoaches;
    }
    return coaches;
  }

 */
