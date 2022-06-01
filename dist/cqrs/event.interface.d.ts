import { INotification, INotificationHandler } from "mediatr-ts";
export interface IEvent extends INotification {
}
export interface IEventHandler<TEvent extends IEvent = any> extends INotificationHandler<TEvent> {
}
