// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import styles from './DisplaySettings.scss';
import themeLightBluePreview from '../../../assets/images/themes/light-blue.png';
import themeLuxcoinPreview from '../../../assets/images/themes/luxcoin.png';
import themeDarkBluePreview from '../../../assets/images/themes/dark-blue.png';
import { THEMES } from '../../../themes/index';

const messages = defineMessages({
  themeLabel: {
    id: 'settings.display.themeLabel',
    defaultMessage: '!!!Theme',
    description: 'Label for the "Theme" selection on the display settings page.',
  },
  themeLightBlue: {
    id: 'settings.display.themeNames.lightBlue',
    defaultMessage: '!!!Light blue',
    description: 'Name of the "Light blue" theme on the display settings page.',
  },
  themeLuxcoin: {
    id: 'settings.display.themeNames.luxcoin',
    defaultMessage: '!!!Luxcoin',
    description: 'Name of the "Luxcoin" theme on the display settings page.',
  },
  themeDarkBlue: {
    id: 'settings.display.themeNames.darkBlue',
    defaultMessage: '!!!Dark blue',
    description: 'Name of the "Dark blue" theme on the display settings page.',
  },
});

type Props = {
  theme: string,
  selectTheme: Function,
};

@observer
export default class DisplaySettings extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { theme, selectTheme } = this.props;
    const { intl } = this.context;

    const themeLightBlueClasses = classnames([
      theme === THEMES.LIGHT_BLUE ? styles.active : styles.inactive,
      styles.themeImageWrapper,
    ]);

    const themeLuxcoinClasses = classnames([
      theme === THEMES.LUXCOIN ? styles.active : styles.inactive,
      styles.themeImageWrapper,
    ]);

    const themeDarkBlueClasses = classnames([
      theme === THEMES.DARK_BLUE ? styles.active : styles.inactive,
      styles.themeImageWrapper,
    ]);

    return (
      <div className={styles.component}>

        <div className={styles.label}>
          {intl.formatMessage(messages.themeLabel)}
        </div>

        <div className={styles.themesWrapper}>

          <button
            className={themeLightBlueClasses}
            onClick={selectTheme.bind(this, { theme: THEMES.LIGHT_BLUE })}
          >
            <img src={themeLightBluePreview} role="presentation" />
            <span>{intl.formatMessage(messages.themeLightBlue)}</span>
          </button>

          <button
            className={themeLuxcoinClasses}
            onClick={selectTheme.bind(this, { theme: THEMES.LUXCOIN })}
          >
            <img src={themeLuxcoinPreview} role="presentation" />
            <span>{intl.formatMessage(messages.themeLuxcoin)}</span>
          </button>

          <button
            className={themeDarkBlueClasses}
            onClick={selectTheme.bind(this, { theme: THEMES.DARK_BLUE })}
          >
            <img src={themeDarkBluePreview} role="presentation" />
            <span>{intl.formatMessage(messages.themeDarkBlue)}</span>
          </button>

        </div>

      </div>
    );
  }

}
