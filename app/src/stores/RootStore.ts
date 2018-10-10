import { observable } from 'mobx';
import { UIStore, JSONModel, DisposableStore } from '@vzh/mobx-stores';
import AppStore from './AppStore';
import SignInStore from './SignInStore';
import DashboardStore from './DashboardStore';
import DashboardUIStore from './DashboardUIStore';

export default class RootStore extends DisposableStore {
  @observable
  readonly appStore: AppStore;

  @observable
  readonly signInStore: SignInStore;

  @observable
  readonly dashboardStore: DashboardStore;

  constructor(initialState: Partial<JSONModel<RootStore>> = {}) {
    super();
    console.log('initialState', initialState);

    this.appStore = new AppStore(this, new UIStore(this), initialState.appStore);

    this.signInStore = new SignInStore(this, new UIStore(this), initialState.signInStore);

    // this.dashboardStore = new DashboardStore(this, new UIStore(this), initialState.dashboardStore);
    this.dashboardStore = new DashboardStore(
      this,
      new DashboardUIStore(this),
      initialState.dashboardStore
    );
  }
}