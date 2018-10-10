import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Flex } from 'reflexy';
import { Layout, Tabs, Button } from 'antd';
import { observer } from 'mobx-react';
import { typedInject } from '@vzh/mobx-stores';
import { Stores, SignInStore } from 'stores';
import { Connection, isDirectConnection, ConnectionType } from 'services';
import { ConnectionModel } from 'models';
import Page from 'components/Page';
import Splitter from 'components/Splitter';
import { DirectSignInForm, ServerSignInForm, ConnectionList } from 'components/SignIn';
import css from './SignInView.css';

interface InjectedProps {
  store: SignInStore;
}

export interface Props extends InjectedProps {}

type RoutedProps = Props & RouteComponentProps<any>;

@observer
class SignInView extends React.Component<RoutedProps> {
  componentWillMount() {
    const { store } = this.props;
    store.loadConnections();
  }

  private onSelectConnection = (connection: Connection) => {
    const { store } = this.props;
    store.setSelectedConnection(connection);
  };

  private onChangeTab = (key: string) => {
    const con =
      key === ConnectionType.direct ? ConnectionModel.DirectEmpty : ConnectionModel.ServerEmpty;
    const { store } = this.props;
    store.setSelectedConnection(con);
  };

  private signIn = () => {
    const { store, history } = this.props;
    store.signIn(history);
  };

  render() {
    const { store } = this.props;

    return (
      <Page column={false} uiStore={store.uiStore}>
        <Splitter>
          <Flex alignItems="stretch" vfill>
            <Layout>
              <Layout.Sider width="100%">
                <ConnectionList
                  selectedConnection={store.selectedConnection}
                  connections={store.connectionList}
                  onSelect={this.onSelectConnection}
                />
                <Flex center>
                  <Button
                    type="primary"
                    className={css['add-connection-btn']}
                    onClick={store.addNewConnection}
                  >
                    ADD NEW
                  </Button>
                </Flex>
              </Layout.Sider>
            </Layout>
          </Flex>

          <Flex shrink={false} center fill>
            <Tabs
              type="line"
              activeKey={
                isDirectConnection(store.selectedConnection)
                  ? ConnectionType.direct
                  : ConnectionType.server
              }
              onChange={this.onChangeTab}
              className={css.form}
            >
              <Tabs.TabPane tab="DIRECT CH" key={ConnectionType.direct}>
                {isDirectConnection(store.selectedConnection) && (
                  <DirectSignInForm
                    model={store.selectedConnection}
                    onDelete={store.deleteSelectedConnection}
                    onSignIn={this.signIn}
                    deleteEnabled={!!store.selectedConnection.connectionName}
                  />
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="TABIX.SERVER" key={ConnectionType.server}>
                {!isDirectConnection(store.selectedConnection) && (
                  <ServerSignInForm
                    model={store.selectedConnection}
                    onDelete={store.deleteSelectedConnection}
                    deleteEnabled={!!store.selectedConnection.connectionName}
                  />
                )}
              </Tabs.TabPane>
            </Tabs>
          </Flex>
        </Splitter>
      </Page>
    );
  }
}

export default withRouter(
  typedInject<InjectedProps, RoutedProps, Stores>(({ store }) => ({ store: store.signInStore }))(
    SignInView
  )
);