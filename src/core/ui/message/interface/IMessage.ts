import { MessageType } from '../../../../shared/enum/MessageType';

export interface IMessage {
  type: MessageType;
  text: string;
}