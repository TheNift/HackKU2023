import * as React from 'react';
import { List, Button } from 'react-native-paper';
import { auth, database } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';
import getUid from '../backend/getUid';
import { set, ref, onValue, get } from 'firebase/database';
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

  let renderTraits = (traits, setTraits) => {
    return Object.entries(traits)
      .map(([key, value]) => (
        <StringTrait
          key={key}
          name={value.name}
          value={value.value}
          onChangeValue={(text) => {
            let copy = {...traits};
            copy[key] = { name: value.name, value: text };
            setTraits(copy);
          }}
        />
      )
    );
  };

  let addTrait = (traits, setTraits) => {
    // TODO validate no duplicates
    return (selected) => {
      let copy = {...traits};
      copy[selected._id] = { name: selected.value, value: '' };
      setTraits(copy);
    }
  }

  const initDatabase = React.useEffect(() => {
    if (Object.keys(publicTraits).length === 0 && Object.keys(villageTraits).length === 0 && Object.keys(guildTraits).length === 0 && Object.keys(partyTraits).length === 0)
    {
      get(ref(database, 'level0/' + auth.currentUser?.uid)).then((snapshot) => {
        if (snapshot.exists())
          setPublicTraits(snapshot.val());
      });
      get(ref(database, 'level1/' + auth.currentUser?.uid)).then((snapshot) => {
        if (snapshot.exists())
          setVillageTraits(snapshot.val());
      });
      get(ref(database, 'level2/' + auth.currentUser?.uid)).then((snapshot) => {
        if (snapshot.exists())
          setGuildTraits(snapshot.val());
      });
      get(ref(database, 'level3/' + auth.currentUser?.uid)).then((snapshot) => {
        if (snapshot.exists())
          setPartyTraits(snapshot.val());
      });
    }
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
          {renderTraits(publicTraits, setPublicTraits)}
          <TextTraitPicker traitPicked={addTrait(publicTraits, setPublicTraits)}/>
        </List.Accordion>
        <List.Accordion title="Village"      
          expanded={villageExpanded}
          onPress={() => setVillageExpanded(!villageExpanded)}>
          {renderTraits(villageTraits, setVillageTraits)}
          <TextTraitPicker traitPicked={addTrait(villageTraits, setVillageTraits)}/>
        </List.Accordion>
        <List.Accordion title="Guild"
          expanded={guildExpanded}
          onPress={() => setGuildExpanded(!guildExpanded)}>
          {renderTraits(guildTraits, setGuildTraits)}
          <TextTraitPicker traitPicked={addTrait(guildTraits, setGuildTraits)}/>
        </List.Accordion>
        <List.Accordion title="Party"
          expanded={partyExpanded}
          onPress={() => setPartyExpanded(!partyExpanded)}>
          {renderTraits(partyTraits, setPartyTraits)}
          <TextTraitPicker traitPicked={addTrait(partyTraits, setPartyTraits)}/>
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

