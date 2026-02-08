import { render } from '@testing-library/react-native';

import { ThemeProvider } from '../../theme/context';
import { Text } from './Text';

const testText = 'Test string';

describe('Text', () => {
  it('should render the component', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Text text={testText} />
      </ThemeProvider>,
    );
    expect(getByText(testText)).toBeDefined();
  });
});
