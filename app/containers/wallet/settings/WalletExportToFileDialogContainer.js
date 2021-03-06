// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { remote } from 'electron';
import WalletExportDialog from '../../../components/wallet/settings/export-to-file/WalletExportToFileDialog';
import type { OnSubmitParams } from '../../../components/wallet/settings/export-to-file/WalletExportToFileDialog';
import type { InjectedDialogContainerProps } from '../../../types/injectedPropsType';

type Props = InjectedDialogContainerProps;

@inject('stores', 'actions') @observer
export default class WalletExportToFileDialogContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null, children: null, onClose: () => {} };

  onSubmit = (params: OnSubmitParams) => {
    const filePath = remote.dialog.showSaveDialog({
      filters: [
        { name: 'dat', extensions: ['dat'] },
      ]
    });
    const { stores, actions } = this.props;
    const activeWallet = stores.lux.wallets.active;
    if (!filePath || !activeWallet) return;
    actions.lux.walletSettings.exportToFile.trigger({
      walletId: activeWallet.id,
      filePath,
      ...params
    });
  };

  onCancel = () => {
    this.props.actions.dialogs.closeActiveDialog.trigger();
    this.props.stores.lux.walletSettings.exportWalletToFileRequest.reset();
  };

  render() {
    const { wallets, walletSettings } = this.props.stores.lux;
    const activeWallet = wallets.active;
    const { exportWalletToFileRequest } = walletSettings;

    // We need an active wallet
    if (!activeWallet) return null;

    return (
      <WalletExportDialog
        walletName={activeWallet.name}
        // TODO: re-enable when spending-password support is added to the API endpoint
        // hasSpendingPassword={activeWallet.hasPassword}
        hasSpendingPassword={false}
        isSubmitting={exportWalletToFileRequest.isExecuting}
        onSubmit={this.onSubmit}
        onClose={this.onCancel}
        error={exportWalletToFileRequest.error}
      />
    );
  }

}
