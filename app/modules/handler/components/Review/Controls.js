// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Divider, Form, Header, Icon, Segment } from 'semantic-ui-react';
import GlobalAccountDropdownSelect from '../../../../shared/containers/Global/Account/Dropdown/Select';
import { Label } from '../Fragment/Transaction/Action/Fuel';

class PromptReviewControls extends Component<Props> {
  render() {
    const {
      callback,
      canBroadcast,
      chainId,
      couldSignWithDevice,
      enableWhitelist,
      onCheck,
      onSelect,
      onWhitelist,
      settings,
      shouldBroadcast,
      t,
      wallet,
    } = this.props;
    const {
      account,
      authorization,
      mode,
      pubkey,
    } = wallet;
    let callbackField;
    if (callback && callback.url && callback.url !== '') {
      const url = new URL(callback.url);
      callbackField = (
        <Form.Field>
          <label>
            <Icon name="linkify" />
            Callback
          </label>
          <Segment basic size="large" style={{ marginTop: 0 }}>
            <p>{url.origin}</p>
          </Segment>
        </Form.Field>
      );
    }
    return (
      <Form>
        <Header>
          {t('handler_review_controls_header')}
          <Header.Subheader>
            {t('handler_review_controls_subheader')}
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>
            <Icon
              name="user"
              style={{
                marginRight: '0.5em',
              }}
            />
            {t('handler_review_form_label_one')}
          </label>
          <GlobalAccountDropdownSelect
            account={account}
            authorization={authorization}
            mode={mode}
            pubkey={pubkey}
            chainId={chainId}
            onSelect={onSelect}
          />
        </Form.Field>
        {(settings && ['ledger', 'hot'].includes(wallet.mode))
          ? (
            <Form.Field style={{ display: 'none' }}>
              <label>
                <Icon
                  name="cogs"
                  style={{
                    marginRight: '0.5em',
                  }}
                />
                {t('handler_review_form_label_two')}
              </label>
              <Segment basic style={{ marginTop: 0 }}>
                {(shouldBroadcast)
                  ? (
                    <Form.Checkbox
                      checked={canBroadcast && settings.esr_signbroadcast}
                      disabled={!canBroadcast}
                      label={t('handler_review_form_checkbox_one')}
                      name="esr_signbroadcast"
                      onChange={onCheck}
                      toggle
                    />
                  )
                  : false
                }
                {(
                  // Using a device prevents whitelists from working
                  !couldSignWithDevice
                  // Disable this option for now, not production ready.
                  && true === false
                )
                  ? (
                    <Form.Checkbox
                      checked={enableWhitelist}
                      label={t('handler_review_form_checkbox_two')}
                      name="esr_whitelist"
                      onChange={onWhitelist}
                      toggle
                    />
                  )
                  : false
                }
                <Form.Checkbox
                  checked
                  label={t('handler_review_form_checkbox_three')}
                  style={{ display: 'none' }}
                />
              </Segment>
            </Form.Field>
          )
          : false
        }
        {callbackField}
      </Form>
    );
  }
}

export default withTranslation('handler')(PromptReviewControls);
