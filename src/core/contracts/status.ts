export enum Status {
  notStarted,
  started,
  completed
}

export function getOptionsName(status: Status): string {
  switch (status) {
    case Status.notStarted:
      return 'Not Started';
    case Status.started:
      return 'Started';
    case Status.completed:
      return 'Completed';
    default:
      return 'Unknown status'
  }
};
