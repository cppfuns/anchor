// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Form, Grid, Header, Modal, Segment } from 'semantic-ui-react';
import GlobalDangerLink from '../../../shared/containers/Global/DangerLink';

const { clipboard } = require('electron');

class PromptShare extends Component<Props> {
  onCopyLink = () => clipboard.writeText(this.props.uri)
  makeLink = () => {
    const { uri } = this.props;
    const uriParts = uri.split(':');
    return `https://eosio.to/${uriParts[1].replace('//', '')}`;
  }
  render() {
    const {
      onClose,
      open,
      t,
      uri
    } = this.props;
    if (!uri) return false;
    const link = this.makeLink();
    return (
      <Modal
        centered={false}
        closeIcon
        onClose={onClose}
        open={open}
        size="wide"
        style={{ marginTop: '110px' }}
        scrolling
      >
        <Modal.Header>{t('handler_share_header')}</Modal.Header>
        <Modal.Content>
          <Header>
            <Header.Subheader>
              {t('handler_share_subheader')}
            </Header.Subheader>
          </Header>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header attached="top" size="small">
                  {t('handler_share_grid_header_one')}
                </Header>
                <Segment attached="bottom">
                  <p>
                    {t('handler_share_grid_paragraph_one')}
                  </p>
                  <Form>
                    <Form.TextArea
                      style={{
                        wordBreak: 'break-all'
                      }}
                      value={uri}
                    />
                  </Form>
                  <Button
                    color="blue"
                    content="Copy to Clipboard"
                    fluid
                    icon="clipboard"
                    onClick={this.onCopyLink}
                    style={{ marginTop: '1em' }}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Header attached="top" size="small">{t('handler_share_grid_header_two')}</Header>
                <Segment attached="bottom">
                  <p>{t('handler_share_grid_paragraph_two')}</p>
                  <GlobalDangerLink
                    content={(
                      <Button
                        color="blue"
                        content={t('handler_share_grid_button')}
                        fluid
                        icon="external"
                      />
                    )}
                    link={link}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default withTranslation('handler')(PromptShare);
