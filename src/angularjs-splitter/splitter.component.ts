import {IAugmentedJQuery, IDocumentService, IOnDestroy, IPostLink, IScope, ITranscludeFunction} from 'angular';
import {PaneComponentController} from './pane.component';
import bind from 'bind-decorator';
import angular = require('angular');

export class SplitterComponentController implements IPostLink, IOnDestroy {
    public orientation: string;
    public enabled: boolean;
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

        if (initPane1) {
            this.handler.css(initLOrR, `${pane1.initSize}px`);
            pane1.element.css(initWOrH, `${pane1.initSize}px`);
            pane2.element.css(initLOrR, `${pane1.initSize}px`);
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

export default class SplitterComponent {
    public static componentName = 'kpSplitter';

    public bindings = {
        orientation: '@'
    };

    public transclude = true;

    public require = {
        splitterScrollController: '^?kpSplitterScroll'
    };

    public controller = SplitterComponentController;
}
