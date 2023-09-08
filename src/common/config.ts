export enum SOCKET_EVENT {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  MESSAGE_PRIVATE = 'message_private',
  JOIN_ROOM = 'join_room',
  REACT = 'react',
  DELETE_REACT = 'delete_react',
  DELETE_MESSAGE = 'delete_message',
  SEEN_MESSAGE = 'seen_message',
  RECEIVED = 'received',
}

export const saltOrRounds = 10;
