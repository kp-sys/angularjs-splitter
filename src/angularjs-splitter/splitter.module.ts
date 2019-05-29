import './splitter.less';

import register from '@kpsys/angularjs-register';
import PaneComponent from './pane.component';
import SplitterComponent from './splitter.component';

export default register('angularjs-splitter')
    .component(PaneComponent.componentName, PaneComponent)
    .component(SplitterComponent.componentName, SplitterComponent)
    .name();
