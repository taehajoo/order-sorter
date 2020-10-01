import * as io from 'socket.io-client';
import { environment } from '../environments/environment'

export class ApiService {
    socket:any;

    constructor() {   }
    setupSocketConnection() {
      this.socket = io(environment.SOCKET_ENDPOINT);
    }
  }