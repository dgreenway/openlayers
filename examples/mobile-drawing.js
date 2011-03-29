function init() {

    // create a vector layer for drawing
    var vector = new OpenLayers.Layer.Vector();

    // OpenLayers' EditingToolbar internally creates a Navigation control, we
    // want a TouchNavigation control here so we create our own editing toolbar
    var toolbar = new OpenLayers.Control.Panel({
        displayClass: 'olControlEditingToolbar'
    });
    toolbar.addControls([
        // this control is just there to be able to deactivate the drawing
        // tools
        new OpenLayers.Control({
            displayClass: 'olControlNavigation'
        }),
        new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Point, {
            displayClass: 'olControlDrawFeaturePoint'
        }),
        new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Path, {
            displayClass: 'olControlDrawFeaturePath'
        }),
        new OpenLayers.Control.DrawFeature(vector, OpenLayers.Handler.Polygon, {
            displayClass: 'olControlDrawFeaturePolygon'
        })
    ]);

    map = new OpenLayers.Map({
        div: 'map',
        projection: 'EPSG:900913',
        units: 'm',
        numZoomLevels: 18,
        maxResolution: 156543.0339,
        maxExtent: new OpenLayers.Bounds(
            -20037508.34, -20037508.34, 20037508.34, 20037508.34
        ),
        controls: [
            new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    interval: 100
                }
            }),
            new OpenLayers.Control.ZoomPanel(),
            toolbar
        ],
        layers: [new OpenLayers.Layer.OSM(), vector],
        center: new OpenLayers.LonLat(0, 0),
        zoom: 1,
        theme: null
    });

    // activate the first control to render the "navigation icon"
    // as active
    toolbar.controls[0].activate();
};
