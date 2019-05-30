angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "api",
    "name": "API",
    "navGroups": [
      {
        "name": "angularjs-splitter",
        "type": "groups",
        "href": "api/angularjs-splitter",
        "navItems": [
          {
            "name": "component",
            "type": "section",
            "href": "api/angularjs-splitter/component",
            "navItems": [
              {
                "name": "kpSplitterPane",
                "type": "component",
                "href": "api/angularjs-splitter/component/kpSplitterPane"
              }
            ]
          }
        ]
      }
    ]
  }
});
