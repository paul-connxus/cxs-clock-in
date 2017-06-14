import { autorun , observable } from 'mobx';
import firebase from 'firebase';

class AppState {
  @observable home = true;
  @observable registerEmployee = false;
  @observable viewTimes = false;
  @observable users = [];
  @observable userTimes = {};
  @observable loading = true;
}

export default AppState;
