import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption
} from 'react-native-popup-menu';

let unique = 0;

export default class Example extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = { log: [] };
  }

  selectNumber(value) {
    this.setState({
      log: [...this.state.log, {
        value: `selecting number: ${value}`,
        id: ++unique
      }]
    });
  }

  selectOptionType(value) {
    const v = typeof value === 'object' ? JSON.stringify(value) : value;
    this.setState({
      log: [...this.state.log, {
        value: `selecting type: ${v}`,
        id: ++unique
      }]
    });
    return value !== 'Do not close';
  }

  toggleHighlight(id) {
    const log = this.state.log.map(l => {
      if (l.id === id) {
        return Object.assign({}, l, {highlighted: !l.highlighted});
      }
      return l;
    })
    this.setState({ log });
  }

  deleteLogItem(id) {
    const log = this.state.log.filter(l => l.id !== id);
    this.setState({ log });
  }

  render() {
    return (
      <MenuContext style={{flex: 1}}>
        <View style={styles.container}>

          <View style={styles.topbar}>
            <Menu name="numbers" onSelect={value => this.selectNumber(value)}>
              <MenuTrigger style={styles.trigger}>
                <Text style={styles.triggerText}>Select number...</Text>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value={1} text='Option one' />
                <MenuOption value={2} text='Option two' />
                <MenuOption value={3} text='Option three' />
                <MenuOption value={4} text='Option four' />
                <MenuOption value={5} text='Option five' />
                <MenuOption value={6} text='Option six' />
                <MenuOption value={7} text='Option seven' />
              </MenuOptions>
            </Menu>
            <View style={{flex:1}}></View>
            <Menu name="types" onSelect={value => this.selectOptionType(value)}>
              <MenuTrigger style={styles.trigger}>
                <Text style={styles.triggerText}>Select type...</Text>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value="Normal" text='Normal' />
                <MenuOption value="Disabled" disabled={true}>
                  <Text style={styles.disabled}>Disabled</Text>
                </MenuOption>
                <MenuOption value="Do not close" text='Do not close' />
                <View style={styles.divider}/>
                <MenuOption value={{ text: 'Hello world!' }} text='Object as value' />
              </MenuOptions>
            </Menu>
          </View>

          <ScrollView style={styles.logView}>
            {this.state.log.map((l, i) => {
              const wrapperStyle = {backgroundColor: i % 2 ? 'white' : 'whitesmoke'};
              const textStyle = {color: l.highlighted ? 'red' : 'gray'};
              return (
                <View style={[styles.logItem, wrapperStyle]} key={l.id}>
                  <Text style={textStyle}>{l.value}</Text>
                  <View style={{flex:1}}></View>
                  <Menu onSelect={action => action()}>
                    <MenuTrigger text='edit' />
                    <MenuOptions>
                      <MenuOption value={() => this.toggleHighlight(l.id)} text={l.highlighted ? 'Unhighlight' : 'Highlight'} />
                      <MenuOption value={() => this.deleteLogItem(l.id)} text='Delete' />
                    </MenuOptions>
                  </Menu>
                </View>
              );
            })}
          </ScrollView>

        </View>
      </MenuContext>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'dimgray',
    paddingTop : 15,
  },
  trigger: {
    padding: 5,
    margin: 5,
  },
  triggerText: {
    color: 'white',
  },
  disabled: {
    color: '#ccc',
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  logView: {
    flex: 1,
    flexDirection: 'column',
  },
  logItem: {
    flexDirection: 'row',
    padding: 8,
  },
});
