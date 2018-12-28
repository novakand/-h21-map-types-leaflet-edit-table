// Type definitions for Leaflet.Editable 0.7
// Project: https://github.com/yohanboniface/Leaflet.Editable
// Definitions by: Dominic Alie <https://github.com/dalie>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module L {

    interface EditableStatic {
        new(map: Map, options: EditOptions): Editable;
    }

    interface EditOptions {
        polylineClass?: object;
        polygonClass?: object;
        markerClass?: object;
        drawingCSSClass?: string;
        editLayer?: LayerGroup<ILayer>;
        featuresLayer?: LayerGroup<Polyline | Polygon | Marker>;
        vertexMarkerClass?: object;
        middleMarkerClass?: object;
        polylineEditorClass?: object;
        polygonEditorClass?: object;
        markerEditorClass?: object;
        lineGuideOptions?: object;
        skipMiddleMarkers?: boolean;
    }


    interface Editable extends Mixin.LeafletMixinEvents {
        options: EditOptions;
        currentPolygon: Polyline | Polygon | Marker | Circle;
        startPolyline(latLng?: LatLng, options?: PolylineOptions): Polyline;
        startPolygon(latLng?: LatLng, options?: PolylineOptions): Polygon;
        startMarker(latLng?: LatLng, options?: MarkerOptions): Marker;
        stopDrawing(): void;
        commitDrawing(): void;
    }

    let Editable: EditableStatic;

    interface EditableMixin {

        enableEdit(): any;
        disableEdit(): void;
        toggleEdit(): void;
        editEnabled(): boolean;
    }

    interface Map {

        editable: boolean;
        editOptions: EditOptions;
        editTools: Editable;
    }

    interface Polyline extends EditableMixin { }

    namespace Map {
        interface MapOptions {
            editable?: boolean;
            editOptions?: EditOptions;
        }
    }

    interface BaseEditor {
        enable(): MarkerEditor | PolylineEditor | PolygonEditor;
        disable(): MarkerEditor | PolylineEditor | PolygonEditor;
    }

    interface PathEditor extends BaseEditor {
        reset(): void;
    }

    interface PolylineEditor extends PathEditor {

        continueForward(): void;
        continueBackward(): void;
    }

    interface PolygonEditor extends PathEditor {

        newHole(latlng: LatLng): void;
    }

    interface CircleEditor extends PathEditor {

        newHole(latlng: LatLng): void;
    }


    interface MarkerEditor extends BaseEditor { }

    interface Marker extends EditableMixin, MarkerEditor { }

    interface Polyline extends EditableMixin, PolylineEditor { }

    interface Polygon extends EditableMixin, PolygonEditor { }

    interface Circle extends EditableMixin, CircleEditor { }
}
