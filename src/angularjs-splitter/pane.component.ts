import SplitterComponent, {SplitterComponentController} from './splitter.component';
import {IAugmentedJQuery, IOnChanges, IPostLink, ITranscludeFunction} from 'angular';

export class PaneComponentController implements PaneBindings, IPostLink, IOnChanges {
    public index: number;
    public splitterController: SplitterComponentController;
    public minSize: number;
    public initSize: number;
    public show: boolean = true;

    /*@ngInject*/
    constructor(public $element: IAugmentedJQuery, $transclude: ITranscludeFunction) {
        $transclude((clone) => {
            $element.append(clone);
        });
    }

    public $postLink(): void {
        this.index = this.splitterController.addPane(this);

        this.$element.addClass(`split-pane${this.index}`);

        this.show = this.show !== false;
    }

    public $onChanges(onChangesObj: angular.IOnChangesObject): void {
        if (onChangesObj.show && onChangesObj.show.currentValue !== undefined) {
            if (!onChangesObj.show.isFirstChange()) {
                this.splitterController.togglePane(onChangesObj.show.currentValue);
            }

            this.$element.toggleClass('ng-hide', !onChangesObj.show.currentValue);
        }
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
 * @param {boolean=} show If `false`, pane will hide. Default is `true`.
 *
 *
 */
export default class PaneComponent {
    public static componentName = 'kpSplitterPane';

    public transclude = true;

    public bindings = {
        minSize: '<',
        initSize: '<',
        show: '<'
    };

    public require = {
        splitterController: `^${SplitterComponent.componentName}`
    };

    public controller = PaneComponentController;
}

export interface PaneBindings {
    minSize?: number;
    initSize?: number;
    show?: boolean;
}
