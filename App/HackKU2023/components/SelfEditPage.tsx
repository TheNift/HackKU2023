import * as React from 'react';
import { List, Button } from 'react-native-paper';
import { auth, database } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';
import getUid from '../backend/getUid';
import { set, ref, onValue } from 'firebase/database';
import VisibilityPickerComponent from './VisibilityPickerComponent';
import StringTrait from './StringTrait'
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import TextTraitPicker from './TextTraitPicker';

export default function SelfEditPage(props) {
  const [publicExpanded, setPublicExpanded] = React.useState(true);
  const [villageExpanded, setVillageExpanded] = React.useState(true);
  const [guildExpanded, setGuildExpanded] = React.useState(true);
  const [partyExpanded, setPartyExpanded] = React.useState(true);

  const [publicTraits, setPublicTraits] = React.useState({});
  const [villageTraits, setVillageTraits] = React.useState({});
  const [guildTraits, setGuildTraits] = React.useState({});
  const [partyTraits, setPartyTraits] = React.useState({});

  const { user } = useAuthentication();

  let renderTraits = (traits) => {
    return Object.entries(traits)
      .map(([key, value]) => (
        <StringTrait
          key={key}
          name={value.name}
          value={value.value}
          onChangeValue={(text) => {
            let copy = {...publicTraits};
            copy[key] = { name: value.name, value: text };
            setPublicTraits(copy);
          }}
        />
      )
    );
  };

  const initDatabase = React.useEffect(() => {
    onValue(ref(database, 'level0/' + auth.currentUser?.uid), (snapshot) => {
      setPublicTraits(snapshot.val());
    });
    onValue(ref(database, 'level1/' + auth.currentUser?.uid), (snapshot) => {
      setVillageTraits(snapshot.val());
    });
    onValue(ref(database, 'level2/' + auth.currentUser?.uid), (snapshot) => {
      setGuildTraits(snapshot.val());
    });
    onValue(ref(database, 'level3/' + auth.currentUser?.uid), (snapshot) => {
      setPartyTraits(snapshot.val());
    });
  });

  let updateDatabase = () => {
    set(ref(database, "level0/" + auth.currentUser?.uid), publicTraits);
    set(ref(database, "level1/" + auth.currentUser?.uid), villageTraits);
    set(ref(database, "level2/" + auth.currentUser?.uid), guildTraits);
    set(ref(database, "level3/" + auth.currentUser?.uid), partyTraits);
  };

  return (
    <ScrollView>
      <Button onPress={updateDatabase}>Save</Button>
      <List.Section>
        <List.Accordion title="Public"
          expanded={publicExpanded}
          onPress={() => setPublicExpanded(!publicExpanded)}>
          {renderTraits(publicTraits)}
          <TextTraitPicker></TextTraitPicker>
          <Button mode='elevated' style={styles.spacing}>Add Trait</Button>
        </List.Accordion>
        <List.Accordion title="Village"      
          expanded={villageExpanded}
          onPress={() => setVillageExpanded(!villageExpanded)}>
          {renderTraits(villageTraits)}
          <Button mode='elevated' style={styles.spacing}>Add Trait</Button>
        </List.Accordion>
        <List.Accordion title="Guild"
          expanded={guildExpanded}
          onPress={() => setGuildExpanded(!guildExpanded)}>
          {renderTraits(guildTraits)}
          <Button mode='elevated' style={styles.spacing}>Add Trait</Button>
        </List.Accordion>
        <List.Accordion title="Party"
          expanded={partyExpanded}
          onPress={() => setPartyExpanded(!partyExpanded)}>
          {renderTraits(partyTraits)}
          <Button mode='elevated' style={styles.spacing}>Add Trait</Button>
        </List.Accordion>
      </List.Section>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 12
  }
});

