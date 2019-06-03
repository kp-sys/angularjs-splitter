import kpSplitter from './splitter.module';
import {IAugmentedJQuery, ICompileService, IScope} from 'angular';
import {PaneBindings} from './pane.component';
import {SplitterBindings} from './splitter.component';
import angular = require('angular');

interface TestScopeProperties {
    splitter: SplitterBindings;
    pane1?: PaneBindings;
    pane2?: PaneBindings;
}

interface TestScope extends IScope, TestScopeProperties {
}

describe('kpSplitter component', () => {

    let $scope: TestScope;
    let $compile: ICompileService;
    let element: IAugmentedJQuery;

    beforeEach(() => {
        angular.mock.module(kpSplitter);

        // tslint:disable-next-line:variable-name
        inject((_$rootScope_, _$compile_) => {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
        });
    });

    afterEach(() => {
        // tslint:disable-next-line:no-unused-expression
        element && element.remove();
    });

    function mockElement(settings?: TestScopeProperties) {
        angular.extend($scope, settings);

        const template = `
            <kp-splitter orientation="${$scope.splitter.orientation}" preserve-size-id="${$scope.splitter.preserveSizeId}">
                <kp-splitter-pane min-size="pane1.minSize" init-size="pane1.initSize" show="pane1.show"></kp-splitter-pane>
                <kp-splitter-pane min-size="pane2.minSize" init-size="pane2.initSize" show="pane2.show"></kp-splitter-pane>
            </kp-splitter>
        `;

        element = $compile(template)($scope);
        angular.element(document.body).append(element);

        $scope.$apply();
    }

    it('should render two panes with splitter', () => {
        mockElement({splitter: {orientation: 'horizontal'}});

        expect(element.hasClass('split-panes')).toBe(true);

        const handler = element[0].children[1];
        expect(handler.classList).toContain('split-handler');
        expect(handler.classList).not.toContain('ng-hide');
    });

    it('should render panes with initial size 100px', () => {
        mockElement({splitter: {orientation: 'horizontal'}, pane1: {initSize: 100}});

        expect(element[0].children[0].getBoundingClientRect().width).toBe(100);
    });

    it('should render only first pane', () => {
        mockElement({splitter: {orientation: 'vertical'}, pane1: {initSize: 100}, pane2: {show: false}});

        const handler = element[0].children[1];
        expect(handler.classList).toContain('ng-hide');
        expect(element[0].children[0].classList).not.toContain('split-pane1');
        expect(element[0].children[2].classList).toContain('ng-hide');
        expect(element[0].children[2].classList).not.toContain('split-pane2');
    });

    it('should render only second pane', () => {
        mockElement({splitter: {orientation: 'vertical'}, pane1: {initSize: 100, show: false}, pane2: {show: true}});

        const handler = element[0].children[1];
        expect(handler.classList).toContain('ng-hide');
        expect(element[0].children[0].classList).not.toContain('split-pane1');
        expect(element[0].children[0].classList).toContain('ng-hide');
        expect(element[0].children[2].classList).not.toContain('split-pane2');
    });

    it('should not render panes', () => {
        mockElement({splitter: {orientation: 'horizontal'}, pane1: {initSize: 100, show: false}, pane2: {show: false}});

        const handler = element[0].children[1];
        expect(handler.classList).toContain('ng-hide');
        expect(element[0].children[0].classList).not.toContain('split-pane1');
        expect(element[0].children[0].classList).toContain('ng-hide');
        expect(element[0].children[2].classList).not.toContain('split-pane2');
        expect(element[0].children[2].classList).toContain('ng-hide');
    });

    it('should toggle visibility of first pane', () => {
        mockElement({splitter: {orientation: 'horizontal'}, pane1: {initSize: 100, show: true}, pane2: {show: true}});

        const handler = element[0].children[1];

        expect(handler.classList).not.toContain('ng-hide');
        expect(element[0].children[0].classList).toContain('split-pane1');
        expect(element[0].children[2].classList).toContain('split-pane2');

        $scope.$apply(() => {
            $scope.pane1.show = false;
        });

        expect(handler.classList).toContain('ng-hide');
        expect(element[0].children[0].classList).not.toContain('split-pane1');
        expect(element[0].children[0].classList).toContain('ng-hide');
        expect(element[0].children[2].classList).not.toContain('split-pane2');
        expect(element[0].children[2].classList).not.toContain('ng-hide');

        $scope.$apply(() => {
            $scope.pane1.show = true;
        });

        expect(handler.classList).not.toContain('ng-hide');
        expect(element[0].children[0].classList).toContain('split-pane1');
        expect(element[0].children[2].classList).toContain('split-pane2');
    });

    it('should toggle visibility of second pane', () => {
        mockElement({splitter: {orientation: 'horizontal'}, pane1: {initSize: 100, show: true}, pane2: {show: true}});

        const handler = element[0].children[1];

        expect(handler.classList).not.toContain('ng-hide');
        expect(element[0].children[0].classList).toContain('split-pane1');
        expect(element[0].children[2].classList).toContain('split-pane2');

        $scope.$apply(() => {
            $scope.pane2.show = false;
        });

        expect(handler.classList).toContain('ng-hide');
        expect(element[0].children[0].classList).not.toContain('split-pane1');
        expect(element[0].children[0].classList).not.toContain('ng-hide');
        expect(element[0].children[2].classList).toContain('ng-hide');
        expect(element[0].children[2].classList).not.toContain('split-pane2');

        $scope.$apply(() => {
            $scope.pane2.show = true;
        });

        expect(handler.classList).not.toContain('ng-hide');
        expect(element[0].children[0].classList).toContain('split-pane1');
        expect(element[0].children[2].classList).toContain('split-pane2');
    });

    it('should throw error if 3 panes', () => {
        const compile = () => {
            const template = `
            <kp-splitter orientation="vertical">
                <kp-splitter-pane min-size="pane1.minSize" init-size="pane1.initSize" show="pane1.show"></kp-splitter-pane>
                <kp-splitter-pane min-size="pane2.minSize" init-size="pane2.initSize" show="pane2.show"></kp-splitter-pane>
                <kp-splitter-pane min-size="pane2.minSize" init-size="pane2.initSize" show="pane2.show"></kp-splitter-pane>
            </kp-splitter>
        `;

            $compile(template)($scope);
        };

        expect(() => compile()).toThrow(new Error('splitters can only have two panes'));

    });

    it('should throw error if 2nd pane have init-size attribute', () => {
        const compile = () => {
            const template = `
            <kp-splitter orientation="vertical">
                <kp-splitter-pane min-size="pane1.minSize" init-size="pane1.initSize" show="pane1.show"></kp-splitter-pane>
                <kp-splitter-pane init-size="20" show="pane2.show"></kp-splitter-pane>
            </kp-splitter>
        `;

            $compile(template)($scope);
        };

        expect(() => compile()).toThrow(new Error('Second pane cannot have init-size attribute'));

    });
});
