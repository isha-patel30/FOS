import {BackArrow} from './image/svgIcons/IcBackArrow';
import {CheckBoxActive} from './image/svgIcons/IcCheckboxActive';
import {CheckBoxInactive} from './image/svgIcons/IcCheckboxInactive';
import {Filter} from './image/svgIcons/IcFilter';
import {Minus} from './image/svgIcons/IcMinus';
import {Plus} from './image/svgIcons/IcPlus';
import {Refresh} from './image/svgIcons/IcRefresh';

export const IcBackArrow = props => <BackArrow {...props} />;
export const IcFilter = props => <Filter {...props} />;
export const IcPlus = props => <Plus {...props} />;
export const IcCheckBoxActive = props => <CheckBoxActive {...props} />;
export const IcCheckBoxInactive = props => <CheckBoxInactive {...props} />;
export const IcMinus = props => <Minus {...props} />;
export const IcRefresh = props => <Refresh {...props} />;
