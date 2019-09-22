import * as express from 'express'
import * as socketio from "socket.io"
import * as path from "path"
import * as TransportLayer from "../MiddleMan/TransportLayer"
import { SocketIOSocket } from "./SocketIOSocket";

export class SocketIOServer {
  private SocketIOInstance: socketio.Server;
  private TransportLayer: TransportLayer.TransportLayer;
  private Sockets: Set<SocketIOSocket>;

  constructor(io: socketio.Server){
      this.TransportLayer = TransportLayer.Transporter
      this.SocketIOInstance = io;
      this.Sockets = new Set<SocketIOSocket>();
      this.AddEventListeners();
      //register Server with transportlayer
  }

  private AddEventListeners(){
      this.SocketIOInstance.on("connect", (socket: socketio.Socket) => this.addSocket(socket));
  }

  private addSocket(socket: socketio.Socket){
    const toAddSocket = new SocketIOSocket(socket);
    toAddSocket.onDisconnect = () => this.Sockets.delete(toAddSocket);
    this.Sockets.add(toAddSocket);
  }
}

