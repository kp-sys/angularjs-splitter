import {IAugmentedJQuery, IDocumentService, IOnDestroy, IPostLink, IScope, ITranscludeFunction} from 'angular';
import {PaneComponentController} from './pane.component';
import bind from 'bind-decorator';
import angular = require('angular');

const LOCAL_STORAGE_PREFIX = `kpSplitter-`;

export class SplitterComponentController implements IPostLink, IOnDestroy {
    public orientation: string;
    public enabled: boolean;
    public preserveSizeId: string;
    private panes: PaneComponentController[];
    private handler: IAugmentedJQuery;
    private vertical: boolean;
    private dragged: boolean;

    /*@ngInject*/
    constructor(private $document: IDocumentService, private $element: IAugmentedJQuery, private $scope: IScope, $transclude: ITranscludeFunction) {
        this.panes = [];
        this.enabled = false;
        this.dragged = false;

        $transclude((clone) => {
            $element.append(clone);
        });
    }

    public addPane(pane: PaneComponentController): number {
        if (this.panes.length > 1) {
            throw new Error('splitters can only have two panes');
        }

        this.panes.push(pane);

        return this.panes.length;
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

    private initComponent() {
        this.handler = angular.element('<div class="split-handler"></div>');
        this.vertical = this.orientation === 'vertical';

        this.$element.addClass('split-panes');

        const pane1 = this.panes[0];
        const pane2 = this.panes[1];

        pane1.element.after(this.handler);

        const initPane1 = (!isNaN(pane1.initSize));
        const initPane2 = (!isNaN(pane2.initSize));
        let initLOrR: string;
        let initWOrH: string;

        if (this.vertical) {
            initLOrR = 'top';
            initWOrH = 'height';
        } else {
            initLOrR = 'left';
            initWOrH = 'width';
        }

        if (initPane2) {
            throw new Error('Second pane cannot have init-size attribute');
        }

        const preservedInitSize = parseInt(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${this.preserveSizeId}`), 10);
        const pane1InitSize = preservedInitSize || pane1.initSize;

        if (initPane1 || preservedInitSize) {
            this.handler.css(initLOrR, `${pane1InitSize}px`);
            pane1.element.css(initWOrH, `${pane1InitSize}px`);
            pane2.element.css(initLOrR, `${pane1InitSize}px`);
        }

        this.$element.on('mousemove', this.drag);
        this.handler.on('mousedown', this.dragstart);
        this.$document.on('mouseup', this.dragend);
    }

    @bind
    private drag(event) {
        if (!this.dragged) {
            return;
        }

        const bounds = this.$element[0].getBoundingClientRect();
        let pos = 0;
        const pane1Min = this.panes[0].minSize || 0;
        const pane2Min = this.panes[1].minSize || 0;

        if (this.vertical) {
            const height = bounds.bottom - bounds.top;
            pos = event.clientY - bounds.top;

            if (pos < pane1Min) {
                return;
            }

            if (height - pos < pane2Min) {
                return;
            }

            this.handler.css('top', `${pos}px`);
            this.panes[0].element.css('height', `${pos}px`);
            this.panes[1].element.css('top', `${pos}px`);

        } else {
            const width = bounds.right - bounds.left;
            pos = event.clientX - bounds.left;

            if (pos < pane1Min) {
                return;
            }

            if (width - pos < pane2Min) {
                return;
            }

            this.handler.css('left', `${pos}px`);
            this.panes[0].element.css('width', `${pos}px`);
            this.panes[1].element.css('left', `${pos}px`);
        }

        if (this.preserveSizeId) {
            localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${this.preserveSizeId}`, `${pos}`);
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