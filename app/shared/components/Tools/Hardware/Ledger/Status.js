// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Checkbox, Container, Header, Icon } from 'semantic-ui-react';

class ToolsHardwareLedgerStatus extends Component<Props> {
  start = () => {
    this.props.actions.ledgerStartListen();
  }
  stop = () => {
    this.props.actions.ledgerStopListen();
  }
  restart = () => {
    this.props.actions.ledgerStopListen();
    setTimeout(() => {
      this.props.actions.ledgerStartListen();
    }, 500);
  }
  toggleDetection = (e, { checked }) => {
    this.props.actions.setSetting('hardwareLedgerSupport', checked);
  }
  render() {
    const {
      hideOptions,
      ledger,
      settings,
      status,
      t,
    } = this.props;

    return (
      <React.Fragment>
        {(ledger.listening)
          ? (
            <Header icon size="large" textAlign="center">
              {(status === 'transport_error')
                ? (
                  <Icon
                    color="orange"
                    name="warning sign"
                  />
                )
                : false
              }
              {(status !== 'transport_error' && status !== 'connected')
                ? (
                  <Icon
                    loading
                    name="circle notched"
                  />
                )
                : false
              }
              {(status === 'connected')
                ? (
                  (
                    <Icon
                      color="green"
                      name="usb"
                    />
                  )
                )
                : false
              }
              {t(`ledger_status_${status}_header`)}
              <Header.Subheader
                content={t(`ledger_status_${status}_subheader`)}
              />
            </Header>
          )
          : (
            <Header icon size="large" textAlign="center">
              <Icon
                name="usb"
              />
              {t('ledger_status_disabled_header')}
              <Header.Subheader
                content={t('ledger_status_disabled_subheader')}
              />
            </Header>
          )
        }
        <Container fluid textAlign="center">
          {(status === 'transport_error')
            ? (
              <Button
                basic
                content={t('ledger_service_restart')}
                color="orange"
                icon="redo"
                onClick={this.restart}
              />
            )
            : false
          }
          {(status !== 'transport_error' && ledger.listening)
            ? (
              <Button
                basic
                content={t('ledger_service_stop')}
                color="orange"
                icon="stop"
                onClick={this.stop}
              />
            )
            : false
          }
          {(status !== 'transport_error' && !ledger.listening)
            ? (
              <Button
                color="green"
                content={t('ledger_service_start')}
                icon="play"
                onClick={this.start}
              />
            )
            : false
          }
        </Container>
        <Container fluid style={{ marginTop: '1em' }} textAlign="center">
          {(status !== 'transport_error' && !hideOptions)
            ? (
              <Checkbox
                defaultChecked={settings.hardwareLedgerSupport}
                label={t('ledger_service_automatic')}
                onChange={this.toggleDetection}
              />
            )
            : false
          }
        </Container>
      </React.Fragment>
    );
  }
}

export default translate('ledger')(ToolsHardwareLedgerStatus);
