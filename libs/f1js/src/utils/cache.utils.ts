import { Endpoint, Meeting } from '@f1js/f1js/models/live-timining.interface';

export function buildMeetingCacheKey(endpoint: Endpoint, meeting: Meeting) {
  return `${endpoint.endpoint}:${meeting.year}:${meeting.weekendDate}:${meeting.name}:${meeting.sessionDate}:${meeting.session}`;
}
