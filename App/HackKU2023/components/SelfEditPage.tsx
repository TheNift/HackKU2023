import * as React from 'react';
import { List } from 'react-native-paper';
import { database } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';
import getUid from '../backend/getUid';
import { set, ref } from 'firebase/database';
import VisibilityPickerComponent from './VisibilityPickerComponent';
import StringTrait from './StringTrait'

export default function SelfEditPage(props) {
  const [basicsExpanded, setBasicsExpanded] = React.useState(true);
  const [contactsExpanded, setContactsExpanded] = React.useState(true);
  const [skillsExpanded, setSkillsExpanded] = React.useState(true);

  const { user } = useAuthentication();

  return (
    <List.Section>
      <List.Accordion title="Stats"
        expanded={basicsExpanded}
        onPress={() => setBasicsExpanded(!basicsExpanded)}>
        <StringTrait 
          name="Name"
          value="Test Man"
        />
        <StringTrait 
          name="City"
          value="Kansas City"
        />
        <StringTrait 
          name="Avaiability"
          value="Weekends"
        />
      </List.Accordion>
      <List.Accordion title="Lairs"      
        expanded={contactsExpanded}
        onPress={() => setContactsExpanded(!contactsExpanded)}>
        <StringTrait 
          name="Phone"
          value="(555) 555 - 5555"
        />
        <StringTrait 
          name="Email"
          value="demo@example.com"
        />
        <StringTrait 
          name="Adress"
          value="1234 Demo Lane"
        />
        <StringTrait 
          name="Twitter"
          value="@demoman"
        />
        <StringTrait 
          name="Facebook"
          value="@demoman"
        />
        <StringTrait 
          name="Instagram"
          value="@demoman"
        />
        <StringTrait 
          name="Mastodon"
          value="@demoman@mastodon.social"
        />
      </List.Accordion>
      <List.Accordion title="Skills"
        expanded={skillsExpanded}
        onPress={() => setSkillsExpanded(!skillsExpanded)}>
      </List.Accordion>
    </List.Section>
  )
};
