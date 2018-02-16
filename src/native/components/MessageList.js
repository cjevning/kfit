import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';

import MessageRow from './MessageRow';

// import translations from '../../../../i18n';

// import styles from './Styles';

const ITEM_HEIGHT = 50;

class MessageListComponent extends Component {
  constructor() {
    super();

    this.renderItem = ({ item }) => <MessageRow message={item} />;

    this.emptyList = () => (
      <Text
        // style={styles.placeholder}
      >
        {/*translations.t(*/'placeholder'/*)*/}
      </Text>
    );

    this.itemLayout = (data, index) => (
      { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
    );
  }

  componentDidUpdate() {
    if (this.props.messages.length) {
      this.flatList.scrollToIndex({ animated: true, index: 0 });
    }
  }

  render() {
    const messages = this.props.messages;
    // const contentContainerStyle = data.length ? null : styles.flatlistContainerStyle;
    return (
      <FlatList
        ref={(c) => { this.flatList = c; }}
        // style={styles.container}
        // contentContainerStyle={contentContainerStyle}
        data={messages}
        keyExtractor={item => item.time}
        renderItem={this.renderItem}
        getItemLayout={this.itemLayout}
        ListEmptyComponent={this.emptyList}
        inverted
      />
    );
  }
}

MessageListComponent.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageListComponent;
