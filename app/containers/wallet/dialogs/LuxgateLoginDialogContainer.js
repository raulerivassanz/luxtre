// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ellipsis } from '../../../utils/strings';
import config from '../../../config';
import { defineMessages, FormattedHTMLMessage } from 'react-intl';
import LuxgateLoginDialog from '../../../components/exchange/LuxgateLoginDialog';
import NotificationMessage from '../../../components/widgets/NotificationMessage';
import environment from '../../../environment';
import successIcon from '../../../assets/images/success-small.inline.svg';
import type { InjectedDialogContainerProps } from '../../../types/injectedPropsType';

type Props = InjectedDialogContainerProps;

type State = {
  copiedAddress: string,
};

export const messages = defineMessages({
  message: {
    id: 'wallet.receive.page.addressCopyNotificationMessage',
    defaultMessage: '!!!You have successfully copied wallet address',
    description: 'Message for the wallet address copy success notification.',
  },
});

@inject('actions', 'stores') @observer
export default class LuxgateLoginDialogContainer extends Component<Props> {

  static defaultProps = { actions: null, stores: null, children: null, onClose: () => {} };

  state = {
    copiedAddress: '',
  };

  componentWillUnmount() {
    this.closeNotification();
  }

  closeNotification = () => {
    const { wallets } = this.props.stores.lux;
    const wallet = wallets.active;
    if (wallet) {
      const notificationId = `${wallet.id}-copyNotification`;
      this.props.actions.notifications.closeActiveNotification.trigger({ id: notificationId });
    }
  };

  render() {
    const { copiedAddress } = this.state;
    const { actions, error } = this.props;
    const { uiDialogs, uiNotifications } = this.props.stores;
    const { wallets } = this.props.stores[environment.API];
    const activeWallet = wallets.active;
    const loginInfo = this.props.stores.luxgate.loginInfo;
    const { newPhraseWords } = loginInfo;

    if (!activeWallet) throw new Error('Active wallet required for LuxgateLoginDialogContainer.');

    const notification = {
      id: `${activeWallet.id}-copyNotification`,
      duration: config.wallets.ADDRESS_COPY_NOTIFICATION_DURATION,
      message: (
        <FormattedHTMLMessage
          {...messages.message}
          values={{ walletAddress: ellipsis(copiedAddress, 8) }}
        />
      ),
    };

    return (
      <LuxgateLoginDialog
        onCopyAddress={(address) => {
          this.setState({ copiedAddress: address });
          actions.notifications.open.trigger({
            id: notification.id,
            duration: notification.duration,
          });
        }}
        error = {error}
        onCancel={() => {
          actions.dialogs.closeActiveDialog.trigger();
        }}
        onLoginWithPhrase={(phrase) => {
          actions.luxgate.loginInfo.loginWithPhrase.trigger(phrase);
        }}
        onCreateNewPhrase={() => {
          actions.luxgate.loginInfo.createNewPhrase.trigger();
        }}
        newPhrase={newPhraseWords.reduce((phrase, { word }) => `${phrase} ${word}`, '')}
      >
        <NotificationMessage
            icon={successIcon}
            show={uiNotifications.isOpen(notification.id)}
        >
          {notification.message}
        </NotificationMessage>
      </LuxgateLoginDialog>
    );
  }

}
