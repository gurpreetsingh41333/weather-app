import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(`${__dirname}./../../config/.env.test`) });

Enzyme.configure({
  adapter: new Adapter(),
});
