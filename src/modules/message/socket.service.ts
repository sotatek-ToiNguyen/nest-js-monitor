import { Server as SocketIOServer, Socket } from 'socket.io';
import { Service, Inject } from 'typedi';
import { SOCKET_EVENT } from '../../common/config';

export class MessageDto {
  message: string;
  room: number;
  roomUid: string;
}

@Service()
export class SocketService {
  private io: SocketIOServer;

  constructor(@Inject('socketSever') io: SocketIOServer) {
    this.io = io;
    this.configureSocket();
  }
  private configureSocket() {
    this.io.on(
      SOCKET_EVENT.CONNECTION,
      async (
        socket: Socket & {
          user: undefined | { id: number; account: string; name: string };
        },
      ) => {
        console.log('Socket.io client connected');

        socket.join('12');
        console.log('Socket.io join  room 12');
        socket.on(
          SOCKET_EVENT.RECEIVED,
          ({ roomUid, userId }: { roomUid: string; userId: number }) => {
            console.log(1111);
            this.io.to(roomUid).emit(SOCKET_EVENT.SEEN_MESSAGE, {
              userId,
              timeSeen: new Date(),
            });
          },
        );

        socket.on(SOCKET_EVENT.MESSAGE, ({ message }: { message: string }) => {
          console.log(1111);
          this.io.to('12').emit(SOCKET_EVENT.MESSAGE, { message });
        });

        socket.on(
          SOCKET_EVENT.JOIN_ROOM,
          async ({ roomId }: { roomId: number }) => {
            console.log(`Socket join room: ${roomId}`);
            socket.join('${roomId}');
          },
        );

        socket.on(SOCKET_EVENT.DISCONNECT, () => {
          console.log('Socket.io client disconnected');
        });
      },
    );
  }

  public emitMessage(data: MessageDto, event: SOCKET_EVENT) {
    console.log(`Socket run : ${event} with ${data.roomUid}`);
    let dataSocket = {};
    dataSocket = { message: data.message };
    if (event == SOCKET_EVENT.MESSAGE_PRIVATE) {
      dataSocket = { ...dataSocket, room: data.room };
    }
    this.io.to(data.roomUid).emit(event, { ...dataSocket });
  }
}
