// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import CreateMasternodeDialog from '../../../components/wallet/masternodes/CreateMasternodeDialog';
import type { InjectedProps } from '../../../types/injectedPropsType';
import environment from '../../../environment';

@inject('actions', 'stores') @observer
export default class CreateMasternodeDialogContainer extends Component<InjectedProps> {

  static defaultProps = { actions: null, stores: null };

  render() {
    const { actions } = this.props;
    const { uiDialogs } = this.props.stores;
    const { masternodes } = this.props.stores[environment.API];
    const dialogData = uiDialogs.dataForActiveDialog;
    const { createMasternodeRequest } = masternodes;

    return (
      <CreateMasternodeDialog
        aliasValue={dialogData.aliasValue}
        addressValue={dialogData.addressValue}
        onCreate={(values: { alias: string, address: string }) => {
          actions[environment.API].masternodes.createMasternode.trigger(values);
        }}
        onCancel={() => {
          actions.dialogs.closeActiveDialog.trigger();
          createMasternodeRequest.reset();
        }}
        isSubmitting={createMasternodeRequest.isExecuting}
        error={createMasternodeRequest.error}
      />
    );
  }

}
