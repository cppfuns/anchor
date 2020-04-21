// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';

import PromptStageCallback from './Callback';
import ExplorerLink from '../../../../shared/containers/Global/Blockchain/ExplorerLink';

class PromptStageSuccess extends Component<Props> {
  render() {
    const {
      blockchain,
      callbacking,
      hasBroadcast,
      hasForegroundCallback,
      prompt,
      settings,
      t,
    } = this.props;
    const {
      response,
      signed,
    } = prompt;
    const tx = response || signed;
    return (
      <Grid>
        {(hasForegroundCallback)
          ? (
            <Grid.Column width={hasBroadcast ? 7 : 16}>
              <PromptStageCallback
                blockchain={blockchain}
                callbacking={callbacking}
                prompt={prompt}
                settings={settings}
                singleColumn
              />
            </Grid.Column>
          )
          : false
        }
        {(hasBroadcast || !hasForegroundCallback)
          ? (
            <Grid.Column width={hasForegroundCallback ? 9 : 16}>
              <Segment color="green" secondary stacked>
                <Header
                  size="huge"
                >
                  <Icon color="green" name="check circle outline" />
                  <Header.Content>
                    {t('handler_containers_stage_success_header')}
                    <Header.Subheader>
                      {t(
                        'handler_containers_stage_success_subheader',
                        {
                          responseProcessed: response && response.processed ?
                            t('handler_containers_stage_success_subheader_blockchain') :
                            t('handler_containers_stage_success_subheader_callback_service'),
                        }
                      )}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
                <Segment basic>
                  <Table
                    definition
                    style={{
                      display: 'block',
                      overflowX: 'scroll',
                    }}
                  >
                    {(tx.transaction_id)
                      ? (
                        <Table.Row>
                          <Table.Cell collapsing>Transaction ID</Table.Cell>
                          <Table.Cell>
                            <ExplorerLink
                              content={tx.transaction_id}
                              linkData={tx.transaction_id}
                              linkBlockId={(tx.processed) ? tx.processed.block_num : false}
                              linkType="txid"
                            />
                          </Table.Cell>
                        </Table.Row>
                      )
                      : false
                    }
                    <Table.Row>
                      <Table.Cell collapsing>Submitted via</Table.Cell>
                      <Table.Cell>
                        {(response && response.processed)
                          ? prompt.endpoint
                          : prompt.callbackURL
                        }
                      </Table.Cell>
                    </Table.Row>
                  </Table>
                  {(tx.transaction_id)
                    ? (
                      <Message
                        color="grey"
                        content={(
                          <React.Fragment>
                            <p>
                              {t('handler_containers_stage_success_message_one')}
                            </p>
                          </React.Fragment>
                        )}
                        header="Monitor your Transaction"
                        icon="info circle"
                        size="large"
                      />
                    )
                    : (
                      <Message
                        color="grey"
                        content={(
                          <React.Fragment>
                            <p>
                              {t('handler_containers_stage_success_message_two')}
                            </p>
                          </React.Fragment>
                        )}
                        header="Transaction not broadcast to the blockchain"
                        icon="info circle"
                        size="large"
                      />
                    )
                  }
                </Segment>
              </Segment>
            </Grid.Column>
          )
          : false
        }
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    prompt: state.prompt,
  };
}

export default compose(
  withTranslation('global'),
  connect(mapStateToProps)
)(PromptStageSuccess);
