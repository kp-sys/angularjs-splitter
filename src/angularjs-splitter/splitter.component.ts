import {
    IAugmentedJQuery,
    ICompileService,
    IDocumentService,
    IOnDestroy,
    IPostLink,
    IScope,
    ITranscludeFunction
} from 'angular';
import {PaneComponentController} from './pane.component';
import bind from 'bind-decorator';
import angular = require('angular');

type TTopOrLeft = 'top' | 'left';
type TWidthOrHeight = 'width' | 'height';

const LOCAL_STORAGE_PREFIX = `kpSplitter-`;

export class SplitterComponentController implements SplitterBindings, IPostLink, IOnDestroy {
    public orientation: TSplitterOrientation;
    public preserveSizeId: string;
    public enabled: boolean;
    public showSplitHandler: boolean;
    private panes: PaneComponentController[];
    private handler: IAugmentedJQuery;
    private vertical: boolean;
    private dragged: boolean;
    private topOrLeft: TTopOrLeft;
    private widthOrHeight: TWidthOrHeight;
    private lastPosition: number;

    /*@ngInject*/
    constructor(private $document: IDocumentService, private $element: IAugmentedJQuery, private $scope: IScope, $transclude: ITranscludeFunction, private $compile: ICompileService) {
        this.panes = [];
        this.enabled = false;
        this.dragged = false;
        this.showSplitHandler = true;

        $transclude((clone) => {
            $element.append(clone);
        });
    }

    public $postLink(): void {
        if (this.panes.length > 1) {
            this.initComponent();
        }
    }

    public $onDestroy(): void {
        this.$element.off('mousemove', this.drag);
        this.handler.off('mousedown', this.dragstart);
        this.$document.off('mouseup', this.dragend);
    }

    public togglePane(isVisible: boolean) {
        this.panes.forEach((pane) => {
            pane.$element.toggleClass(`split-pane${pane.index}`, isVisible);
        });

        this.setPosition(isVisible ? this.lastPosition : null, false);
        this.showSplitHandler = isVisible;
    }

    public addPane(pane: PaneComponentController): number {
        if (this.panes.length > 1) {
            throw new Error('splitters can only have two panes');
        }

        this.panes.push(pane);

        return this.panes.length;
    }

    private initComponent() {
        this.handler = this.$compile('<div class="split-handler" ng-show="$ctrl.showSplitHandler"></div>')(this.$scope);
        this.vertical = this.orientation === 'vertical';

        this.$element.addClass('split-panes');

        const pane1 = this.panes[0];

        pane1.$element.after(this.handler);

        const initPane1 = (!isNaN(pane1.initSize));
        const initPane2 = (!isNaN(this.panes[1].initSize));

        if (this.vertical) {
            this.topOrLeft = 'top';
            this.widthOrHeight = 'height';
        } else {
            this.topOrLeft = 'left';
            this.widthOrHeight = 'width';
        }

        if (initPane2) {
            throw new Error('Second pane cannot have init-size attribute');
        }

        const preservedInitSize = parseInt(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${this.preserveSizeId}`), 10);
        const pane1InitSize = preservedInitSize || pane1.initSize;

        if (initPane1 || preservedInitSize) {
            this.setPosition(pane1InitSize);
        }

        this.togglePane(this.panes[0].show && this.panes[1].show);

        this.$element.on('mousemove', this.drag);
        this.handler.on('mousedown', this.dragstart);
        this.$document.on('mouseup', this.dragend);
    }

    // If null, CSS rule will be removed
    private setPosition(position: number | null, setLastPosition: boolean = true) {
        const handlerSize = this.orientation === 'vertical' ? this.handler[0].getBoundingClientRect().height
                                                            : this.handler[0].getBoundingClientRect().width;

        this.lastPosition = setLastPosition ? position : this.lastPosition;

        const pane1Value = position ? `${position}px` : '';
        const pane2Value = position ? `${position + handlerSize}px` : '';

        this.handler.css(this.topOrLeft, pane1Value);
        this.panes[0].$element.css(this.widthOrHeight, pane1Value);
        this.panes[1].$element.css(this.topOrLeft, pane2Value);
    }

    @bind
    private drag(event) {
        if (!this.dragged) {
            return;
        }

        const bounds = this.$element[0].getBoundingClientRect();
        let position = 0;
        const pane1Min = this.panes[0].minSize || 0;
        const pane2Min = this.panes[1].minSize || 0;

        if (this.vertical) {
            const height = bounds.bottom - bounds.top;
            position = event.clientY - bounds.top;

            if (position < pane1Min) {
                return;
            }

            if (height - position < pane2Min) {
                return;
            }

            this.setPosition(position);

        } else {
            const width = bounds.right - bounds.left;
            position = event.clientX - bounds.left;

            if (position < pane1Min) {
                return;
            }

            if (width - position < pane2Min) {
                return;
            }

            this.setPosition(position);
        }

        if (this.preserveSizeId) {
            localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${this.preserveSizeId}`, `${position}`);
        }

        this.$scope.$apply();
    }

    @bind
    private dragstart(event) {
        event.preventDefault();
        this.dragged = true;
    }

    @bind
    private dragend() {
        this.dragged = false;
    }
}

/**
 * @ngdoc component
 * @name kpSplitter
 * @module angularjs-splitter
 *
 * @param {TSplitterOrientation} orientation Orientation of inner {@link component:kpSplitterPane panes}. `'vertical'` is panes above one another. `'horizontal'` is panes side by side.
 * @param {string} preserveSizeId Unique ID of element under which size of element is stored in localStorage.
 *
 * @description
 * Component for split areas with dynamic border. See example.
 * If `preserve-size-id` is given, component stores actual size value in localStorage and after reload, size is restored.
 *
 * @example
 * <example name="kpSplitterExample" module="kpSplitterExample" frame-no-resize="true">
 *     <file name="index.html">
 *      <main style="width: 100%; height: 500px;">
 *          <kp-splitter orientation="horizontal">
 *              <kp-splitter-pane min-size="100" init-size="200">
 *                  <div class="pane-container">Pane 1</div>
 *              </kp-splitter-pane>
 *              <kp-splitter-pane min-size="100">
 *                  <kp-splitter orientation="vertical" preserve-size-id="vertical-splitter">
 *                      <kp-splitter-pane min-size="100" init-size="300">
 *                          <div class="pane-container">Pane 2</div>
 *                      </kp-splitter-pane>
 *                      <kp-splitter-pane min-size="100">
 *                          <div class="pane-containe">Pane 3</div>
 *                      </kp-splitter-pane>
 *                  </kp-splitter>
 *              </kp-splitter-pane>
 *          </kp-splitter>
 *      </main>
 *     </file>
 *     <file name="script.js">
 *          angular.module('kpSplitterExample', ['angularjs-splitter']);
 *     </file>
 * </example>
 */
export default class SplitterComponent {
    public static componentName = 'kpSplitter';

    public bindings = {
        orientation: '@',
        preserveSizeId: '@?'
    };

    public transclude = true;

    public require = {
        splitterScrollController: '^?kpSplitterScroll'
    };

    public controller = SplitterComponentController;
}

/**
 * @ngdoc type
 * @name TSplitterOrientation
 * @module angularjs-splitter
 *
 * @description
 * kpSplitter orientation: `'vertical' | 'horizontal'`;
 */
export type TSplitterOrientation = 'vertical' | 'horizontal';

export interface SplitterBindings {
    orientation: TSplitterOrientation;
    preserveSizeId?: string;
}
