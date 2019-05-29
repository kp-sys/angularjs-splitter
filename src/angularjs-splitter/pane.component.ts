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

/**
 * @ngdoc component
 * @name kpSplitterPane
 * @module angularjs-splitter
 *
 * @requires ^kpSplitter
 *
 * @param {number=} minSize Minimum size of pane in pixels.
 * @param {number=} initSize Initial size of pane in pixels. If not specified, panes will have `width: 50%`.
 *
 *
 */
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
