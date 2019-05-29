import SplitterComponent, {SplitterComponentController} from './splitter.component';
import {IAugmentedJQuery, IPostLink, ITranscludeFunction} from 'angular';

export class PaneComponentController implements IPostLink {
    public element: IAugmentedJQuery;
    public index: number;
    public splitterController: SplitterComponentController;
    public minSize: number;
    public initSize: number;

    /*@ngInject*/
    constructor(private $element: IAugmentedJQuery, $transclude: ITranscludeFunction) {
        $transclude((clone) => {
            $element.append(clone);
        });
    }

    public $postLink(): void {
        this.element = this.$element;
        this.index = this.splitterController.addPane(this);

        this.$element.addClass(`split-pane${this.index}`);
    }

}

export default class PaneComponent {
    public static componentName = 'kpSplitterPane';

    public transclude = true;

    public bindings = {
        minSize: '=',
        initSize: '='
    };

    public require = {
        splitterController: `^${SplitterComponent.componentName}`
    };

    public controller = PaneComponentController;
}
