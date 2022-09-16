export class TimeRegistration {
  constructor(
    public registrationId: number,
    public userId: number,
    public projectName: string,
    public comment: string,
    public hours: number,
    public registrationTime: Date
  ) { }
}

