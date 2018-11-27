import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import jasmineEnzyme from 'jasmine-enzyme';
import nj from 'nornj';
import '../../src/components/grid';

describe('Grid spec', function () {
  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('default', () => {
    const defaultWrapper1 = shallow(nj`<fj-Row />`());

    it('should be div tag by default', () => {
      expect(defaultWrapper1).toHaveTagName('div');
    });
  });
});