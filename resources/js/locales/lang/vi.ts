import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/vi_VN';
import momentLocale from 'moment/dist/locale/vi';

const modules = import.meta.globEager('./vi/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'vi'),
    antdLocale,
  },
  momentLocale,
  momentLocaleName: 'vi',
};
