// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TopBar from '../components/layout/TopBar';
import NodeSyncStatusIcon from '../components/widgets/NodeSyncStatusIcon';
import WalletLockStatusIcon from '../components/widgets/WalletLockStatusIcon';
import WalletStakingStatusIcon from '../components/widgets/WalletStakingStatusIcon';
import WalletTestEnvironmentLabel from '../components/widgets/WalletTestEnvironmentLabel';
import type { InjectedProps } from '../types/injectedPropsType';
import environment from '../environment';

type Props = InjectedProps;

@inject('stores', 'actions') @observer
export default class TopBarContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  render() {
    const { actions, stores } = this.props;
    const { sidebar, app, networkStatus } = stores;
    const isMainnet = environment.isMainnet();
    const isLuxApi = environment.isLuxApi();
    const activeWallet = stores[environment.API].wallets.active;
    const {isShowingSubMenus} = sidebar;
    const testnetLabel = (
      isLuxApi && !isMainnet ? <WalletTestEnvironmentLabel /> : null
    );

    return (
      <TopBar
        onToggleSidebar={actions.sidebar.toggleSubMenus.trigger}
        activeWallet={activeWallet}
        currentRoute={app.currentRoute}
        showSubMenus={isShowingSubMenus}
      >
        {isShowingSubMenus && activeWallet && activeWallet.hasPassword == true ? 
          <WalletLockStatusIcon
            isLocked={activeWallet.isLocked}
          />
          : null
        }
        {isShowingSubMenus ? 
          <WalletStakingStatusIcon
            isStaking={activeWallet.isStaking}
          />
          : null
        }
        {isShowingSubMenus ?
          <NodeSyncStatusIcon
            networkStatus={networkStatus}
            isMainnet={isMainnet}
          />
          :null
        }
      </TopBar>
    );
  }

}
