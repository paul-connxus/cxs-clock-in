import { autorun , observable } from 'mobx';
import firebase from 'firebase';

class AppState {
  @observable home = true;
  @observable registerEmployee = false;
  @observable viewTimes = false;
  @observable users = [];
  @observable loading = true;
}


export default AppState;
autorun(() => {
  var appState = new AppState
  console.log(AppState.users);
});
