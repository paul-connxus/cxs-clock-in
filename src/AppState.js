import { autorun, observable } from 'mobx';
import firebase from 'firebase';

class AppState {
  @observable timer = 0;
  @observable home = true;
  @observable registerEmployee = false;
  @observable viewTimes = false;
}

  var appState = window.appState = new AppState

export default AppState;
