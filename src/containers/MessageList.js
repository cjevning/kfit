import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadMessages } from '../reducers/chat';

class MessagesListContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    messages: PropTypes.object,
    error: PropTypes.string,
    loadMessages: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadMessages();
  }

  render = () => {
    const { Layout, messages } = this.props;

    return <Layout messages={messages} />;
  }
}

const mapStateToProps = state => ({
  messages: state.chat.messages,
  error: state.chat.loadMessagesError,
});

const mapDispatchToProps = {
  loadMessages,
};


export default connect(mapStateToProps, mapDispatchToProps)(MessagesListContainer);
