import { Button } from '@/components/Button/Button';
import { Text } from '@/components/Text/Text';
import { View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text text="Edit app/index.tsx to edit this screen." />
      <Button text="test" />
    </View>
  );
}
