import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  AsyncPipe,
  DOCUMENT,
  NgClass,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-Y5GTXJDS.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  IterableDiffers,
  KeyValueDiffers,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  booleanAttribute,
  computed,
  inject,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction4,
  ɵɵpureFunction5,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-SVPRDJHU.js";
import {
  require_operators
} from "./chunk-UOPINYA3.js";
import {
  require_cjs
} from "./chunk-5IW5ZEPE.js";
import "./chunk-RPWZ4CMX.js";
import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-NQ4HTGF6.js";

// node_modules/tslib/tslib.es6.mjs
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

// node_modules/@swimlane/ngx-datatable/fesm2022/swimlane-ngx-datatable.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
var _c0 = ["*"];
var _c1 = () => [];
function DataTableGhostLoaderComponent_For_2_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 5);
  }
  if (rf & 2) {
    const col_r1 = ɵɵnextContext().$implicit;
    ɵɵstyleProp("width", (col_r1 == null ? null : col_r1.width) + "px");
  }
}
function DataTableGhostLoaderComponent_For_2_For_2_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function DataTableGhostLoaderComponent_For_2_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableGhostLoaderComponent_For_2_For_2_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    const col_r1 = ɵɵnextContext().$implicit;
    ɵɵproperty("ngTemplateOutlet", col_r1.ghostCellTemplate);
  }
}
function DataTableGhostLoaderComponent_For_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableGhostLoaderComponent_For_2_For_2_Conditional_0_Template, 1, 2, "div", 3)(1, DataTableGhostLoaderComponent_For_2_For_2_Conditional_1_Template, 1, 1, null, 4);
  }
  if (rf & 2) {
    const col_r1 = ctx.$implicit;
    ɵɵconditional(!col_r1.ghostCellTemplate ? 0 : 1);
  }
}
function DataTableGhostLoaderComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵrepeaterCreate(1, DataTableGhostLoaderComponent_For_2_For_2_Template, 2, 1, null, null, ɵɵrepeaterTrackByIdentity);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("height", ctx_r1.rowHeight + "px");
    ɵɵadvance();
    ɵɵrepeater(ctx_r1.columns);
  }
}
var _c2 = ["cellTemplate"];
var _c3 = ["ghostLoaderTemplate"];
var _c4 = (a0) => ({
  cellContext: a0
});
var _c5 = (a0) => [a0];
function DataTableBodyCellComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 3)(1, "input", 5);
    ɵɵpipe(2, "async");
    ɵɵlistener("click", function DataTableBodyCellComponent_Conditional_0_Conditional_1_Template_input_click_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onCheckboxChange($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("disabled", ɵɵpipeBind1(2, 2, ctx_r1.disable$))("checked", ctx_r1.isSelected);
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 8);
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 9);
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "i", 10);
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 7);
    ɵɵlistener("click", function DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_0_Template_button_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.onTreeAction());
    });
    ɵɵelementStart(1, "span");
    ɵɵtemplate(2, DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_0_Conditional_2_Template, 1, 0, "i", 8)(3, DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_0_Conditional_3_Template, 1, 0, "i", 9)(4, DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_0_Conditional_4_Template, 1, 0, "i", 10);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("disabled", ctx_r1.treeStatus === "disabled");
    ɵɵattribute("aria-label", ctx_r1.treeStatus);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.treeStatus === "loading" ? 2 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.treeStatus === "collapsed" ? 3 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.treeStatus === "expanded" || ctx_r1.treeStatus === "disabled" ? 4 : -1);
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.column.treeToggleTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c4, ctx_r1.cellContext));
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_0_Template, 5, 5, "button", 6)(1, DataTableBodyCellComponent_Conditional_0_Conditional_2_Conditional_1_Template, 1, 4, null, 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵconditional(!ctx_r1.column.treeToggleTemplate ? 0 : 1);
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 11);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("title", ctx_r1.sanitizedValue)("innerHTML", ctx_r1.value, ɵɵsanitizeHtml);
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 12);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("title", ctx_r1.sanitizedValue);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.value);
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableBodyCellComponent_Conditional_0_Conditional_3_Conditional_0_Template, 1, 2, "span", 11)(1, DataTableBodyCellComponent_Conditional_0_Conditional_3_Conditional_1_Template, 2, 2, "span", 12);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵconditional(ctx_r1.column.bindAsUnsafeHtml ? 0 : 1);
  }
}
function DataTableBodyCellComponent_Conditional_0_Conditional_4_ng_template_0_Template(rf, ctx) {
}
function DataTableBodyCellComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableBodyCellComponent_Conditional_0_Conditional_4_ng_template_0_Template, 0, 0, "ng-template", 4, 0, ɵɵtemplateRefExtractor);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.column.cellTemplate)("ngTemplateOutletContext", ctx_r1.cellContext);
  }
}
function DataTableBodyCellComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, DataTableBodyCellComponent_Conditional_0_Conditional_1_Template, 3, 4, "label", 3)(2, DataTableBodyCellComponent_Conditional_0_Conditional_2_Template, 2, 1)(3, DataTableBodyCellComponent_Conditional_0_Conditional_3_Template, 2, 1)(4, DataTableBodyCellComponent_Conditional_0_Conditional_4_Template, 2, 2, null, 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("margin-left", ctx_r1.calcLeftMargin(ctx_r1.column, ctx_r1.row), "px");
    ɵɵadvance();
    ɵɵconditional(ctx_r1.column.checkboxable && (!ctx_r1.displayCheck || ctx_r1.displayCheck(ctx_r1.row, ctx_r1.column, ctx_r1.value)) ? 1 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.column.isTreeColumn ? 2 : -1);
    ɵɵadvance();
    ɵɵconditional(!ctx_r1.column.cellTemplate ? 3 : 4);
  }
}
function DataTableBodyCellComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ghost-loader", 13);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("columns", ɵɵpureFunction1(2, _c5, ctx_r1.column))("pageSize", 1);
  }
}
function DataTableBodyCellComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableBodyCellComponent_Conditional_1_Conditional_0_Template, 1, 4, "ghost-loader", 13);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵconditional(ctx_r1.ghostLoadingIndicator ? 0 : -1);
  }
}
var _forTrack0 = ($index, $item) => $item.type;
var _forTrack1 = ($index, $item) => $item.$$id;
function DataTableBodyRowComponent_For_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-body-cell", 2);
    ɵɵlistener("activate", function DataTableBodyRowComponent_For_1_For_3_Template_datatable_body_cell_activate_0_listener($event) {
      const ɵ$index_5_r2 = ɵɵrestoreView(_r1).$index;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onActivate($event, ɵ$index_5_r2));
    })("treeAction", function DataTableBodyRowComponent_For_1_For_3_Template_datatable_body_cell_treeAction_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onTreeAction());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const column_r4 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("row", ctx_r2.row)("group", ctx_r2.group)("expanded", ctx_r2.expanded)("isSelected", ctx_r2.isSelected)("rowIndex", ctx_r2.rowIndex)("column", column_r4)("rowHeight", ctx_r2.rowHeight)("displayCheck", ctx_r2.displayCheck)("disable$", ctx_r2.disable$)("treeStatus", ctx_r2.treeStatus)("ghostLoadingIndicator", ctx_r2.ghostLoadingIndicator);
  }
}
function DataTableBodyRowComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵpipe(1, "async");
    ɵɵrepeaterCreate(2, DataTableBodyRowComponent_For_1_For_3_Template, 1, 11, "datatable-body-cell", 1, _forTrack1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const colGroup_r5 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("datatable-row-", colGroup_r5.type, " datatable-row-group");
    ɵɵstyleProp("width", ctx_r2._columnGroupWidths[colGroup_r5.type], "px");
    ɵɵclassProp("row-disabled", ctx_r2.disable$ ? ɵɵpipeBind1(1, 7, ctx_r2.disable$) : false);
    ɵɵadvance(2);
    ɵɵrepeater(colGroup_r5.columns);
  }
}
function DatatableRowDefComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.rowDef.rowDefInternal.rowTemplate)("ngTemplateOutletContext", ctx_r0.rowDef);
  }
}
var _c6 = ["select"];
function DataTableRowWrapperComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div")(1, "label", 6)(2, "input", 7, 0);
    ɵɵlistener("change", function DataTableRowWrapperComponent_Conditional_0_Conditional_2_Template_input_change_2_listener() {
      ɵɵrestoreView(_r1);
      const select_r2 = ɵɵreference(3);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onCheckboxChange(select_r2.checked));
    });
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("checked", ctx_r2.selectedGroupRows().length === ctx_r2.group().value.length);
  }
}
function DataTableRowWrapperComponent_Conditional_0_ng_template_3_Template(rf, ctx) {
}
function DataTableRowWrapperComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3)(1, "div", 4);
    ɵɵtemplate(2, DataTableRowWrapperComponent_Conditional_0_Conditional_2_Template, 4, 1, "div")(3, DataTableRowWrapperComponent_Conditional_0_ng_template_3_Template, 0, 0, "ng-template", 5);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵstyleProp("height", ctx_r2.groupHeaderRowHeight, "px")("width", ctx_r2.innerWidth, "px");
    ɵɵadvance(2);
    ɵɵconditional(ctx_r2.groupHeader.checkboxable ? 2 : -1);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.groupHeader.template)("ngTemplateOutletContext", ctx_r2.groupContext);
  }
}
function DataTableRowWrapperComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
function DataTableRowWrapperComponent_Conditional_2_ng_template_1_Template(rf, ctx) {
}
function DataTableRowWrapperComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtemplate(1, DataTableRowWrapperComponent_Conditional_2_ng_template_1_Template, 0, 0, "ng-template", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵstyleProp("height", ctx_r2.detailRowHeight, "px");
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r2.rowDetail.template)("ngTemplateOutletContext", ctx_r2.rowContext);
  }
}
function DataTableSummaryRowComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "datatable-body-row", 0);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("innerWidth", ctx_r0.innerWidth)("offsetX", ctx_r0.offsetX)("columns", ctx_r0._internalColumns)("rowHeight", ctx_r0.rowHeight)("row", ctx_r0.summaryRow)("rowIndex", -1);
  }
}
var _c7 = [[["", "loading-indicator", ""]], [["", "empty-content", ""]]];
var _c8 = ["[loading-indicator]", "[empty-content]"];
var _c9 = (a0, a1, a2, a3) => ({
  template: a0,
  rowTemplate: a1,
  row: a2,
  index: a3
});
function DataTableBodyComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4)(1, "div", 9);
    ɵɵprojection(2);
    ɵɵelementEnd()();
  }
}
function DataTableBodyComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ghost-loader", 5);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("columns", ctx_r1.columns)("pageSize", ctx_r1.pageSize)("rowHeight", ctx_r1.rowHeight)("ghostBodyHeight", ctx_r1.bodyHeight);
  }
}
function DataTableBodyComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "datatable-summary-row", 11);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("rowHeight", ctx_r1.summaryHeight)("offsetX", ctx_r1.offsetX)("innerWidth", ctx_r1.innerWidth)("rows", ctx_r1.rows)("columns", ctx_r1.columns);
  }
}
function DataTableBodyComponent_Conditional_4_For_3_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function DataTableBodyComponent_Conditional_4_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableBodyComponent_Conditional_4_For_3_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 15);
  }
  if (rf & 2) {
    const ctx_r4 = ɵɵnextContext();
    const group_r6 = ctx_r4.$implicit;
    const ɵ$index_18_r7 = ctx_r4.$index;
    const bodyRow_r8 = ɵɵreference(5);
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("rowDefInternal", ɵɵpureFunction4(1, _c9, ctx_r1.rowDefTemplate, bodyRow_r8, group_r6, ɵ$index_18_r7));
  }
}
function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-body-row", 17, 3);
    ɵɵlistener("treeAction", function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template_datatable_body_row_treeAction_0_listener() {
      ɵɵrestoreView(_r9);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onTreeAction(group_r6));
    })("activate", function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template_datatable_body_row_activate_0_listener($event) {
      ɵɵrestoreView(_r9);
      const ɵ$index_18_r7 = ɵɵnextContext(2).$index;
      const ctx_r1 = ɵɵnextContext(2);
      const selector_r10 = ɵɵreference(3);
      return ɵɵresetView(selector_r10.onActivate($event, ctx_r1.indexes().first + ɵ$index_18_r7));
    })("drop", function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template_datatable_body_row_drop_0_listener($event) {
      ɵɵrestoreView(_r9);
      const rowElement_r11 = ɵɵreference(1);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.drop($event, group_r6, rowElement_r11));
    })("dragover", function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template_datatable_body_row_dragover_0_listener($event) {
      ɵɵrestoreView(_r9);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.dragOver($event, group_r6));
    })("dragenter", function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template_datatable_body_row_dragenter_0_listener($event) {
      ɵɵrestoreView(_r9);
      const rowElement_r11 = ɵɵreference(1);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.dragEnter($event, group_r6, rowElement_r11));
    })("dragleave", function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template_datatable_body_row_dragleave_0_listener($event) {
      ɵɵrestoreView(_r9);
      const rowElement_r11 = ɵɵreference(1);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.dragLeave($event, group_r6, rowElement_r11));
    })("dragstart", function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template_datatable_body_row_dragstart_0_listener($event) {
      ɵɵrestoreView(_r9);
      const rowElement_r11 = ɵɵreference(1);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.drag($event, group_r6, rowElement_r11));
    })("dragend", function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template_datatable_body_row_dragend_0_listener($event) {
      ɵɵrestoreView(_r9);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.dragEnd($event, group_r6));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const group_r6 = ɵɵnextContext(2).$implicit;
    const rowWrapper_r12 = ɵɵreference(1);
    const ctx_r1 = ɵɵnextContext(2);
    const selector_r10 = ɵɵreference(3);
    ɵɵproperty("disable$", rowWrapper_r12.disable$)("isSelected", selector_r10.getRowSelected(group_r6))("innerWidth", ctx_r1.innerWidth)("offsetX", ctx_r1.offsetX)("columns", ctx_r1.columns)("rowHeight", ctx_r1.getRowHeight(group_r6))("row", group_r6)("rowIndex", ctx_r1.getRowIndex(group_r6))("expanded", ctx_r1.getRowExpanded(group_r6))("rowClass", ctx_r1.rowClass)("displayCheck", ctx_r1.displayCheck)("treeStatus", group_r6 == null ? null : group_r6.treeStatus)("ghostLoadingIndicator", ctx_r1.ghostLoadingIndicator)("draggable", ctx_r1.rowDraggable)("verticalScrollVisible", ctx_r1.verticalScrollVisible);
  }
}
function DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Conditional_0_Template, 2, 15, "datatable-body-row", 16);
  }
  if (rf & 2) {
    const group_r6 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵconditional(ctx_r1.isRow(group_r6) ? 0 : -1);
  }
}
function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-body-row", 17, 3);
    ɵɵlistener("treeAction", function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template_datatable_body_row_treeAction_0_listener() {
      ɵɵrestoreView(_r13);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.onTreeAction(group_r6));
    })("activate", function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template_datatable_body_row_activate_0_listener($event) {
      ɵɵrestoreView(_r13);
      const ɵ$index_18_r7 = ɵɵnextContext(2).$index;
      const ctx_r1 = ɵɵnextContext(2);
      const selector_r10 = ɵɵreference(3);
      return ɵɵresetView(selector_r10.onActivate($event, ctx_r1.indexes().first + ɵ$index_18_r7));
    })("drop", function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template_datatable_body_row_drop_0_listener($event) {
      ɵɵrestoreView(_r13);
      const rowElement_r14 = ɵɵreference(1);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.drop($event, group_r6, rowElement_r14));
    })("dragover", function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template_datatable_body_row_dragover_0_listener($event) {
      ɵɵrestoreView(_r13);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.dragOver($event, group_r6));
    })("dragenter", function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template_datatable_body_row_dragenter_0_listener($event) {
      ɵɵrestoreView(_r13);
      const rowElement_r14 = ɵɵreference(1);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.dragEnter($event, group_r6, rowElement_r14));
    })("dragleave", function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template_datatable_body_row_dragleave_0_listener($event) {
      ɵɵrestoreView(_r13);
      const rowElement_r14 = ɵɵreference(1);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.dragLeave($event, group_r6, rowElement_r14));
    })("dragstart", function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template_datatable_body_row_dragstart_0_listener($event) {
      ɵɵrestoreView(_r13);
      const rowElement_r14 = ɵɵreference(1);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.drag($event, group_r6, rowElement_r14));
    })("dragend", function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template_datatable_body_row_dragend_0_listener($event) {
      ɵɵrestoreView(_r13);
      const group_r6 = ɵɵnextContext(2).$implicit;
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.dragEnd($event, group_r6));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const group_r6 = ɵɵnextContext(2).$implicit;
    const rowWrapper_r12 = ɵɵreference(1);
    const ctx_r1 = ɵɵnextContext(2);
    const selector_r10 = ɵɵreference(3);
    ɵɵproperty("disable$", rowWrapper_r12.disable$)("isSelected", selector_r10.getRowSelected(group_r6))("innerWidth", ctx_r1.innerWidth)("offsetX", ctx_r1.offsetX)("columns", ctx_r1.columns)("rowHeight", ctx_r1.getRowHeight(group_r6))("row", group_r6)("rowIndex", ctx_r1.getRowIndex(group_r6))("expanded", ctx_r1.getRowExpanded(group_r6))("rowClass", ctx_r1.rowClass)("displayCheck", ctx_r1.displayCheck)("treeStatus", group_r6 == null ? null : group_r6.treeStatus)("ghostLoadingIndicator", ctx_r1.ghostLoadingIndicator)("draggable", ctx_r1.rowDraggable)("verticalScrollVisible", ctx_r1.verticalScrollVisible);
  }
}
function DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Conditional_0_Template, 2, 15, "datatable-body-row", 16);
  }
  if (rf & 2) {
    const group_r6 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵconditional(ctx_r1.isRow(group_r6) ? 0 : -1);
  }
}
function DataTableBodyComponent_Conditional_4_For_3_Conditional_6_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-body-row", 19, 3);
    ɵɵlistener("activate", function DataTableBodyComponent_Conditional_4_For_3_Conditional_6_For_1_Template_datatable_body_row_activate_0_listener($event) {
      const ɵ$index_36_r16 = ɵɵrestoreView(_r15).$index;
      ɵɵnextContext(4);
      const selector_r10 = ɵɵreference(3);
      return ɵɵresetView(selector_r10.onActivate($event, ɵ$index_36_r16));
    })("drop", function DataTableBodyComponent_Conditional_4_For_3_Conditional_6_For_1_Template_datatable_body_row_drop_0_listener($event) {
      const row_r17 = ɵɵrestoreView(_r15).$implicit;
      const rowElement_r18 = ɵɵreference(1);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.drop($event, row_r17, rowElement_r18));
    })("dragover", function DataTableBodyComponent_Conditional_4_For_3_Conditional_6_For_1_Template_datatable_body_row_dragover_0_listener($event) {
      const row_r17 = ɵɵrestoreView(_r15).$implicit;
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.dragOver($event, row_r17));
    })("dragenter", function DataTableBodyComponent_Conditional_4_For_3_Conditional_6_For_1_Template_datatable_body_row_dragenter_0_listener($event) {
      const row_r17 = ɵɵrestoreView(_r15).$implicit;
      const rowElement_r18 = ɵɵreference(1);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.dragEnter($event, row_r17, rowElement_r18));
    })("dragleave", function DataTableBodyComponent_Conditional_4_For_3_Conditional_6_For_1_Template_datatable_body_row_dragleave_0_listener($event) {
      const row_r17 = ɵɵrestoreView(_r15).$implicit;
      const rowElement_r18 = ɵɵreference(1);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.dragLeave($event, row_r17, rowElement_r18));
    })("dragstart", function DataTableBodyComponent_Conditional_4_For_3_Conditional_6_For_1_Template_datatable_body_row_dragstart_0_listener($event) {
      const row_r17 = ɵɵrestoreView(_r15).$implicit;
      const rowElement_r18 = ɵɵreference(1);
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.drag($event, row_r17, rowElement_r18));
    })("dragend", function DataTableBodyComponent_Conditional_4_For_3_Conditional_6_For_1_Template_datatable_body_row_dragend_0_listener($event) {
      const row_r17 = ɵɵrestoreView(_r15).$implicit;
      const ctx_r1 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r1.dragEnd($event, row_r17));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const row_r17 = ctx.$implicit;
    const group_r6 = ɵɵnextContext(2).$implicit;
    const rowWrapper_r12 = ɵɵreference(1);
    const ctx_r1 = ɵɵnextContext(2);
    const selector_r10 = ɵɵreference(3);
    ɵɵproperty("disable$", rowWrapper_r12.disable$)("isSelected", selector_r10.getRowSelected(row_r17))("innerWidth", ctx_r1.innerWidth)("offsetX", ctx_r1.offsetX)("columns", ctx_r1.columns)("rowHeight", ctx_r1.getRowHeight(row_r17))("row", row_r17)("group", group_r6.value)("rowIndex", ctx_r1.getRowIndex(row_r17))("expanded", ctx_r1.getRowExpanded(row_r17))("rowClass", ctx_r1.rowClass)("ghostLoadingIndicator", ctx_r1.ghostLoadingIndicator)("draggable", ctx_r1.rowDraggable)("verticalScrollVisible", ctx_r1.verticalScrollVisible);
  }
}
function DataTableBodyComponent_Conditional_4_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵrepeaterCreate(0, DataTableBodyComponent_Conditional_4_For_3_Conditional_6_For_1_Template, 2, 14, "datatable-body-row", 18, ɵɵcomponentInstance().rowTrackingFn, true);
  }
  if (rf & 2) {
    const group_r6 = ɵɵnextContext().$implicit;
    ɵɵrepeater(group_r6.value);
  }
}
function DataTableBodyComponent_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-row-wrapper", 14, 1);
    ɵɵlistener("rowContextmenu", function DataTableBodyComponent_Conditional_4_For_3_Template_datatable_row_wrapper_rowContextmenu_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.rowContextmenu.emit($event));
    });
    ɵɵtemplate(2, DataTableBodyComponent_Conditional_4_For_3_Conditional_2_Template, 1, 6, "ng-container")(3, DataTableBodyComponent_Conditional_4_For_3_Conditional_3_Template, 1, 1)(4, DataTableBodyComponent_Conditional_4_For_3_ng_template_4_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor)(6, DataTableBodyComponent_Conditional_4_For_3_Conditional_6_Template, 2, 0);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const group_r6 = ctx.$implicit;
    const ɵ$index_18_r7 = ctx.$index;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("groupedRows", ctx_r1.groupedRows)("innerWidth", ctx_r1.innerWidth)("ngStyle", ctx_r1.rowsStyles()[ɵ$index_18_r7])("rowDetail", ctx_r1.rowDetail)("groupHeader", ctx_r1.groupHeader)("offsetX", ctx_r1.offsetX)("detailRowHeight", ctx_r1.getDetailRowHeight(group_r6 && group_r6[ɵ$index_18_r7], ɵ$index_18_r7))("groupHeaderRowHeight", ctx_r1.getGroupHeaderRowHeight(group_r6 && group_r6[ɵ$index_18_r7], ɵ$index_18_r7))("row", group_r6)("disableCheck", ctx_r1.disableRowCheck)("expanded", ctx_r1.getRowExpanded(group_r6))("rowIndex", ctx_r1.getRowIndex(group_r6 && group_r6[ɵ$index_18_r7]))("selected", ctx_r1.selected);
    ɵɵattribute("hidden", ctx_r1.ghostLoadingIndicator && (!ctx_r1.rowCount || !ctx_r1.virtualization || !ctx_r1.scrollbarV) ? true : null);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.rowDefTemplate ? 2 : 3);
    ɵɵadvance(4);
    ɵɵconditional(ctx_r1.isGroup(group_r6) ? 6 : -1);
  }
}
function DataTableBodyComponent_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "datatable-summary-row", 13);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ctx_r1.bottomSummaryRowsStyles())("rowHeight", ctx_r1.summaryHeight)("offsetX", ctx_r1.offsetX)("innerWidth", ctx_r1.innerWidth)("rows", ctx_r1.rows)("columns", ctx_r1.columns);
  }
}
function DataTableBodyComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-scroller", 10);
    ɵɵlistener("scroll", function DataTableBodyComponent_Conditional_4_Template_datatable_scroller_scroll_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onBodyScroll($event));
    });
    ɵɵtemplate(1, DataTableBodyComponent_Conditional_4_Conditional_1_Template, 1, 5, "datatable-summary-row", 11);
    ɵɵrepeaterCreate(2, DataTableBodyComponent_Conditional_4_For_3_Template, 7, 16, "datatable-row-wrapper", 12, ɵɵcomponentInstance().rowTrackingFn, true);
    ɵɵtemplate(4, DataTableBodyComponent_Conditional_4_Conditional_4_Template, 1, 6, "datatable-summary-row", 13);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("scrollbarV", ctx_r1.scrollbarV)("scrollbarH", ctx_r1.scrollbarH)("scrollHeight", ctx_r1.scrollHeight())("scrollWidth", ctx_r1.columnGroupWidths == null ? null : ctx_r1.columnGroupWidths.total);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.summaryRow && ctx_r1.summaryPosition === "top" ? 1 : -1);
    ɵɵadvance();
    ɵɵrepeater(ctx_r1.rowsToRender());
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.summaryRow && ctx_r1.summaryPosition === "bottom" ? 4 : -1);
  }
}
function DataTableBodyComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-scroller", 20);
    ɵɵlistener("scroll", function DataTableBodyComponent_Conditional_5_Template_datatable_scroller_scroll_0_listener($event) {
      ɵɵrestoreView(_r19);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onBodyScroll($event));
    });
    ɵɵprojection(1, 1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵstyleProp("width", ctx_r1.scrollbarH ? (ctx_r1.columnGroupWidths == null ? null : ctx_r1.columnGroupWidths.total) + "px" : "100%");
    ɵɵproperty("scrollbarV", ctx_r1.scrollbarV)("scrollbarH", ctx_r1.scrollbarH)("scrollHeight", ctx_r1.scrollHeight());
  }
}
function DataTableHeaderCellComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function DataTableHeaderCellComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableHeaderCellComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.targetMarkerTemplate)("ngTemplateOutletContext", ctx_r0.targetMarkerContext);
  }
}
function DataTableHeaderCellComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 2)(1, "input", 5);
    ɵɵlistener("change", function DataTableHeaderCellComponent_Conditional_2_Template_input_change_1_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.select.emit());
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("checked", ctx_r0.allRowsSelected);
  }
}
function DataTableHeaderCellComponent_Conditional_3_ng_template_0_Template(rf, ctx) {
}
function DataTableHeaderCellComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableHeaderCellComponent_Conditional_3_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.column.headerTemplate)("ngTemplateOutletContext", ctx_r0.cellContext);
  }
}
function DataTableHeaderCellComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 3)(1, "span", 6);
    ɵɵlistener("click", function DataTableHeaderCellComponent_Conditional_4_Template_span_click_1_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onSort());
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ctx_r0.name, " ");
  }
}
function DataTableHeaderComponent_For_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-header-cell", 4);
    ɵɵlistener("resize", function DataTableHeaderComponent_For_2_For_2_Template_datatable_header_cell_resize_0_listener($event) {
      const column_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onColumnResized($event, column_r2));
    })("resizing", function DataTableHeaderComponent_For_2_For_2_Template_datatable_header_cell_resizing_0_listener($event) {
      const column_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onColumnResizing($event, column_r2));
    })("longPressStart", function DataTableHeaderComponent_For_2_For_2_Template_datatable_header_cell_longPressStart_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onLongPressStart($event));
    })("longPressEnd", function DataTableHeaderComponent_For_2_For_2_Template_datatable_header_cell_longPressEnd_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onLongPressEnd($event));
    })("sort", function DataTableHeaderComponent_For_2_For_2_Template_datatable_header_cell_sort_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onSort($event));
    })("select", function DataTableHeaderComponent_For_2_For_2_Template_datatable_header_cell_select_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.select.emit($event));
    })("columnContextmenu", function DataTableHeaderComponent_For_2_For_2_Template_datatable_header_cell_columnContextmenu_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.columnContextmenu.emit($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const column_r2 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("resizeEnabled", column_r2.resizeable)("pressModel", column_r2)("pressEnabled", ctx_r2.reorderable && column_r2.draggable)("dragX", ctx_r2.reorderable && column_r2.draggable && column_r2.dragging)("dragY", false)("dragModel", column_r2)("dragEventTarget", ctx_r2.dragEventTarget)("headerHeight", ctx_r2.headerHeight)("isTarget", column_r2.isTarget)("targetMarkerTemplate", ctx_r2.targetMarkerTemplate)("targetMarkerContext", column_r2.targetMarkerContext)("column", column_r2)("sortType", ctx_r2.sortType)("sorts", ctx_r2.sorts)("selectionType", ctx_r2.selectionType)("sortAscendingIcon", ctx_r2.sortAscendingIcon)("sortDescendingIcon", ctx_r2.sortDescendingIcon)("sortUnsetIcon", ctx_r2.sortUnsetIcon)("allRowsSelected", ctx_r2.allRowsSelected)("enableClearingSortState", ctx_r2.enableClearingSortState);
  }
}
function DataTableHeaderComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2);
    ɵɵrepeaterCreate(1, DataTableHeaderComponent_For_2_For_2_Template, 1, 20, "datatable-header-cell", 3, _forTrack1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const colGroup_r4 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassMap("datatable-row-" + colGroup_r4.type);
    ɵɵproperty("ngStyle", ctx_r2._styleByGroup[colGroup_r4.type]);
    ɵɵadvance();
    ɵɵrepeater(colGroup_r4.columns);
  }
}
var _forTrack2 = ($index, $item) => $item.number;
function DataTablePagerComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 6)(1, "a", 7);
    ɵɵlistener("click", function DataTablePagerComponent_For_8_Template_a_click_1_listener() {
      const pg_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.selectPage(pg_r2.number));
    });
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const pg_r2 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext();
    ɵɵclassProp("active", pg_r2.number === ctx_r2.page);
    ɵɵattribute("aria-label", "page " + pg_r2.number);
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", pg_r2.text, " ");
  }
}
var _c10 = (a0) => ({
  "selected-count": a0
});
var _c11 = (a0, a1, a2, a3, a4) => ({
  rowCount: a0,
  pageSize: a1,
  selectedCount: a2,
  curPage: a3,
  offset: a4
});
function DataTableFooterComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function DataTableFooterComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, DataTableFooterComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.footerTemplate.template)("ngTemplateOutletContext", ɵɵpureFunction5(2, _c11, ctx_r0.rowCount, ctx_r0.pageSize, ctx_r0.selectedCount, ctx_r0.curPage, ctx_r0.offset));
  }
}
function DataTableFooterComponent_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate2(" ", ctx_r0.selectedCount == null ? null : ctx_r0.selectedCount.toLocaleString(), " ", ctx_r0.selectedMessage, " / ");
  }
}
function DataTableFooterComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, DataTableFooterComponent_Conditional_2_Conditional_1_Template, 2, 2, "span");
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "datatable-pager", 3);
    ɵɵlistener("change", function DataTableFooterComponent_Conditional_2_Template_datatable_pager_change_3_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.page.emit($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r0.selectedMessage ? 1 : -1);
    ɵɵadvance();
    ɵɵtextInterpolate2(" ", ctx_r0.rowCount == null ? null : ctx_r0.rowCount.toLocaleString(), " ", ctx_r0.totalMessage, " ");
    ɵɵadvance();
    ɵɵproperty("pagerLeftArrowIcon", ctx_r0.pagerLeftArrowIcon)("pagerRightArrowIcon", ctx_r0.pagerRightArrowIcon)("pagerPreviousIcon", ctx_r0.pagerPreviousIcon)("pagerNextIcon", ctx_r0.pagerNextIcon)("page", ctx_r0.curPage)("size", ctx_r0.pageSize)("count", ctx_r0.rowCount)("hidden", !ctx_r0.isVisible);
  }
}
function DatatableComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-header", 5);
    ɵɵpipe(1, "async");
    ɵɵlistener("sort", function DatatableComponent_Conditional_2_Template_datatable_header_sort_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onColumnSort($event));
    })("resize", function DatatableComponent_Conditional_2_Template_datatable_header_resize_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onColumnResize($event));
    })("resizing", function DatatableComponent_Conditional_2_Template_datatable_header_resizing_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onColumnResizing($event));
    })("reorder", function DatatableComponent_Conditional_2_Template_datatable_header_reorder_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onColumnReorder($event));
    })("select", function DatatableComponent_Conditional_2_Template_datatable_header_select_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onHeaderSelect());
    })("columnContextmenu", function DatatableComponent_Conditional_2_Template_datatable_header_columnContextmenu_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onColumnContextmenu($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("sorts", ctx_r1.sorts)("sortType", ctx_r1.sortType)("scrollbarH", ctx_r1.scrollbarH)("innerWidth", ctx_r1._innerWidth)("offsetX", ɵɵpipeBind1(1, 17, ctx_r1._offsetX))("dealsWithGroup", ctx_r1.groupedRows !== void 0)("columns", ctx_r1._internalColumns)("headerHeight", ctx_r1.headerHeight)("reorderable", ctx_r1.reorderable)("targetMarkerTemplate", ctx_r1.targetMarkerTemplate)("sortAscendingIcon", ctx_r1.cssClasses.sortAscending)("sortDescendingIcon", ctx_r1.cssClasses.sortDescending)("sortUnsetIcon", ctx_r1.cssClasses.sortUnset)("allRowsSelected", ctx_r1.allRowsSelected)("selectionType", ctx_r1.selectionType)("verticalScrollVisible", ctx_r1.verticalScrollVisible)("enableClearingSortState", ctx_r1.enableClearingSortState);
  }
}
function DatatableComponent_ProjectionFallback_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "datatable-progress");
  }
}
function DatatableComponent_ProjectionFallback_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 6);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("innerHTML", ctx_r1.messages.emptyMessage, ɵɵsanitizeHtml);
  }
}
function DatatableComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "datatable-footer", 7);
    ɵɵlistener("page", function DatatableComponent_Conditional_9_Template_datatable_footer_page_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onFooterPage($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("rowCount", ctx_r1.groupedRows !== void 0 ? ctx_r1._internalRows.length : ctx_r1.rowCount)("pageSize", ctx_r1.pageSize)("offset", ctx_r1.offset)("footerHeight", ctx_r1.footerHeight)("footerTemplate", ctx_r1.footer)("totalMessage", ctx_r1.messages.totalMessage)("pagerLeftArrowIcon", ctx_r1.cssClasses.pagerLeftArrow)("pagerRightArrowIcon", ctx_r1.cssClasses.pagerRightArrow)("pagerPreviousIcon", ctx_r1.cssClasses.pagerPrevious)("selectedCount", ctx_r1.selected.length)("selectedMessage", !!ctx_r1.selectionType && ctx_r1.messages.selectedMessage)("pagerNextIcon", ctx_r1.cssClasses.pagerNext);
  }
}
var DataTableFooterTemplateDirective = class _DataTableFooterTemplateDirective {
  static ngTemplateContextGuard(directive, context) {
    return true;
  }
  static {
    this.ɵfac = function DataTableFooterTemplateDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableFooterTemplateDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DataTableFooterTemplateDirective,
      selectors: [["", "ngx-datatable-footer-template", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableFooterTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[ngx-datatable-footer-template]",
      standalone: true
    }]
  }], null, null);
})();
var DatatableGroupHeaderTemplateDirective = class _DatatableGroupHeaderTemplateDirective {
  static ngTemplateContextGuard(directive, context) {
    return true;
  }
  static {
    this.ɵfac = function DatatableGroupHeaderTemplateDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DatatableGroupHeaderTemplateDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DatatableGroupHeaderTemplateDirective,
      selectors: [["", "ngx-datatable-group-header-template", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableGroupHeaderTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[ngx-datatable-group-header-template]",
      standalone: true
    }]
  }], null, null);
})();
var DatatableGroupHeaderDirective = class _DatatableGroupHeaderDirective {
  constructor() {
    this.rowHeight = 0;
    this.checkboxable = false;
    this.toggle = new EventEmitter();
  }
  get template() {
    return this._templateInput || this._templateQuery;
  }
  /**
   * Toggle the expansion of a group
   */
  toggleExpandGroup(group) {
    this.toggle.emit({
      type: "group",
      value: group
    });
  }
  /**
   * Expand all groups
   */
  expandAllGroups() {
    this.toggle.emit({
      type: "all",
      value: true
    });
  }
  /**
   * Collapse all groups
   */
  collapseAllGroups() {
    this.toggle.emit({
      type: "all",
      value: false
    });
  }
  static {
    this.ɵfac = function DatatableGroupHeaderDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DatatableGroupHeaderDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DatatableGroupHeaderDirective,
      selectors: [["ngx-datatable-group-header"]],
      contentQueries: function DatatableGroupHeaderDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, DatatableGroupHeaderTemplateDirective, 7, TemplateRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._templateQuery = _t.first);
        }
      },
      inputs: {
        rowHeight: "rowHeight",
        checkboxable: "checkboxable",
        _templateInput: [0, "template", "_templateInput"]
      },
      outputs: {
        toggle: "toggle"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableGroupHeaderDirective, [{
    type: Directive,
    args: [{
      selector: "ngx-datatable-group-header",
      standalone: true
    }]
  }], null, {
    rowHeight: [{
      type: Input
    }],
    checkboxable: [{
      type: Input
    }],
    _templateInput: [{
      type: Input,
      args: ["template"]
    }],
    _templateQuery: [{
      type: ContentChild,
      args: [DatatableGroupHeaderTemplateDirective, {
        read: TemplateRef,
        static: true
      }]
    }],
    toggle: [{
      type: Output
    }]
  });
})();
function emptyStringGetter() {
  return "";
}
function getterForProp(prop) {
  if (prop == null) {
    return emptyStringGetter;
  }
  if (typeof prop === "number") {
    return numericIndexGetter;
  } else {
    if (prop.indexOf(".") !== -1) {
      return deepValueGetter;
    } else {
      return shallowValueGetter;
    }
  }
}
function numericIndexGetter(row, index) {
  if (row == null) {
    return "";
  }
  if (!row || index == null) {
    return row;
  }
  const value = row[index];
  if (value == null) {
    return "";
  }
  return value;
}
function shallowValueGetter(obj, fieldName) {
  if (obj == null) {
    return "";
  }
  if (!obj || !fieldName) {
    return obj;
  }
  const value = obj[fieldName];
  if (value == null) {
    return "";
  }
  return value;
}
function deepValueGetter(obj, path) {
  if (obj == null) {
    return "";
  }
  if (!obj || !path) {
    return obj;
  }
  let current = obj[path];
  if (current !== void 0) {
    return current;
  }
  current = obj;
  const split = path.split(".");
  if (split.length) {
    for (let i = 0; i < split.length; i++) {
      current = current[split[i]];
      if (current === void 0 || current === null) {
        return "";
      }
    }
  }
  return current;
}
function optionalGetterForProp(prop) {
  return prop && ((row) => getterForProp(prop)(row, prop));
}
function groupRowsByParents(rows, from, to) {
  if (from && to) {
    const nodeById = {};
    const l = rows.length;
    let node = null;
    nodeById[0] = new TreeNode();
    const uniqIDs = rows.reduce((arr, item) => {
      const toValue = to(item);
      if (arr.indexOf(toValue) === -1) {
        arr.push(toValue);
      }
      return arr;
    }, []);
    for (let i = 0; i < l; i++) {
      nodeById[to(rows[i])] = new TreeNode(rows[i]);
    }
    for (let i = 0; i < l; i++) {
      node = nodeById[to(rows[i])];
      let parent = 0;
      const fromValue = from(node.row);
      if (!!fromValue && uniqIDs.indexOf(fromValue) > -1) {
        parent = fromValue;
      }
      node.parent = nodeById[parent];
      node.row["level"] = node.parent.row["level"] + 1;
      node.parent.children.push(node);
    }
    let resolvedRows = [];
    nodeById[0].flatten(function() {
      resolvedRows = [...resolvedRows, this.row];
    }, true);
    return resolvedRows;
  } else {
    return rows;
  }
}
var TreeNode = class {
  constructor(row = null) {
    if (!row) {
      row = {
        level: -1,
        treeStatus: "expanded"
      };
    }
    this.row = row;
    this.parent = null;
    this.children = [];
  }
  flatten(f, recursive) {
    if (this.row["treeStatus"] === "expanded") {
      for (let i = 0, l = this.children.length; i < l; i++) {
        const child = this.children[i];
        f.apply(child, Array.prototype.slice.call(arguments, 2));
        if (recursive) {
          child.flatten.apply(child, arguments);
        }
      }
    }
  }
};
function camelCase(str) {
  str = str.replace(/[^a-zA-Z0-9 ]/g, " ");
  str = str.replace(/([a-z](?=[A-Z]))/g, "$1 ");
  str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, "").trim().toLowerCase();
  str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function(a, b, c) {
    return b.trim() + c.toUpperCase();
  });
  return str;
}
function deCamelCase(str) {
  return str.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase());
}
function id() {
  return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}
function setColumnDefaults(columns, defaultColumnWidth = 150) {
  if (!columns) {
    return;
  }
  let treeColumnFound = false;
  for (const column of columns) {
    if (!column.$$id) {
      column.$$id = id();
    }
    if (isNullOrUndefined(column.prop) && column.name) {
      column.prop = camelCase(column.name);
    }
    if (!column.$$valueGetter) {
      column.$$valueGetter = getterForProp(column.prop);
    }
    if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
      column.name = deCamelCase(String(column.prop));
    }
    if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
      column.name = "";
    }
    if (!("resizeable" in column)) {
      column.resizeable = true;
    }
    if (!("sortable" in column)) {
      column.sortable = true;
    }
    if (!("draggable" in column)) {
      column.draggable = true;
    }
    if (!("canAutoResize" in column)) {
      column.canAutoResize = true;
    }
    if (!("width" in column)) {
      column.width = defaultColumnWidth;
    }
    if (!("isTreeColumn" in column)) {
      column.isTreeColumn = false;
    } else {
      if (column.isTreeColumn && !treeColumnFound) {
        treeColumnFound = true;
      } else {
        column.isTreeColumn = false;
      }
    }
  }
}
function isNullOrUndefined(value) {
  return value === null || value === void 0;
}
function translateTemplates(templates) {
  const result = [];
  for (const temp of templates) {
    const col = {};
    const props = Object.getOwnPropertyNames(temp);
    for (const prop of props) {
      col[prop] = temp[prop];
    }
    if (temp.headerTemplate) {
      col.headerTemplate = temp.headerTemplate;
    }
    if (temp.cellTemplate) {
      col.cellTemplate = temp.cellTemplate;
    }
    if (temp.ghostCellTemplate) {
      col.ghostCellTemplate = temp.ghostCellTemplate;
    }
    if (temp.summaryFunc) {
      col.summaryFunc = temp.summaryFunc;
    }
    if (temp.summaryTemplate) {
      col.summaryTemplate = temp.summaryTemplate;
    }
    result.push(col);
  }
  return result;
}
var DataTableColumnHeaderDirective = class _DataTableColumnHeaderDirective {
  static ngTemplateContextGuard(directive, context) {
    return true;
  }
  static {
    this.ɵfac = function DataTableColumnHeaderDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableColumnHeaderDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DataTableColumnHeaderDirective,
      selectors: [["", "ngx-datatable-header-template", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableColumnHeaderDirective, [{
    type: Directive,
    args: [{
      selector: "[ngx-datatable-header-template]",
      standalone: true
    }]
  }], null, null);
})();
var DataTableColumnCellDirective = class _DataTableColumnCellDirective {
  constructor() {
    this.template = inject(TemplateRef);
  }
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  static {
    this.ɵfac = function DataTableColumnCellDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableColumnCellDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DataTableColumnCellDirective,
      selectors: [["", "ngx-datatable-cell-template", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableColumnCellDirective, [{
    type: Directive,
    args: [{
      selector: "[ngx-datatable-cell-template]",
      standalone: true
    }]
  }], null, null);
})();
var DataTableColumnCellTreeToggle = class _DataTableColumnCellTreeToggle {
  constructor() {
    this.template = inject(TemplateRef);
  }
  static {
    this.ɵfac = function DataTableColumnCellTreeToggle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableColumnCellTreeToggle)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DataTableColumnCellTreeToggle,
      selectors: [["", "ngx-datatable-tree-toggle", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableColumnCellTreeToggle, [{
    type: Directive,
    args: [{
      selector: "[ngx-datatable-tree-toggle]",
      standalone: true
    }]
  }], null, null);
})();
var ColumnChangesService = class _ColumnChangesService {
  constructor() {
    this.columnInputChanges = new import_rxjs.Subject();
  }
  get columnInputChanges$() {
    return this.columnInputChanges.asObservable();
  }
  onInputChange() {
    this.columnInputChanges.next(void 0);
  }
  static {
    this.ɵfac = function ColumnChangesService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ColumnChangesService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ColumnChangesService,
      factory: _ColumnChangesService.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnChangesService, [{
    type: Injectable
  }], null, null);
})();
var DataTableColumnGhostCellDirective = class _DataTableColumnGhostCellDirective {
  static ngTemplateContextGuard(directive, context) {
    return true;
  }
  static {
    this.ɵfac = function DataTableColumnGhostCellDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableColumnGhostCellDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DataTableColumnGhostCellDirective,
      selectors: [["", "ngx-datatable-ghost-cell-template", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableColumnGhostCellDirective, [{
    type: Directive,
    args: [{
      selector: "[ngx-datatable-ghost-cell-template]",
      standalone: true
    }]
  }], null, null);
})();
var DataTableColumnDirective = class _DataTableColumnDirective {
  constructor() {
    this.columnChangesService = inject(ColumnChangesService);
    this.isFirstChange = true;
  }
  get cellTemplate() {
    return this._cellTemplateInput || this._cellTemplateQuery;
  }
  get headerTemplate() {
    return this._headerTemplateInput || this._headerTemplateQuery;
  }
  get treeToggleTemplate() {
    return this._treeToggleTemplateInput || this._treeToggleTemplateQuery;
  }
  get ghostCellTemplate() {
    return this._ghostCellTemplateInput || this._ghostCellTemplateQuery;
  }
  ngOnChanges() {
    if (this.isFirstChange) {
      this.isFirstChange = false;
    } else {
      this.columnChangesService.onInputChange();
    }
  }
  static {
    this.ɵfac = function DataTableColumnDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableColumnDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DataTableColumnDirective,
      selectors: [["ngx-datatable-column"]],
      contentQueries: function DataTableColumnDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, DataTableColumnCellDirective, 7, TemplateRef);
          ɵɵcontentQuery(dirIndex, DataTableColumnHeaderDirective, 7, TemplateRef);
          ɵɵcontentQuery(dirIndex, DataTableColumnCellTreeToggle, 7, TemplateRef);
          ɵɵcontentQuery(dirIndex, DataTableColumnGhostCellDirective, 7, TemplateRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._cellTemplateQuery = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._headerTemplateQuery = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._treeToggleTemplateQuery = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._ghostCellTemplateQuery = _t.first);
        }
      },
      inputs: {
        name: "name",
        prop: "prop",
        bindAsUnsafeHtml: [2, "bindAsUnsafeHtml", "bindAsUnsafeHtml", booleanAttribute],
        frozenLeft: [2, "frozenLeft", "frozenLeft", booleanAttribute],
        frozenRight: [2, "frozenRight", "frozenRight", booleanAttribute],
        flexGrow: [2, "flexGrow", "flexGrow", numberAttribute],
        resizeable: [2, "resizeable", "resizeable", booleanAttribute],
        comparator: "comparator",
        pipe: "pipe",
        sortable: [2, "sortable", "sortable", booleanAttribute],
        draggable: [2, "draggable", "draggable", booleanAttribute],
        canAutoResize: [2, "canAutoResize", "canAutoResize", booleanAttribute],
        minWidth: [2, "minWidth", "minWidth", numberAttribute],
        width: [2, "width", "width", numberAttribute],
        maxWidth: [2, "maxWidth", "maxWidth", numberAttribute],
        checkboxable: [2, "checkboxable", "checkboxable", booleanAttribute],
        headerCheckboxable: [2, "headerCheckboxable", "headerCheckboxable", booleanAttribute],
        headerClass: "headerClass",
        cellClass: "cellClass",
        isTreeColumn: [2, "isTreeColumn", "isTreeColumn", booleanAttribute],
        treeLevelIndent: "treeLevelIndent",
        summaryFunc: "summaryFunc",
        summaryTemplate: "summaryTemplate",
        _cellTemplateInput: [0, "cellTemplate", "_cellTemplateInput"],
        _headerTemplateInput: [0, "headerTemplate", "_headerTemplateInput"],
        _treeToggleTemplateInput: [0, "treeToggleTemplate", "_treeToggleTemplateInput"],
        _ghostCellTemplateInput: [0, "ghostCellTemplate", "_ghostCellTemplateInput"]
      },
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableColumnDirective, [{
    type: Directive,
    args: [{
      selector: "ngx-datatable-column",
      standalone: true
    }]
  }], null, {
    name: [{
      type: Input
    }],
    prop: [{
      type: Input
    }],
    bindAsUnsafeHtml: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    frozenLeft: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    frozenRight: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    flexGrow: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    resizeable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    comparator: [{
      type: Input
    }],
    pipe: [{
      type: Input
    }],
    sortable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    draggable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    canAutoResize: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    minWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    width: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    maxWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    checkboxable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    headerCheckboxable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    headerClass: [{
      type: Input
    }],
    cellClass: [{
      type: Input
    }],
    isTreeColumn: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    treeLevelIndent: [{
      type: Input
    }],
    summaryFunc: [{
      type: Input
    }],
    summaryTemplate: [{
      type: Input
    }],
    _cellTemplateInput: [{
      type: Input,
      args: ["cellTemplate"]
    }],
    _cellTemplateQuery: [{
      type: ContentChild,
      args: [DataTableColumnCellDirective, {
        read: TemplateRef,
        static: true
      }]
    }],
    _headerTemplateInput: [{
      type: Input,
      args: ["headerTemplate"]
    }],
    _headerTemplateQuery: [{
      type: ContentChild,
      args: [DataTableColumnHeaderDirective, {
        read: TemplateRef,
        static: true
      }]
    }],
    _treeToggleTemplateInput: [{
      type: Input,
      args: ["treeToggleTemplate"]
    }],
    _treeToggleTemplateQuery: [{
      type: ContentChild,
      args: [DataTableColumnCellTreeToggle, {
        read: TemplateRef,
        static: true
      }]
    }],
    _ghostCellTemplateInput: [{
      type: Input,
      args: ["ghostCellTemplate"]
    }],
    _ghostCellTemplateQuery: [{
      type: ContentChild,
      args: [DataTableColumnGhostCellDirective, {
        read: TemplateRef,
        static: true
      }]
    }]
  });
})();
var DatatableRowDetailTemplateDirective = class _DatatableRowDetailTemplateDirective {
  static ngTemplateContextGuard(directive, context) {
    return true;
  }
  static {
    this.ɵfac = function DatatableRowDetailTemplateDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DatatableRowDetailTemplateDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DatatableRowDetailTemplateDirective,
      selectors: [["", "ngx-datatable-row-detail-template", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableRowDetailTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[ngx-datatable-row-detail-template]",
      standalone: true
    }]
  }], null, null);
})();
var DatatableRowDetailDirective = class _DatatableRowDetailDirective {
  constructor() {
    this.rowHeight = 0;
    this.toggle = new EventEmitter();
  }
  get template() {
    return this._templateInput || this._templateQuery;
  }
  /**
   * Toggle the expansion of the row
   */
  toggleExpandRow(row) {
    this.toggle.emit({
      type: "row",
      value: row
    });
  }
  /**
   * API method to expand all the rows.
   */
  expandAllRows() {
    this.toggle.emit({
      type: "all",
      value: true
    });
  }
  /**
   * API method to collapse all the rows.
   */
  collapseAllRows() {
    this.toggle.emit({
      type: "all",
      value: false
    });
  }
  static {
    this.ɵfac = function DatatableRowDetailDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DatatableRowDetailDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DatatableRowDetailDirective,
      selectors: [["ngx-datatable-row-detail"]],
      contentQueries: function DatatableRowDetailDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, DatatableRowDetailTemplateDirective, 7, TemplateRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._templateQuery = _t.first);
        }
      },
      inputs: {
        rowHeight: "rowHeight",
        _templateInput: [0, "template", "_templateInput"]
      },
      outputs: {
        toggle: "toggle"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableRowDetailDirective, [{
    type: Directive,
    args: [{
      selector: "ngx-datatable-row-detail",
      standalone: true
    }]
  }], null, {
    rowHeight: [{
      type: Input
    }],
    _templateInput: [{
      type: Input,
      args: ["template"]
    }],
    _templateQuery: [{
      type: ContentChild,
      args: [DatatableRowDetailTemplateDirective, {
        read: TemplateRef,
        static: true
      }]
    }],
    toggle: [{
      type: Output
    }]
  });
})();
var DatatableFooterDirective = class _DatatableFooterDirective {
  get template() {
    return this._templateInput || this._templateQuery;
  }
  static {
    this.ɵfac = function DatatableFooterDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DatatableFooterDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DatatableFooterDirective,
      selectors: [["ngx-datatable-footer"]],
      contentQueries: function DatatableFooterDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, DataTableFooterTemplateDirective, 5, TemplateRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._templateQuery = _t.first);
        }
      },
      inputs: {
        footerHeight: [2, "footerHeight", "footerHeight", numberAttribute],
        totalMessage: "totalMessage",
        selectedMessage: "selectedMessage",
        pagerLeftArrowIcon: "pagerLeftArrowIcon",
        pagerRightArrowIcon: "pagerRightArrowIcon",
        pagerPreviousIcon: "pagerPreviousIcon",
        pagerNextIcon: "pagerNextIcon",
        _templateInput: [0, "template", "_templateInput"]
      },
      standalone: true,
      features: [ɵɵInputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableFooterDirective, [{
    type: Directive,
    args: [{
      selector: "ngx-datatable-footer",
      standalone: true
    }]
  }], null, {
    footerHeight: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    totalMessage: [{
      type: Input
    }],
    selectedMessage: [{
      type: Input
    }],
    pagerLeftArrowIcon: [{
      type: Input
    }],
    pagerRightArrowIcon: [{
      type: Input
    }],
    pagerPreviousIcon: [{
      type: Input
    }],
    pagerNextIcon: [{
      type: Input
    }],
    _templateInput: [{
      type: Input,
      args: ["template"]
    }],
    _templateQuery: [{
      type: ContentChild,
      args: [DataTableFooterTemplateDirective, {
        read: TemplateRef
      }]
    }]
  });
})();
var ScrollerComponent = class _ScrollerComponent {
  constructor() {
    this.renderer = inject(Renderer2);
    this.scrollbarV = false;
    this.scrollbarH = false;
    this.scroll = new EventEmitter();
    this.scrollYPos = 0;
    this.scrollXPos = 0;
    this.prevScrollYPos = 0;
    this.prevScrollXPos = 0;
    this.element = inject(ElementRef).nativeElement;
    this._scrollEventListener = null;
  }
  ngOnInit() {
    if (this.scrollbarV || this.scrollbarH) {
      const renderer = this.renderer;
      this.parentElement = renderer.parentNode(renderer.parentNode(this.element));
      this._scrollEventListener = this.onScrolled.bind(this);
      this.parentElement.addEventListener("scroll", this._scrollEventListener);
    }
  }
  ngOnDestroy() {
    if (this._scrollEventListener) {
      this.parentElement.removeEventListener("scroll", this._scrollEventListener);
      this._scrollEventListener = null;
    }
  }
  setOffset(offsetY) {
    if (this.parentElement) {
      this.parentElement.scrollTop = offsetY;
    }
  }
  onScrolled(event) {
    const dom = event.currentTarget;
    requestAnimationFrame(() => {
      this.scrollYPos = dom.scrollTop;
      this.scrollXPos = dom.scrollLeft;
      this.updateOffset();
    });
  }
  updateOffset() {
    let direction;
    if (this.scrollYPos < this.prevScrollYPos) {
      direction = "down";
    } else if (this.scrollYPos > this.prevScrollYPos) {
      direction = "up";
    }
    this.scroll.emit({
      direction,
      scrollYPos: this.scrollYPos,
      scrollXPos: this.scrollXPos
    });
    this.prevScrollYPos = this.scrollYPos;
    this.prevScrollXPos = this.scrollXPos;
  }
  static {
    this.ɵfac = function ScrollerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ScrollerComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ScrollerComponent,
      selectors: [["datatable-scroller"]],
      hostAttrs: [1, "datatable-scroll"],
      hostVars: 4,
      hostBindings: function ScrollerComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵstyleProp("height", ctx.scrollHeight, "px")("width", ctx.scrollWidth, "px");
        }
      },
      inputs: {
        scrollbarV: "scrollbarV",
        scrollbarH: "scrollbarH",
        scrollHeight: "scrollHeight",
        scrollWidth: "scrollWidth"
      },
      outputs: {
        scroll: "scroll"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function ScrollerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollerComponent, [{
    type: Component,
    args: [{
      selector: "datatable-scroller",
      template: ` <ng-content></ng-content> `,
      host: {
        class: "datatable-scroll"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], null, {
    scrollbarV: [{
      type: Input
    }],
    scrollbarH: [{
      type: Input
    }],
    scrollHeight: [{
      type: HostBinding,
      args: ["style.height.px"]
    }, {
      type: Input
    }],
    scrollWidth: [{
      type: HostBinding,
      args: ["style.width.px"]
    }, {
      type: Input
    }],
    scroll: [{
      type: Output
    }]
  });
})();
function columnsByPin(cols) {
  const ret = {
    left: [],
    center: [],
    right: []
  };
  if (cols) {
    for (const col of cols) {
      if (col.frozenLeft) {
        ret.left.push(col);
      } else if (col.frozenRight) {
        ret.right.push(col);
      } else {
        ret.center.push(col);
      }
    }
  }
  return ret;
}
function columnGroupWidths(groups, all) {
  return {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: Math.floor(columnTotalWidth(all))
  };
}
function columnTotalWidth(columns, prop) {
  let totalWidth = 0;
  if (columns) {
    for (const c of columns) {
      const has = prop && c[prop];
      const width = has ? c[prop] : c.width;
      totalWidth = totalWidth + parseFloat(width);
    }
  }
  return totalWidth;
}
function columnsTotalWidth(columns, prop) {
  let totalWidth = 0;
  for (const column of columns) {
    const has = prop && column[prop];
    totalWidth = totalWidth + (has ? column[prop] : column.width);
  }
  return totalWidth;
}
function columnsByPinArr(val) {
  const colsByPin = columnsByPin(val);
  return [{
    type: "left",
    columns: colsByPin.left
  }, {
    type: "center",
    columns: colsByPin.center
  }, {
    type: "right",
    columns: colsByPin.right
  }];
}
var RowHeightCache = class {
  constructor() {
    this.treeArray = [];
  }
  /**
   * Clear the Tree array.
   */
  clearCache() {
    this.treeArray = [];
  }
  /**
   * Initialize the Fenwick tree with row Heights.
   *
   * @param rows The array of rows which contain the expanded status.
   * @param rowHeight The row height.
   * @param detailRowHeight The detail row height.
   */
  initCache(details) {
    const {
      rows,
      rowHeight,
      detailRowHeight,
      externalVirtual,
      rowCount,
      rowIndexes,
      rowExpansions
    } = details;
    const isFn = typeof rowHeight === "function";
    const isDetailFn = typeof detailRowHeight === "function";
    if (!isFn && isNaN(rowHeight)) {
      throw new Error(`Row Height cache initialization failed. Please ensure that 'rowHeight' is a
        valid number or function value: (${rowHeight}) when 'scrollbarV' is enabled.`);
    }
    if (!isDetailFn && isNaN(detailRowHeight)) {
      throw new Error(`Row Height cache initialization failed. Please ensure that 'detailRowHeight' is a
        valid number or function value: (${detailRowHeight}) when 'scrollbarV' is enabled.`);
    }
    const n = externalVirtual ? rowCount : rows.length;
    this.treeArray = new Array(n);
    for (let i = 0; i < n; ++i) {
      this.treeArray[i] = 0;
    }
    for (let i = 0; i < n; ++i) {
      const row = rows[i];
      let currentRowHeight = rowHeight;
      if (isFn) {
        currentRowHeight = rowHeight(row);
      }
      const expanded = rowExpansions.has(row);
      if (row && expanded) {
        if (isDetailFn) {
          const index = rowIndexes.get(row);
          currentRowHeight += detailRowHeight(row, index);
        } else {
          currentRowHeight += detailRowHeight;
        }
      }
      this.update(i, currentRowHeight);
    }
  }
  /**
   * Given the ScrollY position i.e. sum, provide the rowIndex
   * that is present in the current view port.  Below handles edge cases.
   */
  getRowIndex(scrollY) {
    if (scrollY === 0) {
      return 0;
    }
    return this.calcRowIndex(scrollY);
  }
  /**
   * When a row is expanded or rowHeight is changed, update the height.  This can
   * be utilized in future when Angular Data table supports dynamic row heights.
   */
  update(atRowIndex, byRowHeight) {
    if (!this.treeArray.length) {
      throw new Error(`Update at index ${atRowIndex} with value ${byRowHeight} failed:
        Row Height cache not initialized.`);
    }
    const n = this.treeArray.length;
    atRowIndex |= 0;
    while (atRowIndex < n) {
      this.treeArray[atRowIndex] += byRowHeight;
      atRowIndex |= atRowIndex + 1;
    }
  }
  /**
   * Range Sum query from 1 to the rowIndex
   */
  query(atIndex) {
    if (!this.treeArray.length) {
      throw new Error(`query at index ${atIndex} failed: Fenwick tree array not initialized.`);
    }
    let sum = 0;
    atIndex |= 0;
    while (atIndex >= 0) {
      sum += this.treeArray[atIndex];
      atIndex = (atIndex & atIndex + 1) - 1;
    }
    return sum;
  }
  /**
   * Find the total height between 2 row indexes
   */
  queryBetween(atIndexA, atIndexB) {
    return this.query(atIndexB) - this.query(atIndexA - 1);
  }
  /**
   * Given the ScrollY position i.e. sum, provide the rowIndex
   * that is present in the current view port.
   */
  calcRowIndex(sum) {
    if (!this.treeArray.length) {
      return 0;
    }
    let pos = -1;
    const dataLength = this.treeArray.length;
    const highestBit = Math.pow(2, dataLength.toString(2).length - 1);
    for (let blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
      const nextPos = pos + blockSize;
      if (nextPos < dataLength && sum >= this.treeArray[nextPos]) {
        sum -= this.treeArray[nextPos];
        pos = nextPos;
      }
    }
    return pos + 1;
  }
};
var Keys;
(function(Keys2) {
  Keys2["up"] = "ArrowUp";
  Keys2["down"] = "ArrowDown";
  Keys2["return"] = "Enter";
  Keys2["escape"] = "Escape";
  Keys2["left"] = "ArrowLeft";
  Keys2["right"] = "ArrowRight";
})(Keys || (Keys = {}));
var SortDirection;
(function(SortDirection2) {
  SortDirection2["asc"] = "asc";
  SortDirection2["desc"] = "desc";
})(SortDirection || (SortDirection = {}));
var SortType;
(function(SortType2) {
  SortType2["single"] = "single";
  SortType2["multi"] = "multi";
})(SortType || (SortType = {}));
var ColumnMode;
(function(ColumnMode2) {
  ColumnMode2["standard"] = "standard";
  ColumnMode2["flex"] = "flex";
  ColumnMode2["force"] = "force";
})(ColumnMode || (ColumnMode = {}));
var ContextmenuType;
(function(ContextmenuType2) {
  ContextmenuType2["header"] = "header";
  ContextmenuType2["body"] = "body";
})(ContextmenuType || (ContextmenuType = {}));
var SelectionType;
(function(SelectionType2) {
  SelectionType2["single"] = "single";
  SelectionType2["multi"] = "multi";
  SelectionType2["multiClick"] = "multiClick";
  SelectionType2["cell"] = "cell";
  SelectionType2["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));
var DataTableGhostLoaderComponent = class _DataTableGhostLoaderComponent {
  static {
    this.ɵfac = function DataTableGhostLoaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableGhostLoaderComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableGhostLoaderComponent,
      selectors: [["ghost-loader"]],
      inputs: {
        columns: "columns",
        pageSize: [2, "pageSize", "pageSize", numberAttribute],
        rowHeight: "rowHeight",
        ghostBodyHeight: [2, "ghostBodyHeight", "ghostBodyHeight", numberAttribute]
      },
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵStandaloneFeature],
      decls: 3,
      vars: 3,
      consts: [[1, "ghost-loader", "ghost-cell-container"], [1, "ghost-element", 3, "height"], [1, "ghost-element"], [1, "line", "ghost-cell-strip", 3, "width"], [3, "ngTemplateOutlet"], [1, "line", "ghost-cell-strip"]],
      template: function DataTableGhostLoaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵrepeaterCreate(1, DataTableGhostLoaderComponent_For_2_Template, 3, 2, "div", 1, ɵɵrepeaterTrackByIdentity);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵstyleProp("height", ctx.ghostBodyHeight + "px");
          ɵɵadvance();
          ɵɵrepeater(ɵɵpureFunction0(2, _c1).constructor(ctx.pageSize));
        }
      },
      dependencies: [NgTemplateOutlet],
      styles: ["@keyframes _ngcontent-%COMP%_ghost{0%{background-position:0vw 0}to{background-position:100vw 0}}.ghost-loader[_ngcontent-%COMP%]{overflow:hidden}.ghost-loader[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{width:100%;height:12px;animation-name:_ngcontent-%COMP%_ghost;animation-iteration-count:infinite;animation-timing-function:linear}.ghost-loader[_ngcontent-%COMP%]   .ghost-element[_ngcontent-%COMP%]{display:flex}.ghost-overlay[_nghost-%COMP%]{position:sticky;top:20px}.ghost-overlay[_nghost-%COMP%]   .ghost-loader[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{margin:.9rem 1.2rem}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableGhostLoaderComponent, [{
    type: Component,
    args: [{
      selector: `ghost-loader`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NgTemplateOutlet],
      template: `<div [style.height]="ghostBodyHeight + 'px'" class="ghost-loader ghost-cell-container">
  @for (item of [].constructor(pageSize); track item) {
    <div [style.height]="rowHeight + 'px'" class="ghost-element">
      @for (col of columns; track col) {
        @if (!col.ghostCellTemplate) {
          <div class="line ghost-cell-strip" [style.width]="col?.width + 'px'"> </div>
        } @else {
          <ng-template [ngTemplateOutlet]="col.ghostCellTemplate"> </ng-template>
        }
      }
    </div>
  }
</div>
`,
      styles: ["@keyframes ghost{0%{background-position:0vw 0}to{background-position:100vw 0}}.ghost-loader{overflow:hidden}.ghost-loader .line{width:100%;height:12px;animation-name:ghost;animation-iteration-count:infinite;animation-timing-function:linear}.ghost-loader .ghost-element{display:flex}:host.ghost-overlay{position:sticky;top:20px}:host.ghost-overlay .ghost-loader .line{margin:.9rem 1.2rem}\n"]
    }]
  }], null, {
    columns: [{
      type: Input
    }],
    pageSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    rowHeight: [{
      type: Input
    }],
    ghostBodyHeight: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var DataTableBodyCellComponent = class _DataTableBodyCellComponent {
  set disable$(val) {
    this._disable$ = val;
    this.cellContext.disable$ = val;
  }
  get disable$() {
    return this._disable$;
  }
  set group(group) {
    this._group = group;
    this.cellContext.group = group;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get group() {
    return this._group;
  }
  set rowHeight(val) {
    this._rowHeight = val;
    this.cellContext.rowHeight = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get rowHeight() {
    return this._rowHeight;
  }
  set isSelected(val) {
    this._isSelected = val;
    this.cellContext.isSelected = val;
    this.cd.markForCheck();
  }
  get isSelected() {
    return this._isSelected;
  }
  set expanded(val) {
    this._expanded = val;
    this.cellContext.expanded = val;
    this.cd.markForCheck();
  }
  get expanded() {
    return this._expanded;
  }
  set rowIndex(val) {
    this._rowIndex = val;
    this.cellContext.rowIndex = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get rowIndex() {
    return this._rowIndex;
  }
  set column(column) {
    this._column = column;
    this.cellContext.column = column;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get column() {
    return this._column;
  }
  set row(row) {
    this._row = row;
    this.cellContext.row = row;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get row() {
    return this._row;
  }
  set sorts(val) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
  }
  get sorts() {
    return this._sorts;
  }
  set treeStatus(status) {
    if (status !== "collapsed" && status !== "expanded" && status !== "loading" && status !== "disabled") {
      this._treeStatus = "collapsed";
    } else {
      this._treeStatus = status;
    }
    this.cellContext.treeStatus = this._treeStatus;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  get treeStatus() {
    return this._treeStatus;
  }
  get columnCssClasses() {
    let cls = "datatable-body-cell";
    if (this.column.cellClass) {
      if (typeof this.column.cellClass === "string") {
        cls += " " + this.column.cellClass;
      } else if (typeof this.column.cellClass === "function") {
        const res = this.column.cellClass({
          row: this.row,
          group: this.group,
          column: this.column,
          value: this.value,
          rowHeight: this.rowHeight
        });
        if (typeof res === "string") {
          cls += " " + res;
        } else if (typeof res === "object") {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) {
              cls += ` ${k}`;
            }
          }
        }
      }
    }
    if (!this.sortDir) {
      cls += " sort-active";
    }
    if (this.isFocused && !this.disable$?.value) {
      cls += " active";
    }
    if (this.sortDir === SortDirection.asc) {
      cls += " sort-asc";
    }
    if (this.sortDir === SortDirection.desc) {
      cls += " sort-desc";
    }
    if (this.disable$?.value) {
      cls += " row-disabled";
    }
    return cls;
  }
  get width() {
    return this.column.width;
  }
  get minWidth() {
    return this.column.minWidth;
  }
  get maxWidth() {
    return this.column.maxWidth;
  }
  get height() {
    const height = this.rowHeight;
    if (isNaN(height)) {
      return height;
    }
    return height + "px";
  }
  constructor() {
    this.cd = inject(ChangeDetectorRef);
    this.ghostLoadingIndicator = false;
    this.activate = new EventEmitter();
    this.treeAction = new EventEmitter();
    this.isFocused = false;
    this._element = inject(ElementRef).nativeElement;
    this.cellContext = {
      onCheckboxChangeFn: (event) => this.onCheckboxChange(event),
      activateFn: (event) => this.activate.emit(event),
      row: this.row,
      group: this.group,
      value: this.value,
      column: this.column,
      rowHeight: this.rowHeight,
      isSelected: this.isSelected,
      rowIndex: this.rowIndex,
      treeStatus: this.treeStatus,
      disable$: this.disable$,
      onTreeAction: () => this.onTreeAction()
    };
  }
  ngDoCheck() {
    this.checkValueUpdates();
  }
  ngOnDestroy() {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
    if (this.ghostLoaderTemplate) {
      this.ghostLoaderTemplate.clear();
    }
  }
  checkValueUpdates() {
    let value = "";
    if (!this.row || !this.column) {
      value = "";
    } else {
      const val = this.column.$$valueGetter(this.row, this.column.prop);
      const userPipe = this.column.pipe;
      if (userPipe) {
        value = userPipe.transform(val);
      } else if (value !== void 0) {
        value = val;
      }
    }
    if (this.value !== value) {
      this.value = value;
      this.cellContext.value = value;
      this.cellContext.disable$ = this.disable$;
      this.sanitizedValue = value !== null && value !== void 0 ? this.stripHtml(value) : value;
      this.cd.markForCheck();
    }
  }
  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
  }
  onClick(event) {
    this.activate.emit({
      type: "click",
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element
    });
  }
  onDblClick(event) {
    this.activate.emit({
      type: "dblclick",
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element
    });
  }
  onKeyDown(event) {
    const key = event.key;
    const isTargetCell = event.target === this._element;
    const isAction = key === Keys.return || key === Keys.down || key === Keys.up || key === Keys.left || key === Keys.right;
    if (isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();
      this.activate.emit({
        type: "keydown",
        event,
        row: this.row,
        group: this.group,
        rowHeight: this.rowHeight,
        column: this.column,
        value: this.value,
        cellElement: this._element
      });
    }
  }
  onCheckboxChange(event) {
    this.activate.emit({
      type: "checkbox",
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element,
      treeStatus: "collapsed"
    });
  }
  calcSortDir(sorts) {
    if (!sorts) {
      return;
    }
    const sort = sorts.find((s) => s.prop === this.column.prop);
    if (sort) {
      return sort.dir;
    }
  }
  stripHtml(html) {
    if (!html.replace) {
      return html;
    }
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }
  onTreeAction() {
    this.treeAction.emit(this.row);
  }
  calcLeftMargin(column, row) {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? row.level * levelIndent : 0;
  }
  static {
    this.ɵfac = function DataTableBodyCellComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableBodyCellComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableBodyCellComponent,
      selectors: [["datatable-body-cell"]],
      viewQuery: function DataTableBodyCellComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c2, 7, ViewContainerRef);
          ɵɵviewQuery(_c3, 7, ViewContainerRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.cellTemplate = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.ghostLoaderTemplate = _t.first);
        }
      },
      hostVars: 10,
      hostBindings: function DataTableBodyCellComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("focus", function DataTableBodyCellComponent_focus_HostBindingHandler() {
            return ctx.onFocus();
          })("blur", function DataTableBodyCellComponent_blur_HostBindingHandler() {
            return ctx.onBlur();
          })("click", function DataTableBodyCellComponent_click_HostBindingHandler($event) {
            return ctx.onClick($event);
          })("dblclick", function DataTableBodyCellComponent_dblclick_HostBindingHandler($event) {
            return ctx.onDblClick($event);
          })("keydown", function DataTableBodyCellComponent_keydown_HostBindingHandler($event) {
            return ctx.onKeyDown($event);
          });
        }
        if (rf & 2) {
          ɵɵclassMap(ctx.columnCssClasses);
          ɵɵstyleProp("width", ctx.width, "px")("min-width", ctx.minWidth, "px")("max-width", ctx.maxWidth, "px")("height", ctx.height);
        }
      },
      inputs: {
        displayCheck: "displayCheck",
        disable$: "disable$",
        group: "group",
        rowHeight: "rowHeight",
        isSelected: "isSelected",
        expanded: "expanded",
        rowIndex: "rowIndex",
        column: "column",
        row: "row",
        sorts: "sorts",
        treeStatus: "treeStatus",
        ghostLoadingIndicator: "ghostLoadingIndicator"
      },
      outputs: {
        activate: "activate",
        treeAction: "treeAction"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 2,
      vars: 1,
      consts: [["cellTemplate", ""], [1, "datatable-body-cell-label", 3, "margin-left"], [1, "datatable-body-cell-label"], [1, "datatable-checkbox"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "checkbox", 3, "click", "disabled", "checked"], [1, "datatable-tree-button", 3, "disabled"], [1, "datatable-tree-button", 3, "click", "disabled"], [1, "icon", "datatable-icon-collapse"], [1, "icon", "datatable-icon-up"], [1, "icon", "datatable-icon-down"], [3, "title", "innerHTML"], [3, "title"], [3, "columns", "pageSize"]],
      template: function DataTableBodyCellComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, DataTableBodyCellComponent_Conditional_0_Template, 5, 5, "div", 1)(1, DataTableBodyCellComponent_Conditional_1_Template, 1, 1);
        }
        if (rf & 2) {
          ɵɵconditional(ctx.row ? 0 : 1);
        }
      },
      dependencies: [NgTemplateOutlet, DataTableGhostLoaderComponent, AsyncPipe],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableBodyCellComponent, [{
    type: Component,
    args: [{
      selector: "datatable-body-cell",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (row) {
    <div class="datatable-body-cell-label" [style.margin-left.px]="calcLeftMargin(column, row)">
      @if (column.checkboxable && (!displayCheck || displayCheck(row, column, value))) {
      <label class="datatable-checkbox">
        <input
          type="checkbox"
          [disabled]="disable$ | async"
          [checked]="isSelected"
          (click)="onCheckboxChange($event)"
        />
      </label>
      } @if (column.isTreeColumn) { @if (!column.treeToggleTemplate) {
      <button
        class="datatable-tree-button"
        [disabled]="treeStatus === 'disabled'"
        (click)="onTreeAction()"
        [attr.aria-label]="treeStatus"
      >
        <span>
          @if (treeStatus === 'loading') {
          <i class="icon datatable-icon-collapse"></i>
          } @if (treeStatus === 'collapsed') {
          <i class="icon datatable-icon-up"></i>
          } @if (treeStatus === 'expanded' || treeStatus === 'disabled') {
          <i class="icon datatable-icon-down"></i>
          }
        </span>
      </button>
      } @else {
      <ng-template
        [ngTemplateOutlet]="column.treeToggleTemplate"
        [ngTemplateOutletContext]="{ cellContext: cellContext }"
      >
      </ng-template>
      } } @if (!column.cellTemplate) { @if (column.bindAsUnsafeHtml) {
      <span [title]="sanitizedValue" [innerHTML]="value"> </span>
      } @else {
      <span [title]="sanitizedValue">{{ value }}</span>
      } } @else {
      <ng-template
        #cellTemplate
        [ngTemplateOutlet]="column.cellTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      }
    </div>
    } @else { @if (ghostLoadingIndicator) {
    <ghost-loader [columns]="[column]" [pageSize]="1"></ghost-loader>
    } }
  `,
      imports: [NgTemplateOutlet, DataTableGhostLoaderComponent, AsyncPipe]
    }]
  }], () => [], {
    displayCheck: [{
      type: Input
    }],
    disable$: [{
      type: Input
    }],
    group: [{
      type: Input
    }],
    rowHeight: [{
      type: Input
    }],
    isSelected: [{
      type: Input
    }],
    expanded: [{
      type: Input
    }],
    rowIndex: [{
      type: Input
    }],
    column: [{
      type: Input
    }],
    row: [{
      type: Input
    }],
    sorts: [{
      type: Input
    }],
    treeStatus: [{
      type: Input
    }],
    ghostLoadingIndicator: [{
      type: Input
    }],
    activate: [{
      type: Output
    }],
    treeAction: [{
      type: Output
    }],
    cellTemplate: [{
      type: ViewChild,
      args: ["cellTemplate", {
        read: ViewContainerRef,
        static: true
      }]
    }],
    ghostLoaderTemplate: [{
      type: ViewChild,
      args: ["ghostLoaderTemplate", {
        read: ViewContainerRef,
        static: true
      }]
    }],
    columnCssClasses: [{
      type: HostBinding,
      args: ["class"]
    }],
    width: [{
      type: HostBinding,
      args: ["style.width.px"]
    }],
    minWidth: [{
      type: HostBinding,
      args: ["style.minWidth.px"]
    }],
    maxWidth: [{
      type: HostBinding,
      args: ["style.maxWidth.px"]
    }],
    height: [{
      type: HostBinding,
      args: ["style.height"]
    }],
    onFocus: [{
      type: HostListener,
      args: ["focus"]
    }],
    onBlur: [{
      type: HostListener,
      args: ["blur"]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    onDblClick: [{
      type: HostListener,
      args: ["dblclick", ["$event"]]
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var DataTableBodyRowComponent = class _DataTableBodyRowComponent {
  constructor() {
    this.cd = inject(ChangeDetectorRef);
    this.treeStatus = "collapsed";
    this.ghostLoadingIndicator = false;
    this.verticalScrollVisible = false;
    this.activate = new EventEmitter();
    this.treeAction = new EventEmitter();
    this._element = inject(ElementRef).nativeElement;
    this._rowDiffer = inject(KeyValueDiffers).find({}).create();
  }
  set columns(val) {
    this._columns = val;
    this.recalculateColumns(val);
  }
  get columns() {
    return this._columns;
  }
  set innerWidth(val) {
    if (this._columns) {
      const colByPin = columnsByPin(this._columns);
      this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
    }
    this._innerWidth = val;
    this.recalculateColumns();
  }
  get innerWidth() {
    return this._innerWidth;
  }
  set offsetX(val) {
    this._offsetX = val;
  }
  get offsetX() {
    return this._offsetX;
  }
  get cssClass() {
    let cls = "datatable-body-row";
    if (this.isSelected) {
      cls += " active";
    }
    if (this.rowIndex % 2 !== 0) {
      cls += " datatable-row-odd";
    }
    if (this.rowIndex % 2 === 0) {
      cls += " datatable-row-even";
    }
    if (this.disable$ && this.disable$.value) {
      cls += " row-disabled";
    }
    if (this.rowClass) {
      const res = this.rowClass(this.row);
      if (typeof res === "string") {
        cls += ` ${res}`;
      } else if (typeof res === "object") {
        const keys = Object.keys(res);
        for (const k of keys) {
          if (res[k] === true) {
            cls += ` ${k}`;
          }
        }
      }
    }
    return cls;
  }
  get columnsTotalWidths() {
    return this._columnGroupWidths.total;
  }
  ngOnChanges(changes) {
    if (changes.verticalScrollVisible) {
      this.recalculateColumns();
    }
  }
  ngDoCheck() {
    if (this._rowDiffer.diff(this.row)) {
      this.cd.markForCheck();
    }
  }
  onActivate(event, index) {
    event.cellIndex = index;
    event.rowElement = this._element;
    this.activate.emit(event);
  }
  onKeyDown(event) {
    const key = event.key;
    const isTargetRow = event.target === this._element;
    const isAction = key === Keys.return || key === Keys.down || key === Keys.up || key === Keys.left || key === Keys.right;
    const isCtrlA = event.key === "a" && (event.ctrlKey || event.metaKey);
    if (isAction && isTargetRow || isCtrlA) {
      event.preventDefault();
      event.stopPropagation();
      this.activate.emit({
        type: "keydown",
        event,
        row: this.row,
        rowElement: this._element
      });
    }
  }
  onMouseenter(event) {
    this.activate.emit({
      type: "mouseenter",
      event,
      row: this.row,
      rowElement: this._element
    });
  }
  recalculateColumns(val = this.columns) {
    this._columns = val;
    const colsByPin = columnsByPin(this._columns);
    this._columnsByPin = columnsByPinArr(this._columns);
    this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
  }
  onTreeAction() {
    this.treeAction.emit();
  }
  static {
    this.ɵfac = function DataTableBodyRowComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableBodyRowComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableBodyRowComponent,
      selectors: [["datatable-body-row"]],
      hostVars: 6,
      hostBindings: function DataTableBodyRowComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("keydown", function DataTableBodyRowComponent_keydown_HostBindingHandler($event) {
            return ctx.onKeyDown($event);
          })("mouseenter", function DataTableBodyRowComponent_mouseenter_HostBindingHandler($event) {
            return ctx.onMouseenter($event);
          });
        }
        if (rf & 2) {
          ɵɵclassMap(ctx.cssClass);
          ɵɵstyleProp("height", ctx.rowHeight, "px")("width", ctx.columnsTotalWidths, "px");
        }
      },
      inputs: {
        columns: "columns",
        innerWidth: "innerWidth",
        expanded: "expanded",
        rowClass: "rowClass",
        row: "row",
        group: "group",
        isSelected: "isSelected",
        rowIndex: "rowIndex",
        displayCheck: "displayCheck",
        treeStatus: "treeStatus",
        ghostLoadingIndicator: "ghostLoadingIndicator",
        verticalScrollVisible: "verticalScrollVisible",
        disable$: "disable$",
        offsetX: "offsetX",
        rowHeight: "rowHeight"
      },
      outputs: {
        activate: "activate",
        treeAction: "treeAction"
      },
      standalone: true,
      features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 2,
      vars: 0,
      consts: [[3, "class", "width", "row-disabled"], ["role", "cell", "tabindex", "-1", 3, "row", "group", "expanded", "isSelected", "rowIndex", "column", "rowHeight", "displayCheck", "disable$", "treeStatus", "ghostLoadingIndicator"], ["role", "cell", "tabindex", "-1", 3, "activate", "treeAction", "row", "group", "expanded", "isSelected", "rowIndex", "column", "rowHeight", "displayCheck", "disable$", "treeStatus", "ghostLoadingIndicator"]],
      template: function DataTableBodyRowComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵrepeaterCreate(0, DataTableBodyRowComponent_For_1_Template, 4, 9, "div", 0, _forTrack0);
        }
        if (rf & 2) {
          ɵɵrepeater(ctx._columnsByPin);
        }
      },
      dependencies: [DataTableBodyCellComponent, AsyncPipe],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableBodyRowComponent, [{
    type: Component,
    args: [{
      selector: "datatable-body-row",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @for (colGroup of _columnsByPin; track colGroup.type; let i = $index) {
    <div
      class="datatable-row-{{ colGroup.type }} datatable-row-group"
      [style.width.px]="_columnGroupWidths[colGroup.type]"
      [class.row-disabled]="disable$ ? (disable$ | async) : false"
    >
      @for (column of colGroup.columns; track column.$$id; let ii = $index) {
      <datatable-body-cell
        role="cell"
        tabindex="-1"
        [row]="row"
        [group]="group"
        [expanded]="expanded"
        [isSelected]="isSelected"
        [rowIndex]="rowIndex"
        [column]="column"
        [rowHeight]="rowHeight"
        [displayCheck]="displayCheck"
        [disable$]="disable$"
        [treeStatus]="treeStatus"
        [ghostLoadingIndicator]="ghostLoadingIndicator"
        (activate)="onActivate($event, ii)"
        (treeAction)="onTreeAction()"
      >
      </datatable-body-cell>
      }
    </div>
    }
  `,
      imports: [DataTableBodyCellComponent, AsyncPipe]
    }]
  }], null, {
    columns: [{
      type: Input
    }],
    innerWidth: [{
      type: Input
    }],
    expanded: [{
      type: Input
    }],
    rowClass: [{
      type: Input
    }],
    row: [{
      type: Input
    }],
    group: [{
      type: Input
    }],
    isSelected: [{
      type: Input
    }],
    rowIndex: [{
      type: Input
    }],
    displayCheck: [{
      type: Input
    }],
    treeStatus: [{
      type: Input
    }],
    ghostLoadingIndicator: [{
      type: Input
    }],
    verticalScrollVisible: [{
      type: Input
    }],
    disable$: [{
      type: Input
    }],
    offsetX: [{
      type: Input
    }],
    cssClass: [{
      type: HostBinding,
      args: ["class"]
    }],
    rowHeight: [{
      type: HostBinding,
      args: ["style.height.px"]
    }, {
      type: Input
    }],
    columnsTotalWidths: [{
      type: HostBinding,
      args: ["style.width.px"]
    }],
    activate: [{
      type: Output
    }],
    treeAction: [{
      type: Output
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }],
    onMouseenter: [{
      type: HostListener,
      args: ["mouseenter", ["$event"]]
    }]
  });
})();
var DraggableDirective = class _DraggableDirective {
  constructor() {
    this.dragX = true;
    this.dragY = true;
    this.dragStart = new EventEmitter();
    this.dragging = new EventEmitter();
    this.dragEnd = new EventEmitter();
    this.element = inject(ElementRef).nativeElement;
    this.isDragging = false;
  }
  ngOnChanges(changes) {
    if (changes.dragEventTarget && changes.dragEventTarget.currentValue && this.dragModel.dragging) {
      this.onMousedown(changes.dragEventTarget.currentValue);
    }
  }
  ngOnDestroy() {
    this._destroySubscription();
  }
  onMouseup(event) {
    if (!this.isDragging) {
      return;
    }
    this.isDragging = false;
    this.element.classList.remove("dragging");
    if (this.subscription) {
      this._destroySubscription();
      this.dragEnd.emit({
        event,
        element: this.element,
        model: this.dragModel
      });
    }
  }
  onMousedown(event) {
    const isDragElm = event.target.classList.contains("draggable");
    if (isDragElm && (this.dragX || this.dragY)) {
      event.preventDefault();
      this.isDragging = true;
      const mouseDownPos = {
        x: event.clientX,
        y: event.clientY
      };
      const mouseup = (0, import_rxjs.fromEvent)(document, "mouseup");
      this.subscription = mouseup.subscribe((ev) => this.onMouseup(ev));
      const mouseMoveSub = (0, import_rxjs.fromEvent)(document, "mousemove").pipe((0, import_operators.takeUntil)(mouseup)).subscribe((ev) => this.move(ev, mouseDownPos));
      this.subscription.add(mouseMoveSub);
      this.dragStart.emit({
        event,
        element: this.element,
        model: this.dragModel
      });
    }
  }
  move(event, mouseDownPos) {
    if (!this.isDragging) {
      return;
    }
    const x = event.clientX - mouseDownPos.x;
    const y = event.clientY - mouseDownPos.y;
    if (this.dragX) {
      this.element.style.left = `${x}px`;
    }
    if (this.dragY) {
      this.element.style.top = `${y}px`;
    }
    this.element.classList.add("dragging");
    this.dragging.emit({
      event,
      element: this.element,
      model: this.dragModel
    });
  }
  _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = void 0;
    }
  }
  static {
    this.ɵfac = function DraggableDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DraggableDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DraggableDirective,
      selectors: [["", "draggable", ""]],
      inputs: {
        dragEventTarget: "dragEventTarget",
        dragModel: "dragModel",
        dragX: [2, "dragX", "dragX", booleanAttribute],
        dragY: [2, "dragY", "dragY", booleanAttribute]
      },
      outputs: {
        dragStart: "dragStart",
        dragging: "dragging",
        dragEnd: "dragEnd"
      },
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DraggableDirective, [{
    type: Directive,
    args: [{
      selector: "[draggable]",
      standalone: true
    }]
  }], null, {
    dragEventTarget: [{
      type: Input
    }],
    dragModel: [{
      type: Input
    }],
    dragX: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dragY: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dragStart: [{
      type: Output
    }],
    dragging: [{
      type: Output
    }],
    dragEnd: [{
      type: Output
    }]
  });
})();
var DatatableRowDefComponent = class _DatatableRowDefComponent {
  constructor() {
    this.rowDef = inject(RowDefToken);
  }
  static {
    this.ɵfac = function DatatableRowDefComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DatatableRowDefComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DatatableRowDefComponent,
      selectors: [["datatable-row-def"]],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 1,
      vars: 1,
      consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"]],
      template: function DatatableRowDefComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, DatatableRowDefComponent_Conditional_0_Template, 1, 2, "ng-container", 0);
        }
        if (rf & 2) {
          ɵɵconditional(ctx.rowDef.rowDefInternal.rowTemplate ? 0 : -1);
        }
      },
      dependencies: [NgTemplateOutlet],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableRowDefComponent, [{
    type: Component,
    args: [{
      selector: "datatable-row-def",
      template: `@if (rowDef.rowDefInternal.rowTemplate) {
    <ng-container
      [ngTemplateOutlet]="rowDef.rowDefInternal.rowTemplate"
      [ngTemplateOutletContext]="rowDef"
    />
  }`,
      imports: [NgTemplateOutlet]
    }]
  }], null, null);
})();
var DatatableRowDefDirective = class _DatatableRowDefDirective {
  static ngTemplateContextGuard(_dir, ctx) {
    return true;
  }
  static {
    this.ɵfac = function DatatableRowDefDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DatatableRowDefDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DatatableRowDefDirective,
      selectors: [["", "rowDef", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableRowDefDirective, [{
    type: Directive,
    args: [{
      selector: "[rowDef]",
      standalone: true
    }]
  }], null, null);
})();
var DatatableRowDefInternalDirective = class _DatatableRowDefInternalDirective {
  constructor() {
    this.vc = inject(ViewContainerRef);
  }
  ngOnInit() {
    this.vc.createEmbeddedView(this.rowDefInternal.template, __spreadValues({}, this.rowDefInternal), {
      injector: Injector.create({
        providers: [{
          provide: RowDefToken,
          useValue: this
        }]
      })
    });
  }
  static {
    this.ɵfac = function DatatableRowDefInternalDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DatatableRowDefInternalDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DatatableRowDefInternalDirective,
      selectors: [["", "rowDefInternal", ""]],
      inputs: {
        rowDefInternal: "rowDefInternal"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableRowDefInternalDirective, [{
    type: Directive,
    args: [{
      selector: "[rowDefInternal]",
      standalone: true
    }]
  }], null, {
    rowDefInternal: [{
      type: Input
    }]
  });
})();
var RowDefToken = new InjectionToken("RowDef");
var DatatableComponentToken = new InjectionToken("DatatableComponentToken");
var DataTableRowWrapperComponent = class _DataTableRowWrapperComponent {
  constructor() {
    this.rowContextmenu = new EventEmitter(false);
    this.selectedGroupRows = signal([]);
    this.expanded = false;
    this.rowDiffer = inject(KeyValueDiffers).find({}).create();
    this.iterableDiffers = inject(IterableDiffers);
    this.tableComponent = inject(DatatableComponentToken);
    this.cd = inject(ChangeDetectorRef);
    this.group = computed(() => {
      if (typeof this.row === "object" && "value" in this.row) {
        return this.row;
      }
    });
  }
  ngOnInit() {
    if (this.disableCheck) {
      const isRowDisabled = this.disableCheck(this.row);
      this.disable$ = new import_rxjs.BehaviorSubject(isRowDisabled);
      this.rowContext.disableRow$ = this.disable$;
    }
    this.selectedRowsDiffer = this.iterableDiffers.find(this.selected ?? []).create();
  }
  ngOnChanges(changes) {
    if (changes["row"]) {
      if (this.isGroup(this.row)) {
        this.groupContext = {
          group: this.row,
          expanded: this.expanded,
          rowIndex: this.rowIndex
        };
      } else {
        this.rowContext = {
          row: this.row,
          expanded: this.expanded,
          rowIndex: this.rowIndex,
          disableRow$: this.disable$
        };
      }
    }
    if (changes["rowIndex"]) {
      (this.rowContext ?? this.groupContext).rowIndex = this.rowIndex;
    }
    if (changes["expanded"]) {
      (this.groupContext ?? this.rowContext).expanded = this.expanded;
      if (this.rowContext) {
        this.rowContext.expanded = this.expanded;
      }
    }
  }
  ngDoCheck() {
    if (this.disableCheck) {
      const isRowDisabled = this.disableCheck(this.row);
      if (isRowDisabled !== this.disable$.value) {
        this.disable$.next(isRowDisabled);
        this.cd.markForCheck();
      }
    }
    if (this.rowDiffer.diff(this.row)) {
      if (this.isGroup(this.row)) {
        this.groupContext.group = this.row;
      } else {
        this.rowContext.row = this.row;
      }
      this.cd.markForCheck();
    }
    if (this.groupHeader?.checkboxable && this.selectedRowsDiffer.diff(this.selected)) {
      const selectedRows = this.selected.filter((row) => this.group()?.value.find((item) => item === row));
      if (this.checkBoxInput) {
        if (selectedRows.length && selectedRows.length !== this.group()?.value.length) {
          this.checkBoxInput.nativeElement.indeterminate = true;
        } else {
          this.checkBoxInput.nativeElement.indeterminate = false;
        }
      }
      this.selectedGroupRows.set(selectedRows);
    }
  }
  onContextmenu($event) {
    this.rowContextmenu.emit({
      event: $event,
      row: this.row
    });
  }
  onCheckboxChange(groupSelected) {
    this.selected = [...this.selected.filter((row) => !this.group().value.find((item) => item === row))];
    if (groupSelected) {
      this.selected = [...this.selected, ...this.group().value];
    }
    this.tableComponent.selected = [...this.selected];
    this.tableComponent.onBodySelect({
      selected: this.selected
    });
  }
  isGroup(row) {
    return !!this.groupHeader;
  }
  static {
    this.ɵfac = function DataTableRowWrapperComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableRowWrapperComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableRowWrapperComponent,
      selectors: [["datatable-row-wrapper"]],
      viewQuery: function DataTableRowWrapperComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c6, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.checkBoxInput = _t.first);
        }
      },
      hostAttrs: [1, "datatable-row-wrapper"],
      hostBindings: function DataTableRowWrapperComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("contextmenu", function DataTableRowWrapperComponent_contextmenu_HostBindingHandler($event) {
            return ctx.onContextmenu($event);
          });
        }
      },
      inputs: {
        innerWidth: "innerWidth",
        rowDetail: "rowDetail",
        groupHeader: "groupHeader",
        offsetX: "offsetX",
        detailRowHeight: "detailRowHeight",
        groupHeaderRowHeight: "groupHeaderRowHeight",
        row: "row",
        groupedRows: "groupedRows",
        disableCheck: "disableCheck",
        selected: "selected",
        rowIndex: "rowIndex",
        expanded: [2, "expanded", "expanded", booleanAttribute]
      },
      outputs: {
        rowContextmenu: "rowContextmenu"
      },
      standalone: true,
      features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      ngContentSelectors: _c0,
      decls: 3,
      vars: 3,
      consts: [["select", ""], [1, "datatable-group-header", 3, "height", "width"], [1, "datatable-row-detail", 3, "height"], [1, "datatable-group-header"], [1, "datatable-group-cell"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "datatable-checkbox"], ["type", "checkbox", 3, "change", "checked"], [1, "datatable-row-detail"]],
      template: function DataTableRowWrapperComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵtemplate(0, DataTableRowWrapperComponent_Conditional_0_Template, 4, 7, "div", 1)(1, DataTableRowWrapperComponent_Conditional_1_Template, 1, 0)(2, DataTableRowWrapperComponent_Conditional_2_Template, 2, 4, "div", 2);
        }
        if (rf & 2) {
          ɵɵconditional((ctx.groupHeader == null ? null : ctx.groupHeader.template) ? 0 : -1);
          ɵɵadvance();
          ɵɵconditional((ctx.groupHeader == null ? null : ctx.groupHeader.template) && ctx.expanded || !ctx.groupHeader || !ctx.groupHeader.template ? 1 : -1);
          ɵɵadvance();
          ɵɵconditional((ctx.rowDetail == null ? null : ctx.rowDetail.template) && ctx.expanded ? 2 : -1);
        }
      },
      dependencies: [NgTemplateOutlet],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableRowWrapperComponent, [{
    type: Component,
    args: [{
      selector: "datatable-row-wrapper",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (groupHeader?.template) {
    <div
      class="datatable-group-header"
      [style.height.px]="groupHeaderRowHeight"
      [style.width.px]="innerWidth"
    >
      <div class="datatable-group-cell">
        @if (groupHeader.checkboxable) {
        <div>
          <label class="datatable-checkbox">
            <input
              #select
              type="checkbox"
              [checked]="selectedGroupRows().length === group().value.length"
              (change)="onCheckboxChange(select.checked)"
            />
          </label>
        </div>
        }
        <ng-template
          [ngTemplateOutlet]="groupHeader.template"
          [ngTemplateOutletContext]="groupContext"
        >
        </ng-template>
      </div>
    </div>
    } @if ((groupHeader?.template && expanded) || !groupHeader || !groupHeader.template) {
    <ng-content> </ng-content>
    } @if (rowDetail?.template && expanded) {
    <div [style.height.px]="detailRowHeight" class="datatable-row-detail">
      <ng-template [ngTemplateOutlet]="rowDetail.template" [ngTemplateOutletContext]="rowContext">
      </ng-template>
    </div>
    }
  `,
      host: {
        class: "datatable-row-wrapper"
      },
      imports: [NgTemplateOutlet]
    }]
  }], null, {
    checkBoxInput: [{
      type: ViewChild,
      args: ["select"]
    }],
    innerWidth: [{
      type: Input
    }],
    rowDetail: [{
      type: Input
    }],
    groupHeader: [{
      type: Input
    }],
    offsetX: [{
      type: Input
    }],
    detailRowHeight: [{
      type: Input
    }],
    groupHeaderRowHeight: [{
      type: Input
    }],
    row: [{
      type: Input
    }],
    groupedRows: [{
      type: Input
    }],
    disableCheck: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    rowContextmenu: [{
      type: Output
    }],
    rowIndex: [{
      type: Input
    }],
    expanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onContextmenu: [{
      type: HostListener,
      args: ["contextmenu", ["$event"]]
    }]
  });
})();
function defaultSumFunc(cells) {
  const cellsWithValues = cells.filter((cell) => !!cell);
  if (!cellsWithValues.length) {
    return null;
  }
  if (cellsWithValues.some((cell) => typeof cell !== "number")) {
    return null;
  }
  return cellsWithValues.reduce((res, cell) => res + cell);
}
function noopSumFunc(cells) {
  return null;
}
var DataTableSummaryRowComponent = class _DataTableSummaryRowComponent {
  constructor() {
    this.summaryRow = {};
  }
  ngOnChanges() {
    if (!this.columns || !this.rows) {
      return;
    }
    this.updateInternalColumns();
    this.updateValues();
  }
  updateInternalColumns() {
    this._internalColumns = this.columns.map((col) => __spreadProps(__spreadValues({}, col), {
      cellTemplate: col.summaryTemplate
    }));
  }
  updateValues() {
    this.summaryRow = {};
    this.columns.filter((col) => !col.summaryTemplate).forEach((col) => {
      const cellsFromSingleColumn = this.rows.map((row) => row[col.prop]);
      const sumFunc = this.getSummaryFunction(col);
      this.summaryRow[col.prop] = col.pipe ? col.pipe.transform(sumFunc(cellsFromSingleColumn)) : sumFunc(cellsFromSingleColumn);
    });
  }
  getSummaryFunction(column) {
    if (column.summaryFunc === void 0) {
      return defaultSumFunc;
    } else if (column.summaryFunc === null) {
      return noopSumFunc;
    } else {
      return column.summaryFunc;
    }
  }
  static {
    this.ɵfac = function DataTableSummaryRowComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableSummaryRowComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableSummaryRowComponent,
      selectors: [["datatable-summary-row"]],
      hostAttrs: [1, "datatable-summary-row"],
      inputs: {
        rows: "rows",
        columns: "columns",
        rowHeight: "rowHeight",
        offsetX: "offsetX",
        innerWidth: "innerWidth"
      },
      standalone: true,
      features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 1,
      vars: 1,
      consts: [["tabindex", "-1", 3, "innerWidth", "offsetX", "columns", "rowHeight", "row", "rowIndex"]],
      template: function DataTableSummaryRowComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵtemplate(0, DataTableSummaryRowComponent_Conditional_0_Template, 1, 6, "datatable-body-row", 0);
        }
        if (rf & 2) {
          ɵɵconditional(ctx.summaryRow && ctx._internalColumns ? 0 : -1);
        }
      },
      dependencies: [DataTableBodyRowComponent],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableSummaryRowComponent, [{
    type: Component,
    args: [{
      selector: "datatable-summary-row",
      template: `
    @if (summaryRow && _internalColumns) {
    <datatable-body-row
      tabindex="-1"
      [innerWidth]="innerWidth"
      [offsetX]="offsetX"
      [columns]="_internalColumns"
      [rowHeight]="rowHeight"
      [row]="summaryRow"
      [rowIndex]="-1"
    >
    </datatable-body-row>
    }
  `,
      host: {
        class: "datatable-summary-row"
      },
      imports: [DataTableBodyRowComponent]
    }]
  }], null, {
    rows: [{
      type: Input
    }],
    columns: [{
      type: Input
    }],
    rowHeight: [{
      type: Input
    }],
    offsetX: [{
      type: Input
    }],
    innerWidth: [{
      type: Input
    }]
  });
})();
function selectRows(selected, row, comparefn) {
  const selectedIndex = comparefn(row, selected);
  if (selectedIndex > -1) {
    selected.splice(selectedIndex, 1);
  } else {
    selected.push(row);
  }
  return selected;
}
function selectRowsBetween(selected, rows, index, prevIndex) {
  const reverse = index < prevIndex;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const greater = i >= prevIndex && i <= index;
    const lesser = i <= prevIndex && i >= index;
    let range = {
      start: 0,
      end: 0
    };
    if (reverse) {
      range = {
        start: index,
        end: prevIndex
      };
    } else {
      range = {
        start: prevIndex,
        end: index + 1
      };
    }
    if (reverse && lesser || !reverse && greater) {
      if (i >= range.start && i <= range.end) {
        selected.push(row);
      }
    }
  }
  return selected;
}
var DataTableSelectionComponent = class _DataTableSelectionComponent {
  constructor() {
    this.activate = new EventEmitter();
    this.select = new EventEmitter();
  }
  selectRow(event, index, row) {
    if (!this.selectEnabled) {
      return;
    }
    const chkbox = this.selectionType === SelectionType.checkbox;
    const multi = this.selectionType === SelectionType.multi;
    const multiClick = this.selectionType === SelectionType.multiClick;
    let selected = [];
    if (multi || chkbox || multiClick) {
      if (event.shiftKey) {
        selected = selectRowsBetween([], this.rows, index, this.prevIndex);
      } else if (event.key === "a" && (event.ctrlKey || event.metaKey)) {
        selected = this.rows.filter((rowItem) => !!rowItem);
      } else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
        selected = selectRows([...this.selected], row, this.getRowSelectedIdx.bind(this));
      } else {
        selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
      }
    } else {
      selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
    }
    if (typeof this.selectCheck === "function") {
      selected = selected.filter(this.selectCheck.bind(this));
    }
    if (typeof this.disableCheck === "function") {
      selected = selected.filter((rowData) => !this.disableCheck(rowData));
    }
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.prevIndex = index;
    this.select.emit({
      selected
    });
  }
  onActivate(model, index) {
    const {
      type,
      event,
      row
    } = model;
    const chkbox = this.selectionType === SelectionType.checkbox;
    const select = !chkbox && (type === "click" || type === "dblclick") || chkbox && type === "checkbox";
    if (select) {
      this.selectRow(event, index, row);
    } else if (type === "keydown") {
      if (event.key === Keys.return) {
        this.selectRow(event, index, row);
      } else if (event.key === "a" && (event.ctrlKey || event.metaKey)) {
        this.selectRow(event, 0, this.rows[this.rows.length - 1]);
      } else {
        this.onKeyboardFocus(model);
      }
    }
    this.activate.emit(model);
  }
  onKeyboardFocus(model) {
    const {
      key
    } = model.event;
    const shouldFocus = key === Keys.up || key === Keys.down || key === Keys.right || key === Keys.left;
    if (shouldFocus) {
      const isCellSelection = this.selectionType === SelectionType.cell;
      if (typeof this.disableCheck === "function") {
        const isRowDisabled = this.disableCheck(model.row);
        if (isRowDisabled) {
          return;
        }
      }
      if (!model.cellElement || !isCellSelection) {
        this.focusRow(model.rowElement, key);
      } else if (isCellSelection) {
        this.focusCell(model.cellElement, model.rowElement, key, model.cellIndex);
      }
    }
  }
  focusRow(rowElement, key) {
    const nextRowElement = this.getPrevNextRow(rowElement, key);
    if (nextRowElement) {
      nextRowElement.focus();
    }
  }
  getPrevNextRow(rowElement, key) {
    const parentElement = rowElement.parentElement;
    if (parentElement) {
      let focusElement;
      if (key === Keys.up) {
        focusElement = parentElement.previousElementSibling;
      } else if (key === Keys.down) {
        focusElement = parentElement.nextElementSibling;
      }
      if (focusElement && focusElement.children.length) {
        return focusElement.children[0];
      }
    }
  }
  focusCell(cellElement, rowElement, key, cellIndex) {
    let nextCellElement;
    if (key === Keys.left) {
      nextCellElement = cellElement.previousElementSibling;
    } else if (key === Keys.right) {
      nextCellElement = cellElement.nextElementSibling;
    } else if (key === Keys.up || key === Keys.down) {
      const nextRowElement = this.getPrevNextRow(rowElement, key);
      if (nextRowElement) {
        const children = nextRowElement.getElementsByClassName("datatable-body-cell");
        if (children.length) {
          nextCellElement = children[cellIndex];
        }
      }
    }
    if (nextCellElement && "focus" in nextCellElement && typeof nextCellElement.focus === "function") {
      nextCellElement.focus();
    }
  }
  getRowSelected(row) {
    return this.getRowSelectedIdx(row, this.selected) > -1;
  }
  getRowSelectedIdx(row, selected) {
    if (!selected || !selected.length) {
      return -1;
    }
    const rowId = this.rowIdentity(row);
    return selected.findIndex((r) => {
      const id2 = this.rowIdentity(r);
      return id2 === rowId;
    });
  }
  static {
    this.ɵfac = function DataTableSelectionComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableSelectionComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableSelectionComponent,
      selectors: [["datatable-selection"]],
      inputs: {
        rows: "rows",
        selected: "selected",
        selectEnabled: "selectEnabled",
        selectionType: "selectionType",
        rowIdentity: "rowIdentity",
        selectCheck: "selectCheck",
        disableCheck: "disableCheck"
      },
      outputs: {
        activate: "activate",
        select: "select"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function DataTableSelectionComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableSelectionComponent, [{
    type: Component,
    args: [{
      selector: "datatable-selection",
      template: ` <ng-content></ng-content> `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], null, {
    rows: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    selectEnabled: [{
      type: Input
    }],
    selectionType: [{
      type: Input
    }],
    rowIdentity: [{
      type: Input
    }],
    selectCheck: [{
      type: Input
    }],
    disableCheck: [{
      type: Input
    }],
    activate: [{
      type: Output
    }],
    select: [{
      type: Output
    }]
  });
})();
var DataTableBodyComponent = class _DataTableBodyComponent {
  set pageSize(val) {
    if (val !== this._pageSize) {
      this._pageSize = val;
      this.recalcLayout();
      this._offsetEvent = -1;
      this.updatePage("up");
      this.updatePage("down");
    }
  }
  get pageSize() {
    return this._pageSize;
  }
  set rows(val) {
    if (val !== this._rows) {
      this._rows = val;
      this.recalcLayout();
    }
  }
  get rows() {
    return this._rows;
  }
  set columns(val) {
    if (val !== this._columns) {
      this._columns = val;
      this.updateColumnGroupWidths();
    }
  }
  get columns() {
    return this._columns;
  }
  set offset(val) {
    if (val !== this._offset) {
      this._offset = val;
      if (!this.scrollbarV || this.scrollbarV && !this.virtualization) {
        if (!isNaN(this._offset) && this.ghostLoadingIndicator) {
          this.rows = [];
        }
        this.recalcLayout();
      }
    }
  }
  get offset() {
    return this._offset;
  }
  set rowCount(val) {
    if (val !== this._rowCount) {
      this._rowCount = val;
      this.recalcLayout();
    }
  }
  get rowCount() {
    return this._rowCount;
  }
  get bodyWidth() {
    if (this.scrollbarH) {
      return this.innerWidth + "px";
    } else {
      return "100%";
    }
  }
  set bodyHeight(val) {
    if (this.scrollbarV) {
      this._bodyHeight = val + "px";
    } else {
      this._bodyHeight = "auto";
    }
    this.recalcLayout();
  }
  get bodyHeight() {
    return this._bodyHeight;
  }
  /**
   * Returns if selection is enabled.
   */
  get selectEnabled() {
    return !!this.selectionType;
  }
  /**
   * Creates an instance of DataTableBodyComponent.
   */
  constructor() {
    this.cd = inject(ChangeDetectorRef);
    this.selected = [];
    this.verticalScrollVisible = false;
    this.scroll = new EventEmitter();
    this.page = new EventEmitter();
    this.activate = new EventEmitter();
    this.select = new EventEmitter();
    this.detailToggle = new EventEmitter();
    this.rowContextmenu = new EventEmitter(false);
    this.treeAction = new EventEmitter();
    this.scrollHeight = computed(() => {
      if (this.rowHeightsCache() && this.scrollbarV && this.virtualization && this.rowCount) {
        return this.rowHeightsCache().query(this.rowCount - 1);
      }
      return void 0;
    });
    this.rowsToRender = computed(() => {
      return this.updateRows();
    });
    this.rowHeightsCache = signal(new RowHeightCache());
    this.offsetY = 0;
    this.indexes = signal({
      first: 0,
      last: 0
    });
    this.rowIndexes = /* @__PURE__ */ new WeakMap();
    this.rowExpansions = [];
    this._offsetEvent = -1;
    this.getDetailRowHeight = (row, index) => {
      if (!this.rowDetail) {
        return 0;
      }
      const rowHeight = this.rowDetail.rowHeight;
      return typeof rowHeight === "function" ? rowHeight(row, index) : rowHeight;
    };
    this.getGroupHeaderRowHeight = (row, index) => {
      if (!this.groupHeader) {
        return 0;
      }
      const rowHeight = this.groupHeader?.rowHeight === 0 ? this.rowHeight : this.groupHeader?.rowHeight;
      return typeof rowHeight === "function" ? rowHeight(row, index) : rowHeight;
    };
    this.rowsStyles = computed(() => {
      const rowsStyles = [];
      this.rowsToRender().forEach((rows, index) => {
        const styles = {};
        if (this.groupedRows) {
          styles.width = this.columnGroupWidths.total;
        }
        if (this.scrollbarV && this.virtualization) {
          let idx = 0;
          if (Array.isArray(rows)) {
            const row = rows[rows.length - 1];
            idx = row ? this.getRowIndex(row) : 0;
          } else {
            if (rows) {
              idx = this.getRowIndex(rows);
            } else {
              idx = this.indexes().first + index;
            }
          }
          styles.transform = `translateY(${this.rowHeightsCache().query(idx - 1)}px)`;
        }
        rowsStyles.push(styles);
      });
      return rowsStyles;
    });
    this.bottomSummaryRowsStyles = computed(() => {
      if (!this.scrollbarV || !this.rows || !this.rows.length || !this.rowsToRender()) {
        return null;
      }
      const pos = this.rowHeightsCache().query(this.rows.length - 1);
      return {
        transform: `translateY(${pos}px)`,
        position: "absolute"
      };
    });
    this.rowTrackingFn = (index, row) => {
      if (this.ghostLoadingIndicator) {
        return index;
      }
      if (this.trackByProp) {
        return row[this.trackByProp];
      } else {
        const idx = this.getRowIndex(row);
        return idx;
      }
    };
  }
  /**
   * Called after the constructor, initializing input properties
   */
  ngOnInit() {
    if (this.rowDetail) {
      this.listener = this.rowDetail.toggle.subscribe(({
        type,
        value
      }) => this.toggleStateChange(type, value));
    }
    if (this.groupHeader) {
      this.listener = this.groupHeader.toggle.subscribe(({
        type,
        value
      }) => {
        this.groupExpansionDefault = false;
        this.toggleStateChange(type, value);
      });
    }
  }
  toggleStateChange(type, value) {
    if (type === "group" || type === "row") {
      this.toggleRowExpansion(value);
    }
    if (type === "all") {
      this.toggleAllRows(value);
    }
    this.updateIndexes();
    this.cd.markForCheck();
  }
  /**
   * Called once, before the instance is destroyed.
   */
  ngOnDestroy() {
    if (this.rowDetail || this.groupHeader) {
      this.listener.unsubscribe();
    }
  }
  /**
   * Updates the Y offset given a new offset.
   */
  updateOffsetY(offset) {
    if (!this.scroller) {
      return;
    }
    if (this.scrollbarV && this.virtualization && offset) {
      const rowIndex = this.pageSize * offset;
      offset = this.rowHeightsCache().query(rowIndex - 1);
    } else if (this.scrollbarV && !this.virtualization) {
      offset = 0;
    }
    this.scroller.setOffset(offset || 0);
  }
  /**
   * Body was scrolled, this is mainly useful for
   * when a user is server-side pagination via virtual scroll.
   */
  onBodyScroll(event) {
    const scrollYPos = event.scrollYPos;
    const scrollXPos = event.scrollXPos;
    if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
      this.scroll.emit({
        offsetY: scrollYPos,
        offsetX: scrollXPos
      });
    }
    this.offsetY = scrollYPos;
    this.offsetX = scrollXPos;
    this.updateIndexes();
    this.updatePage(event.direction);
    this.cd.detectChanges();
  }
  /**
   * Updates the page given a direction.
   */
  updatePage(direction) {
    let offset = this.indexes().first / this.pageSize;
    const scrollInBetween = !Number.isInteger(offset);
    if (direction === "up") {
      offset = Math.ceil(offset);
    } else if (direction === "down") {
      offset = Math.floor(offset);
    }
    if (direction !== void 0 && !isNaN(offset) && offset !== this._offsetEvent) {
      this._offsetEvent = offset;
      if (scrollInBetween && this.scrollbarV && this.virtualization && this.externalPaging) {
        const upRow = this.rows[this.indexes().first - 1];
        if (!upRow && direction === "up") {
          this.page.emit(offset - 1);
        }
        const downRow = this.rows[this.indexes().first + this.pageSize];
        if (!downRow && direction === "down") {
          this.page.emit(offset + 1);
        }
      }
      this.page.emit(offset);
    }
  }
  /**
   * Updates the rows in the view port
   */
  updateRows() {
    const {
      first,
      last
    } = this.indexes();
    let rowIndex = first;
    let idx = 0;
    const temp = [];
    if (this.groupedRows) {
      while (rowIndex < last && rowIndex < this.groupedRows.length) {
        const group = this.groupedRows[rowIndex];
        this.rowIndexes.set(group, rowIndex);
        if (group.value) {
          group.value.forEach((g, i) => {
            const _idx = `${rowIndex}-${i}`;
            this.rowIndexes.set(g, _idx);
          });
        }
        temp[idx] = group;
        idx++;
        rowIndex++;
      }
    } else {
      while (rowIndex < last && rowIndex < this.rowCount) {
        const row = this.rows[rowIndex];
        if (row) {
          this.rowIndexes.set(row, rowIndex);
          temp[idx] = row;
        } else if (this.ghostLoadingIndicator && this.virtualization) {
          temp[idx] = void 0;
        }
        idx++;
        rowIndex++;
      }
    }
    return temp;
  }
  /**
   * Get the row height
   */
  getRowHeight(row) {
    if (typeof this.rowHeight === "function") {
      return this.rowHeight(row);
    }
    return this.rowHeight;
  }
  /**
   * @param group the group with all rows
   */
  getGroupHeight(group) {
    let rowHeight = 0;
    if (group.value) {
      for (let index = 0; index < group.value.length; index++) {
        rowHeight += this.getRowAndDetailHeight(group.value[index]);
      }
    }
    return rowHeight;
  }
  /**
   * Calculate row height based on the expanded state of the row.
   */
  getRowAndDetailHeight(row) {
    let rowHeight = this.getRowHeight(row);
    const expanded = this.getRowExpanded(row);
    if (expanded) {
      rowHeight += this.getDetailRowHeight(row);
    }
    return rowHeight;
  }
  /**
   * Updates the index of the rows in the viewport
   */
  updateIndexes() {
    let first = 0;
    let last = 0;
    if (this.scrollbarV) {
      if (this.virtualization) {
        const height = parseInt(this._bodyHeight, 10);
        first = this.rowHeightsCache().getRowIndex(this.offsetY);
        last = this.rowHeightsCache().getRowIndex(height + this.offsetY) + 1;
      } else {
        first = 0;
        last = this.rowCount;
      }
    } else {
      if (!this.externalPaging) {
        first = Math.max(this.offset * this.pageSize, 0);
      }
      last = Math.min(first + this.pageSize, this.rowCount);
    }
    this.indexes.set({
      first,
      last
    });
  }
  /**
   * Refreshes the full Row Height cache.  Should be used
   * when the entire row array state has changed.
   */
  refreshRowHeightCache() {
    if (!this.scrollbarV || this.scrollbarV && !this.virtualization) {
      return;
    }
    this.rowHeightsCache().clearCache();
    if (this.rows && this.rows.length) {
      const rowExpansions = /* @__PURE__ */ new Set();
      if (this.rowDetail) {
        for (const row of this.rows) {
          if (this.getRowExpanded(row)) {
            rowExpansions.add(row);
          }
        }
      }
      this.rowHeightsCache().initCache({
        rows: this.rows,
        rowHeight: this.rowHeight,
        detailRowHeight: this.getDetailRowHeight,
        externalVirtual: this.scrollbarV && this.externalPaging,
        rowCount: this.rowCount,
        rowIndexes: this.rowIndexes,
        rowExpansions
      });
      this.rowHeightsCache.set(Object.create(this.rowHeightsCache()));
    }
  }
  /**
   * Gets the index for the view port
   */
  getAdjustedViewPortIndex() {
    const viewPortFirstRowIndex = this.indexes().first;
    if (this.scrollbarV && this.virtualization) {
      const offsetScroll = this.rowHeightsCache().query(viewPortFirstRowIndex - 1);
      return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
    }
    return viewPortFirstRowIndex;
  }
  /**
   * Toggle the Expansion of the row i.e. if the row is expanded then it will
   * collapse and vice versa.   Note that the expanded status is stored as
   * a part of the row object itself as we have to preserve the expanded row
   * status in case of sorting and filtering of the row set.
   */
  toggleRowExpansion(row) {
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
    const rowExpandedIdx = this.getRowExpandedIdx(row, this.rowExpansions);
    const expanded = rowExpandedIdx > -1;
    if (this.scrollbarV && this.virtualization) {
      const detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
      const idx = this.getRowIndex(row);
      this.rowHeightsCache().update(idx, detailRowHeight);
    }
    if (expanded) {
      this.rowExpansions.splice(rowExpandedIdx, 1);
    } else {
      this.rowExpansions.push(row);
    }
    this.detailToggle.emit({
      rows: [row],
      currentIndex: viewPortFirstRowIndex
    });
  }
  /**
   * Expand/Collapse all the rows no matter what their state is.
   */
  toggleAllRows(expanded) {
    this.rowExpansions = [];
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
    const rows = this.groupedRows ?? this.rows;
    if (expanded) {
      for (const row of rows) {
        this.rowExpansions.push(row);
      }
    }
    if (this.scrollbarV) {
      this.recalcLayout();
    }
    this.detailToggle.emit({
      rows,
      currentIndex: viewPortFirstRowIndex
    });
  }
  /**
   * Recalculates the table
   */
  recalcLayout() {
    this.refreshRowHeightCache();
    this.updateIndexes();
  }
  /**
   * Returns if the row was expanded and set default row expansion when row expansion is empty
   */
  getRowExpanded(row) {
    if (this.rowExpansions.length === 0 && this.groupExpansionDefault) {
      for (const group of this.groupedRows) {
        this.rowExpansions.push(group);
      }
    }
    return this.getRowExpandedIdx(row, this.rowExpansions) > -1;
  }
  getRowExpandedIdx(row, expanded) {
    if (!expanded || !expanded.length) {
      return -1;
    }
    const rowId = this.rowIdentity(row);
    return expanded.findIndex((r) => {
      const id2 = this.rowIdentity(r);
      return id2 === rowId;
    });
  }
  /**
   * Gets the row index given a row
   */
  getRowIndex(row) {
    return this.rowIndexes.get(row) || 0;
  }
  onTreeAction(row) {
    this.treeAction.emit({
      row
    });
  }
  dragOver(event, dropRow) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement,
      eventType: "dragover",
      dragRow: this._draggedRow,
      dropRow
    });
  }
  drag(event, dragRow, rowComponent) {
    this._draggedRow = dragRow;
    this._draggedRowElement = rowComponent._element;
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement,
      eventType: "dragstart",
      dragRow
    });
  }
  drop(event, dropRow, rowComponent) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement,
      targetElement: rowComponent._element,
      eventType: "drop",
      dragRow: this._draggedRow,
      dropRow
    });
  }
  dragEnter(event, dropRow, rowComponent) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement,
      targetElement: rowComponent._element,
      eventType: "dragenter",
      dragRow: this._draggedRow,
      dropRow
    });
  }
  dragLeave(event, dropRow, rowComponent) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement,
      targetElement: rowComponent._element,
      eventType: "dragleave",
      dragRow: this._draggedRow,
      dropRow
    });
  }
  dragEnd(event, dragRow) {
    event.preventDefault();
    this.rowDragEvents.emit({
      event,
      srcElement: this._draggedRowElement,
      eventType: "dragend",
      dragRow
    });
    this._draggedRow = void 0;
    this._draggedRowElement = void 0;
  }
  updateColumnGroupWidths() {
    const colsByPin = columnsByPin(this._columns);
    this.columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
  }
  isGroup(row) {
    return !!this.groupedRows;
  }
  isRow(row) {
    return !this.groupedRows;
  }
  static {
    this.ɵfac = function DataTableBodyComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableBodyComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableBodyComponent,
      selectors: [["datatable-body"]],
      viewQuery: function DataTableBodyComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(ScrollerComponent, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scroller = _t.first);
        }
      },
      hostAttrs: [1, "datatable-body"],
      hostVars: 4,
      hostBindings: function DataTableBodyComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵstyleProp("width", ctx.bodyWidth)("height", ctx.bodyHeight);
        }
      },
      inputs: {
        rowDefTemplate: "rowDefTemplate",
        scrollbarV: "scrollbarV",
        scrollbarH: "scrollbarH",
        loadingIndicator: "loadingIndicator",
        ghostLoadingIndicator: "ghostLoadingIndicator",
        externalPaging: "externalPaging",
        rowHeight: "rowHeight",
        offsetX: "offsetX",
        selectionType: "selectionType",
        selected: "selected",
        rowIdentity: "rowIdentity",
        rowDetail: "rowDetail",
        groupHeader: "groupHeader",
        selectCheck: "selectCheck",
        displayCheck: "displayCheck",
        trackByProp: "trackByProp",
        rowClass: "rowClass",
        groupedRows: "groupedRows",
        groupExpansionDefault: "groupExpansionDefault",
        innerWidth: "innerWidth",
        groupRowsBy: "groupRowsBy",
        virtualization: "virtualization",
        summaryRow: "summaryRow",
        summaryPosition: "summaryPosition",
        summaryHeight: "summaryHeight",
        rowDraggable: "rowDraggable",
        rowDragEvents: "rowDragEvents",
        disableRowCheck: "disableRowCheck",
        pageSize: "pageSize",
        rows: "rows",
        columns: "columns",
        offset: "offset",
        rowCount: "rowCount",
        bodyHeight: "bodyHeight",
        verticalScrollVisible: "verticalScrollVisible"
      },
      outputs: {
        scroll: "scroll",
        page: "page",
        activate: "activate",
        select: "select",
        detailToggle: "detailToggle",
        rowContextmenu: "rowContextmenu",
        treeAction: "treeAction"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      ngContentSelectors: _c8,
      decls: 6,
      vars: 11,
      consts: [["selector", ""], ["rowWrapper", ""], ["bodyRow", ""], ["rowElement", ""], [1, "custom-loading-indicator-wrapper"], [1, "ghost-overlay", 3, "columns", "pageSize", "rowHeight", "ghostBodyHeight"], [3, "select", "activate", "selected", "rows", "selectCheck", "disableCheck", "selectEnabled", "selectionType", "rowIdentity"], [3, "scrollbarV", "scrollbarH", "scrollHeight", "scrollWidth"], [3, "scrollbarV", "scrollbarH", "scrollHeight", "width"], [1, "custom-loading-content"], [3, "scroll", "scrollbarV", "scrollbarH", "scrollHeight", "scrollWidth"], [3, "rowHeight", "offsetX", "innerWidth", "rows", "columns"], [3, "groupedRows", "innerWidth", "ngStyle", "rowDetail", "groupHeader", "offsetX", "detailRowHeight", "groupHeaderRowHeight", "row", "disableCheck", "expanded", "rowIndex", "selected"], ["role", "row", 3, "ngStyle", "rowHeight", "offsetX", "innerWidth", "rows", "columns"], [3, "rowContextmenu", "groupedRows", "innerWidth", "ngStyle", "rowDetail", "groupHeader", "offsetX", "detailRowHeight", "groupHeaderRowHeight", "row", "disableCheck", "expanded", "rowIndex", "selected"], [4, "rowDefInternal"], ["role", "row", "tabindex", "-1", 3, "disable$", "isSelected", "innerWidth", "offsetX", "columns", "rowHeight", "row", "rowIndex", "expanded", "rowClass", "displayCheck", "treeStatus", "ghostLoadingIndicator", "draggable", "verticalScrollVisible"], ["role", "row", "tabindex", "-1", 3, "treeAction", "activate", "drop", "dragover", "dragenter", "dragleave", "dragstart", "dragend", "disable$", "isSelected", "innerWidth", "offsetX", "columns", "rowHeight", "row", "rowIndex", "expanded", "rowClass", "displayCheck", "treeStatus", "ghostLoadingIndicator", "draggable", "verticalScrollVisible"], ["role", "row", "tabindex", "-1", 3, "disable$", "isSelected", "innerWidth", "offsetX", "columns", "rowHeight", "row", "group", "rowIndex", "expanded", "rowClass", "ghostLoadingIndicator", "draggable", "verticalScrollVisible"], ["role", "row", "tabindex", "-1", 3, "activate", "drop", "dragover", "dragenter", "dragleave", "dragstart", "dragend", "disable$", "isSelected", "innerWidth", "offsetX", "columns", "rowHeight", "row", "group", "rowIndex", "expanded", "rowClass", "ghostLoadingIndicator", "draggable", "verticalScrollVisible"], [3, "scroll", "scrollbarV", "scrollbarH", "scrollHeight"]],
      template: function DataTableBodyComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = ɵɵgetCurrentView();
          ɵɵprojectionDef(_c7);
          ɵɵtemplate(0, DataTableBodyComponent_Conditional_0_Template, 3, 0, "div", 4)(1, DataTableBodyComponent_Conditional_1_Template, 1, 4, "ghost-loader", 5);
          ɵɵelementStart(2, "datatable-selection", 6, 0);
          ɵɵlistener("select", function DataTableBodyComponent_Template_datatable_selection_select_2_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.select.emit($event));
          })("activate", function DataTableBodyComponent_Template_datatable_selection_activate_2_listener($event) {
            ɵɵrestoreView(_r1);
            return ɵɵresetView(ctx.activate.emit($event));
          });
          ɵɵtemplate(4, DataTableBodyComponent_Conditional_4_Template, 5, 6, "datatable-scroller", 7)(5, DataTableBodyComponent_Conditional_5_Template, 2, 5, "datatable-scroller", 8);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵconditional(ctx.loadingIndicator ? 0 : -1);
          ɵɵadvance();
          ɵɵconditional(ctx.ghostLoadingIndicator && (!ctx.rowCount || !ctx.virtualization || !ctx.scrollbarV) ? 1 : -1);
          ɵɵadvance();
          ɵɵproperty("selected", ctx.selected)("rows", ctx.rows)("selectCheck", ctx.selectCheck)("disableCheck", ctx.disableRowCheck)("selectEnabled", ctx.selectEnabled)("selectionType", ctx.selectionType)("rowIdentity", ctx.rowIdentity);
          ɵɵadvance(2);
          ɵɵconditional((ctx.rows == null ? null : ctx.rows.length) ? 4 : -1);
          ɵɵadvance();
          ɵɵconditional(!(ctx.rows == null ? null : ctx.rows.length) && !ctx.loadingIndicator && !ctx.ghostLoadingIndicator ? 5 : -1);
        }
      },
      dependencies: [DataTableGhostLoaderComponent, DataTableSelectionComponent, ScrollerComponent, DataTableSummaryRowComponent, DataTableRowWrapperComponent, NgStyle, DatatableRowDefInternalDirective, DataTableBodyRowComponent, DraggableDirective],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableBodyComponent, [{
    type: Component,
    args: [{
      selector: "datatable-body",
      template: `
    @if (loadingIndicator) {
      <div class="custom-loading-indicator-wrapper">
        <div class="custom-loading-content">
          <ng-content select="[loading-indicator]"></ng-content>
        </div>
      </div>
    }
    @if (ghostLoadingIndicator && (!rowCount || !virtualization || !scrollbarV)) {
      <ghost-loader
        class="ghost-overlay"
        [columns]="columns"
        [pageSize]="pageSize"
        [rowHeight]="rowHeight"
        [ghostBodyHeight]="bodyHeight"
      >
      </ghost-loader>
    }
    <datatable-selection
      #selector
      [selected]="selected"
      [rows]="rows"
      [selectCheck]="selectCheck"
      [disableCheck]="disableRowCheck"
      [selectEnabled]="selectEnabled"
      [selectionType]="selectionType"
      [rowIdentity]="rowIdentity"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)"
    >
      @if (rows?.length) {
        <datatable-scroller
          [scrollbarV]="scrollbarV"
          [scrollbarH]="scrollbarH"
          [scrollHeight]="scrollHeight()"
          [scrollWidth]="columnGroupWidths?.total"
          (scroll)="onBodyScroll($event)"
        >
          @if (summaryRow && summaryPosition === 'top') {
            <datatable-summary-row
              [rowHeight]="summaryHeight"
              [offsetX]="offsetX"
              [innerWidth]="innerWidth"
              [rows]="rows"
              [columns]="columns"
            >
            </datatable-summary-row>
          }
          @for (group of rowsToRender(); track rowTrackingFn(i, group); let i = $index) {
            <datatable-row-wrapper
              #rowWrapper
              [attr.hidden]="
                ghostLoadingIndicator && (!rowCount || !virtualization || !scrollbarV) ? true : null
              "
              [groupedRows]="groupedRows"
              [innerWidth]="innerWidth"
              [ngStyle]="rowsStyles()[i]"
              [rowDetail]="rowDetail"
              [groupHeader]="groupHeader"
              [offsetX]="offsetX"
              [detailRowHeight]="getDetailRowHeight(group && group[i], i)"
              [groupHeaderRowHeight]="getGroupHeaderRowHeight(group && group[i], i)"
              [row]="group"
              [disableCheck]="disableRowCheck"
              [expanded]="getRowExpanded(group)"
              [rowIndex]="getRowIndex(group && group[i])"
              [selected]="selected"
              (rowContextmenu)="rowContextmenu.emit($event)"
            >
              @if (rowDefTemplate) {
                <ng-container
                  *rowDefInternal="{
                    template: rowDefTemplate,
                    rowTemplate: bodyRow,
                    row: group,
                    index: i
                  }"
                />
              } @else {
                @if (isRow(group)) {
                  <datatable-body-row
                    role="row"
                    tabindex="-1"
                    #rowElement
                    [disable$]="rowWrapper.disable$"
                    [isSelected]="selector.getRowSelected(group)"
                    [innerWidth]="innerWidth"
                    [offsetX]="offsetX"
                    [columns]="columns"
                    [rowHeight]="getRowHeight(group)"
                    [row]="group"
                    [rowIndex]="getRowIndex(group)"
                    [expanded]="getRowExpanded(group)"
                    [rowClass]="rowClass"
                    [displayCheck]="displayCheck"
                    [treeStatus]="group?.treeStatus"
                    [ghostLoadingIndicator]="ghostLoadingIndicator"
                    [draggable]="rowDraggable"
                    [verticalScrollVisible]="verticalScrollVisible"
                    (treeAction)="onTreeAction(group)"
                    (activate)="selector.onActivate($event, indexes().first + i)"
                    (drop)="drop($event, group, rowElement)"
                    (dragover)="dragOver($event, group)"
                    (dragenter)="dragEnter($event, group, rowElement)"
                    (dragleave)="dragLeave($event, group, rowElement)"
                    (dragstart)="drag($event, group, rowElement)"
                    (dragend)="dragEnd($event, group)"
                  >
                  </datatable-body-row>
                }
              }

              <ng-template #bodyRow>
                @if (isRow(group)) {
                  <datatable-body-row
                    role="row"
                    tabindex="-1"
                    #rowElement
                    [disable$]="rowWrapper.disable$"
                    [isSelected]="selector.getRowSelected(group)"
                    [innerWidth]="innerWidth"
                    [offsetX]="offsetX"
                    [columns]="columns"
                    [rowHeight]="getRowHeight(group)"
                    [row]="group"
                    [rowIndex]="getRowIndex(group)"
                    [expanded]="getRowExpanded(group)"
                    [rowClass]="rowClass"
                    [displayCheck]="displayCheck"
                    [treeStatus]="group?.treeStatus"
                    [ghostLoadingIndicator]="ghostLoadingIndicator"
                    [draggable]="rowDraggable"
                    [verticalScrollVisible]="verticalScrollVisible"
                    (treeAction)="onTreeAction(group)"
                    (activate)="selector.onActivate($event, indexes().first + i)"
                    (drop)="drop($event, group, rowElement)"
                    (dragover)="dragOver($event, group)"
                    (dragenter)="dragEnter($event, group, rowElement)"
                    (dragleave)="dragLeave($event, group, rowElement)"
                    (dragstart)="drag($event, group, rowElement)"
                    (dragend)="dragEnd($event, group)"
                  >
                  </datatable-body-row>
                }
              </ng-template>

              @if (isGroup(group)) {
                <!-- The row typecast is due to angular compiler acting weird. It is obvious that it is of type TRow, but the compiler does not understand. -->
                @for (row of group.value; track rowTrackingFn(i, row); let i = $index) {
                  <datatable-body-row
                    role="row"
                    [disable$]="rowWrapper.disable$"
                    tabindex="-1"
                    #rowElement
                    [isSelected]="selector.getRowSelected(row)"
                    [innerWidth]="innerWidth"
                    [offsetX]="offsetX"
                    [columns]="columns"
                    [rowHeight]="getRowHeight(row)"
                    [row]="row"
                    [group]="group.value"
                    [rowIndex]="getRowIndex(row)"
                    [expanded]="getRowExpanded(row)"
                    [rowClass]="rowClass"
                    [ghostLoadingIndicator]="ghostLoadingIndicator"
                    [draggable]="rowDraggable"
                    [verticalScrollVisible]="verticalScrollVisible"
                    (activate)="selector.onActivate($event, i)"
                    (drop)="drop($event, row, rowElement)"
                    (dragover)="dragOver($event, row)"
                    (dragenter)="dragEnter($event, row, rowElement)"
                    (dragleave)="dragLeave($event, row, rowElement)"
                    (dragstart)="drag($event, row, rowElement)"
                    (dragend)="dragEnd($event, row)"
                  >
                  </datatable-body-row>
                }
              }
            </datatable-row-wrapper>
          }
          @if (summaryRow && summaryPosition === 'bottom') {
            <datatable-summary-row
              role="row"
              [ngStyle]="bottomSummaryRowsStyles()"
              [rowHeight]="summaryHeight"
              [offsetX]="offsetX"
              [innerWidth]="innerWidth"
              [rows]="rows"
              [columns]="columns"
            >
            </datatable-summary-row>
          }
        </datatable-scroller>
      }
      @if (!rows?.length && !loadingIndicator && !ghostLoadingIndicator) {
        <datatable-scroller
          [scrollbarV]="scrollbarV"
          [scrollbarH]="scrollbarH"
          [scrollHeight]="scrollHeight()"
          [style.width]="scrollbarH ? columnGroupWidths?.total + 'px' : '100%'"
          (scroll)="onBodyScroll($event)"
        >
          <ng-content select="[empty-content]"></ng-content
        ></datatable-scroller>
      }
    </datatable-selection>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        class: "datatable-body"
      },
      imports: [DataTableGhostLoaderComponent, DataTableSelectionComponent, ScrollerComponent, DataTableSummaryRowComponent, DataTableRowWrapperComponent, NgStyle, DatatableRowDefInternalDirective, DataTableBodyRowComponent, DraggableDirective]
    }]
  }], () => [], {
    rowDefTemplate: [{
      type: Input
    }],
    scrollbarV: [{
      type: Input
    }],
    scrollbarH: [{
      type: Input
    }],
    loadingIndicator: [{
      type: Input
    }],
    ghostLoadingIndicator: [{
      type: Input
    }],
    externalPaging: [{
      type: Input
    }],
    rowHeight: [{
      type: Input
    }],
    offsetX: [{
      type: Input
    }],
    selectionType: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    rowIdentity: [{
      type: Input
    }],
    rowDetail: [{
      type: Input
    }],
    groupHeader: [{
      type: Input
    }],
    selectCheck: [{
      type: Input
    }],
    displayCheck: [{
      type: Input
    }],
    trackByProp: [{
      type: Input
    }],
    rowClass: [{
      type: Input
    }],
    groupedRows: [{
      type: Input
    }],
    groupExpansionDefault: [{
      type: Input
    }],
    innerWidth: [{
      type: Input
    }],
    groupRowsBy: [{
      type: Input
    }],
    virtualization: [{
      type: Input
    }],
    summaryRow: [{
      type: Input
    }],
    summaryPosition: [{
      type: Input
    }],
    summaryHeight: [{
      type: Input
    }],
    rowDraggable: [{
      type: Input
    }],
    rowDragEvents: [{
      type: Input
    }],
    disableRowCheck: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    rows: [{
      type: Input
    }],
    columns: [{
      type: Input
    }],
    offset: [{
      type: Input
    }],
    rowCount: [{
      type: Input
    }],
    bodyWidth: [{
      type: HostBinding,
      args: ["style.width"]
    }],
    bodyHeight: [{
      type: Input
    }, {
      type: HostBinding,
      args: ["style.height"]
    }],
    verticalScrollVisible: [{
      type: Input
    }],
    scroll: [{
      type: Output
    }],
    page: [{
      type: Output
    }],
    activate: [{
      type: Output
    }],
    select: [{
      type: Output
    }],
    detailToggle: [{
      type: Output
    }],
    rowContextmenu: [{
      type: Output
    }],
    treeAction: [{
      type: Output
    }],
    scroller: [{
      type: ViewChild,
      args: [ScrollerComponent]
    }]
  });
})();
var ScrollbarHelper = class _ScrollbarHelper {
  constructor() {
    this.document = inject(DOCUMENT);
    this.width = this.getWidth();
  }
  getWidth() {
    const outer = this.document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    this.document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    const inner = this.document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
  }
  static {
    this.ɵfac = function ScrollbarHelper_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ScrollbarHelper)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ScrollbarHelper,
      factory: _ScrollbarHelper.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarHelper, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var LongPressDirective = class _LongPressDirective {
  constructor() {
    this.pressEnabled = true;
    this.duration = 500;
    this.longPressStart = new EventEmitter();
    this.longPressing = new EventEmitter();
    this.longPressEnd = new EventEmitter();
    this.mouseX = 0;
    this.mouseY = 0;
  }
  get press() {
    return this.pressing;
  }
  get isLongPress() {
    return this.isLongPressing;
  }
  onMouseDown(event) {
    if (event.which !== 1 || !this.pressEnabled) {
      return;
    }
    const target = event.target;
    if (target.classList.contains("resize-handle")) {
      return;
    }
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.pressing = true;
    this.isLongPressing = false;
    const mouseup = (0, import_rxjs.fromEvent)(document, "mouseup");
    this.subscription = mouseup.subscribe((ev) => this.onMouseup());
    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPressStart.emit({
        event,
        model: this.pressModel
      });
      this.subscription.add((0, import_rxjs.fromEvent)(document, "mousemove").pipe((0, import_operators.takeUntil)(mouseup)).subscribe((mouseEvent) => this.onMouseMove(mouseEvent)));
      this.loop(event);
    }, this.duration);
    this.loop(event);
  }
  onMouseMove(event) {
    if (this.pressing && !this.isLongPressing) {
      const xThres = Math.abs(event.clientX - this.mouseX) > 10;
      const yThres = Math.abs(event.clientY - this.mouseY) > 10;
      if (xThres || yThres) {
        this.endPress();
      }
    }
  }
  loop(event) {
    if (this.isLongPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit({
          event,
          model: this.pressModel
        });
        this.loop(event);
      }, 50);
    }
  }
  endPress() {
    clearTimeout(this.timeout);
    this.isLongPressing = false;
    this.pressing = false;
    this._destroySubscription();
    this.longPressEnd.emit({
      model: this.pressModel
    });
  }
  onMouseup() {
    this.endPress();
  }
  ngOnDestroy() {
    clearTimeout(this.timeout);
    this._destroySubscription();
  }
  _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = void 0;
    }
  }
  static {
    this.ɵfac = function LongPressDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LongPressDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _LongPressDirective,
      selectors: [["", "long-press", ""]],
      hostVars: 4,
      hostBindings: function LongPressDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mousedown", function LongPressDirective_mousedown_HostBindingHandler($event) {
            return ctx.onMouseDown($event);
          });
        }
        if (rf & 2) {
          ɵɵclassProp("press", ctx.press)("longpress", ctx.isLongPress);
        }
      },
      inputs: {
        pressEnabled: [2, "pressEnabled", "pressEnabled", booleanAttribute],
        pressModel: "pressModel",
        duration: [2, "duration", "duration", numberAttribute]
      },
      outputs: {
        longPressStart: "longPressStart",
        longPressing: "longPressing",
        longPressEnd: "longPressEnd"
      },
      standalone: true,
      features: [ɵɵInputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LongPressDirective, [{
    type: Directive,
    args: [{
      selector: "[long-press]",
      standalone: true
    }]
  }], null, {
    pressEnabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    pressModel: [{
      type: Input
    }],
    duration: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    longPressStart: [{
      type: Output
    }],
    longPressing: [{
      type: Output
    }],
    longPressEnd: [{
      type: Output
    }],
    press: [{
      type: HostBinding,
      args: ["class.press"]
    }],
    isLongPress: [{
      type: HostBinding,
      args: ["class.longpress"]
    }],
    onMouseDown: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }]
  });
})();
var ResizeableDirective = class _ResizeableDirective {
  constructor() {
    this.renderer = inject(Renderer2);
    this.resizeEnabled = true;
    this.resize = new EventEmitter();
    this.resizing = new EventEmitter();
    this.element = inject(ElementRef).nativeElement;
  }
  ngAfterViewInit() {
    const renderer2 = this.renderer;
    this.resizeHandle = renderer2.createElement("span");
    if (this.resizeEnabled) {
      renderer2.addClass(this.resizeHandle, "resize-handle");
    } else {
      renderer2.addClass(this.resizeHandle, "resize-handle--not-resizable");
    }
    renderer2.appendChild(this.element, this.resizeHandle);
  }
  ngOnDestroy() {
    this._destroySubscription();
    if (this.renderer.destroyNode) {
      this.renderer.destroyNode(this.resizeHandle);
    } else if (this.resizeHandle) {
      this.renderer.removeChild(this.renderer.parentNode(this.resizeHandle), this.resizeHandle);
    }
  }
  onMouseup() {
    if (this.subscription && !this.subscription.closed) {
      this._destroySubscription();
      this.resize.emit(this.element.clientWidth);
    }
  }
  onMousedown(event) {
    const isHandle = event.target.classList.contains("resize-handle");
    const initialWidth = this.element.clientWidth;
    const mouseDownScreenX = event.screenX;
    if (isHandle) {
      event.stopPropagation();
      const mouseup = (0, import_rxjs.fromEvent)(document, "mouseup");
      this.subscription = mouseup.subscribe((ev) => this.onMouseup());
      const mouseMoveSub = (0, import_rxjs.fromEvent)(document, "mousemove").pipe((0, import_operators.takeUntil)(mouseup)).subscribe((e) => this.move(e, initialWidth, mouseDownScreenX));
      this.subscription.add(mouseMoveSub);
    }
  }
  move(event, initialWidth, mouseDownScreenX) {
    const movementX = event.screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;
    this.resizing.emit(newWidth);
  }
  _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = void 0;
    }
  }
  static {
    this.ɵfac = function ResizeableDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ResizeableDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _ResizeableDirective,
      selectors: [["", "resizeable", ""]],
      hostVars: 2,
      hostBindings: function ResizeableDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("mousedown", function ResizeableDirective_mousedown_HostBindingHandler($event) {
            return ctx.onMousedown($event);
          });
        }
        if (rf & 2) {
          ɵɵclassProp("resizeable", ctx.resizeEnabled);
        }
      },
      inputs: {
        resizeEnabled: [2, "resizeEnabled", "resizeEnabled", booleanAttribute],
        minWidth: [2, "minWidth", "minWidth", numberAttribute],
        maxWidth: [2, "maxWidth", "maxWidth", numberAttribute]
      },
      outputs: {
        resize: "resize",
        resizing: "resizing"
      },
      standalone: true,
      features: [ɵɵInputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResizeableDirective, [{
    type: Directive,
    args: [{
      selector: "[resizeable]",
      standalone: true
    }]
  }], null, {
    resizeEnabled: [{
      type: HostBinding,
      args: ["class.resizeable"]
    }, {
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    minWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    maxWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    resize: [{
      type: Output
    }],
    resizing: [{
      type: Output
    }],
    onMousedown: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }]
  });
})();
function nextSortDir(sortType, current) {
  if (sortType === SortType.single) {
    if (current === SortDirection.asc) {
      return SortDirection.desc;
    } else {
      return SortDirection.asc;
    }
  } else {
    if (!current) {
      return SortDirection.asc;
    } else if (current === SortDirection.asc) {
      return SortDirection.desc;
    } else if (current === SortDirection.desc) {
      return void 0;
    }
    return void 0;
  }
}
function orderByComparator(a, b) {
  if (a === null || typeof a === "undefined") {
    a = 0;
  }
  if (b === null || typeof b === "undefined") {
    b = 0;
  }
  if (a instanceof Date && b instanceof Date) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
  } else if (isNaN(parseFloat(a)) || !isFinite(a) || isNaN(parseFloat(b)) || !isFinite(b)) {
    a = String(a);
    b = String(b);
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
  } else {
    if (parseFloat(a) < parseFloat(b)) {
      return -1;
    }
    if (parseFloat(a) > parseFloat(b)) {
      return 1;
    }
  }
  return 0;
}
function sortRows(rows, columns, dirs) {
  if (!rows) {
    return [];
  }
  if (!dirs || !dirs.length || !columns) {
    return [...rows];
  }
  const rowToIndexMap = /* @__PURE__ */ new Map();
  rows.forEach((row, index) => rowToIndexMap.set(row, index));
  const temp = [...rows];
  const cols = columns.reduce((obj, col) => {
    if (col.comparator && typeof col.comparator === "function") {
      obj[col.prop] = col.comparator;
    }
    return obj;
  }, {});
  const cachedDirs = dirs.map((dir) => {
    const prop = dir.prop;
    return {
      prop,
      dir: dir.dir,
      valueGetter: getterForProp(prop),
      compareFn: cols[prop] || orderByComparator
    };
  });
  return temp.sort(function(rowA, rowB) {
    for (const cachedDir of cachedDirs) {
      const {
        prop,
        valueGetter
      } = cachedDir;
      const propA = valueGetter(rowA, prop);
      const propB = valueGetter(rowB, prop);
      const comparison = cachedDir.dir !== SortDirection.desc ? cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir) : -cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir);
      if (comparison !== 0) {
        return comparison;
      }
    }
    if (!(rowToIndexMap.has(rowA) && rowToIndexMap.has(rowB))) {
      return 0;
    }
    return rowToIndexMap.get(rowA) < rowToIndexMap.get(rowB) ? -1 : 1;
  });
}
function sortGroupedRows(groupedRows, columns, dirs, sortOnGroupHeader) {
  if (sortOnGroupHeader) {
    groupedRows = sortRows(groupedRows, columns, [{
      dir: sortOnGroupHeader.dir,
      prop: "key"
    }]);
  }
  return groupedRows.map((group) => __spreadProps(__spreadValues({}, group), {
    value: sortRows(group.value, columns, dirs)
  }));
}
var DataTableHeaderCellComponent = class _DataTableHeaderCellComponent {
  set allRowsSelected(value) {
    this._allRowsSelected = value;
    this.cellContext.allRowsSelected = value;
  }
  get allRowsSelected() {
    return this._allRowsSelected;
  }
  set column(column) {
    this._column = column;
    this.cellContext.column = column;
    this.cd.markForCheck();
  }
  get column() {
    return this._column;
  }
  set sorts(val) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
    this.cellContext.sortDir = this.sortDir;
    this.sortClass = this.calcSortClass(this.sortDir);
    this.cd.markForCheck();
  }
  get sorts() {
    return this._sorts;
  }
  get columnCssClasses() {
    let cls = "datatable-header-cell";
    if (this.column.sortable) {
      cls += " sortable";
    }
    if (this.column.resizeable) {
      cls += " resizeable";
    }
    if (this.column.headerClass) {
      if (typeof this.column.headerClass === "string") {
        cls += " " + this.column.headerClass;
      } else if (typeof this.column.headerClass === "function") {
        const res = this.column.headerClass({
          column: this.column
        });
        if (typeof res === "string") {
          cls += " " + res;
        } else if (typeof res === "object") {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) {
              cls += ` ${k}`;
            }
          }
        }
      }
    }
    const sortDir = this.sortDir;
    if (sortDir) {
      cls += ` sort-active sort-${sortDir}`;
    }
    return cls;
  }
  get name() {
    return this.column.headerTemplate === void 0 ? this.column.name : void 0;
  }
  get minWidth() {
    return this.column.minWidth;
  }
  get maxWidth() {
    return this.column.maxWidth;
  }
  get width() {
    return this.column.width;
  }
  get tabindex() {
    return this.column.sortable ? 0 : -1;
  }
  get isCheckboxable() {
    return this.column.headerCheckboxable;
  }
  constructor() {
    this.cd = inject(ChangeDetectorRef);
    this.enableClearingSortState = false;
    this.sort = new EventEmitter();
    this.select = new EventEmitter();
    this.columnContextmenu = new EventEmitter(false);
    this.totalSortStatesApplied = 0;
    this.cellContext = {
      column: this.column,
      sortDir: this.sortDir,
      sortFn: () => this.onSort(),
      allRowsSelected: this.allRowsSelected,
      selectFn: () => this.select.emit()
    };
  }
  onContextmenu($event) {
    this.columnContextmenu.emit({
      event: $event,
      column: this.column
    });
  }
  enter() {
    this.onSort();
  }
  ngOnInit() {
    this.sortClass = this.calcSortClass(this.sortDir);
    if (this.sortDir) {
      this.totalSortStatesApplied = 1;
    }
  }
  calcSortDir(sorts) {
    if (sorts && this.column) {
      const sort = sorts.find((s) => {
        return s.prop === this.column.prop;
      });
      if (sort) {
        return sort.dir;
      }
    }
  }
  onSort() {
    if (!this.column.sortable) {
      return;
    }
    this.totalSortStatesApplied++;
    let newValue = nextSortDir(this.sortType, this.sortDir);
    if (this.enableClearingSortState && this.totalSortStatesApplied === 3) {
      newValue = void 0;
      this.totalSortStatesApplied = 0;
    }
    this.sort.emit({
      column: this.column,
      prevValue: this.sortDir,
      newValue
    });
  }
  calcSortClass(sortDir) {
    if (!this.cellContext.column.sortable) {
      return;
    }
    if (sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon}`;
    } else if (sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon}`;
    } else {
      return `sort-btn ${this.sortUnsetIcon}`;
    }
  }
  static {
    this.ɵfac = function DataTableHeaderCellComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableHeaderCellComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableHeaderCellComponent,
      selectors: [["datatable-header-cell"]],
      hostAttrs: [1, "datatable-header-cell"],
      hostVars: 12,
      hostBindings: function DataTableHeaderCellComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("contextmenu", function DataTableHeaderCellComponent_contextmenu_HostBindingHandler($event) {
            return ctx.onContextmenu($event);
          })("keydown.enter", function DataTableHeaderCellComponent_keydown_enter_HostBindingHandler() {
            return ctx.enter();
          });
        }
        if (rf & 2) {
          ɵɵhostProperty("tabindex", ctx.tabindex);
          ɵɵattribute("title", ctx.name);
          ɵɵclassMap(ctx.columnCssClasses);
          ɵɵstyleProp("height", ctx.headerHeight, "px")("min-width", ctx.minWidth, "px")("max-width", ctx.maxWidth, "px")("width", ctx.width, "px");
        }
      },
      inputs: {
        sortType: "sortType",
        sortAscendingIcon: "sortAscendingIcon",
        sortDescendingIcon: "sortDescendingIcon",
        sortUnsetIcon: "sortUnsetIcon",
        isTarget: "isTarget",
        targetMarkerTemplate: "targetMarkerTemplate",
        targetMarkerContext: "targetMarkerContext",
        enableClearingSortState: "enableClearingSortState",
        allRowsSelected: "allRowsSelected",
        selectionType: "selectionType",
        column: "column",
        headerHeight: "headerHeight",
        sorts: "sorts"
      },
      outputs: {
        sort: "sort",
        select: "select",
        columnContextmenu: "columnContextmenu"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 6,
      vars: 5,
      consts: [[1, "datatable-header-cell-template-wrap"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "datatable-checkbox"], [1, "datatable-header-cell-wrapper"], [3, "click"], ["type", "checkbox", 3, "change", "checked"], [1, "datatable-header-cell-label", "draggable", 3, "click"]],
      template: function DataTableHeaderCellComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵtemplate(1, DataTableHeaderCellComponent_Conditional_1_Template, 1, 2, null, 1)(2, DataTableHeaderCellComponent_Conditional_2_Template, 2, 1, "label", 2)(3, DataTableHeaderCellComponent_Conditional_3_Template, 1, 2, null, 1)(4, DataTableHeaderCellComponent_Conditional_4_Template, 3, 1, "span", 3);
          ɵɵelementStart(5, "span", 4);
          ɵɵlistener("click", function DataTableHeaderCellComponent_Template_span_click_5_listener() {
            return ctx.onSort();
          });
          ɵɵelementEnd()();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵconditional(ctx.isTarget ? 1 : -1);
          ɵɵadvance();
          ɵɵconditional(ctx.isCheckboxable ? 2 : -1);
          ɵɵadvance();
          ɵɵconditional(ctx.column.headerTemplate ? 3 : 4);
          ɵɵadvance(2);
          ɵɵclassMap(ctx.sortClass);
        }
      },
      dependencies: [NgTemplateOutlet],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableHeaderCellComponent, [{
    type: Component,
    args: [{
      selector: "datatable-header-cell",
      template: `
    <div class="datatable-header-cell-template-wrap">
      @if (isTarget) {
      <ng-template
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext"
      >
      </ng-template>
      } @if (isCheckboxable) {
      <label class="datatable-checkbox">
        <input type="checkbox" [checked]="allRowsSelected" (change)="select.emit()" />
      </label>
      } @if (column.headerTemplate) {
      <ng-template
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      } @else {
      <span class="datatable-header-cell-wrapper">
        <span class="datatable-header-cell-label draggable" (click)="onSort()">
          {{ name }}
        </span>
      </span>
      }
      <span (click)="onSort()" [class]="sortClass"> </span>
    </div>
  `,
      host: {
        class: "datatable-header-cell"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NgTemplateOutlet]
    }]
  }], () => [], {
    sortType: [{
      type: Input
    }],
    sortAscendingIcon: [{
      type: Input
    }],
    sortDescendingIcon: [{
      type: Input
    }],
    sortUnsetIcon: [{
      type: Input
    }],
    isTarget: [{
      type: Input
    }],
    targetMarkerTemplate: [{
      type: Input
    }],
    targetMarkerContext: [{
      type: Input
    }],
    enableClearingSortState: [{
      type: Input
    }],
    allRowsSelected: [{
      type: Input
    }],
    selectionType: [{
      type: Input
    }],
    column: [{
      type: Input
    }],
    headerHeight: [{
      type: HostBinding,
      args: ["style.height.px"]
    }, {
      type: Input
    }],
    sorts: [{
      type: Input
    }],
    sort: [{
      type: Output
    }],
    select: [{
      type: Output
    }],
    columnContextmenu: [{
      type: Output
    }],
    columnCssClasses: [{
      type: HostBinding,
      args: ["class"]
    }],
    name: [{
      type: HostBinding,
      args: ["attr.title"]
    }],
    minWidth: [{
      type: HostBinding,
      args: ["style.minWidth.px"]
    }],
    maxWidth: [{
      type: HostBinding,
      args: ["style.maxWidth.px"]
    }],
    width: [{
      type: HostBinding,
      args: ["style.width.px"]
    }],
    tabindex: [{
      type: HostBinding,
      args: ["tabindex"]
    }],
    onContextmenu: [{
      type: HostListener,
      args: ["contextmenu", ["$event"]]
    }],
    enter: [{
      type: HostListener,
      args: ["keydown.enter"]
    }]
  });
})();
var OrderableDirective = class _OrderableDirective {
  constructor() {
    this.document = inject(DOCUMENT);
    this.reorder = new EventEmitter();
    this.targetChanged = new EventEmitter();
    this.differ = inject(KeyValueDiffers).find({}).create();
  }
  ngAfterContentInit() {
    this.updateSubscriptions();
    this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
  }
  ngOnDestroy() {
    this.draggables.forEach((d) => {
      d.dragStart.unsubscribe();
      d.dragging.unsubscribe();
      d.dragEnd.unsubscribe();
    });
  }
  updateSubscriptions() {
    const diffs = this.differ.diff(this.createMapDiffs());
    if (diffs) {
      const subscribe = (record) => {
        unsubscribe(record);
        const {
          currentValue
        } = record;
        if (currentValue) {
          currentValue.dragStart.subscribe(this.onDragStart.bind(this));
          currentValue.dragging.subscribe(this.onDragging.bind(this));
          currentValue.dragEnd.subscribe(this.onDragEnd.bind(this));
        }
      };
      const unsubscribe = ({
        previousValue
      }) => {
        if (previousValue) {
          previousValue.dragStart.unsubscribe();
          previousValue.dragging.unsubscribe();
          previousValue.dragEnd.unsubscribe();
        }
      };
      diffs.forEachAddedItem(subscribe);
      diffs.forEachRemovedItem(unsubscribe);
    }
  }
  onDragStart() {
    this.positions = {};
    let i = 0;
    for (const dragger of this.draggables.toArray()) {
      const elm = dragger.element;
      const left = parseInt(elm.offsetLeft.toString(), 0);
      this.positions[dragger.dragModel.$$id] = {
        left,
        right: left + parseInt(elm.offsetWidth.toString(), 0),
        index: i++,
        element: elm
      };
    }
  }
  onDragging({
    element,
    model,
    event
  }) {
    const prevPos = this.positions[model.$$id];
    const target = this.isTarget(model, event);
    if (target) {
      if (this.lastDraggingIndex !== target.i) {
        this.targetChanged.emit({
          prevIndex: this.lastDraggingIndex,
          newIndex: target.i,
          initialIndex: prevPos.index
        });
        this.lastDraggingIndex = target.i;
      }
    } else if (this.lastDraggingIndex !== prevPos.index) {
      this.targetChanged.emit({
        prevIndex: this.lastDraggingIndex,
        initialIndex: prevPos.index
      });
      this.lastDraggingIndex = prevPos.index;
    }
  }
  onDragEnd({
    element,
    model,
    event
  }) {
    const prevPos = this.positions[model.$$id];
    const target = this.isTarget(model, event);
    if (target) {
      this.reorder.emit({
        prevIndex: prevPos.index,
        newIndex: target.i,
        model
      });
    }
    this.lastDraggingIndex = void 0;
    element.style.left = "auto";
  }
  isTarget(model, event) {
    let i = 0;
    const x = event.x || event.clientX;
    const y = event.y || event.clientY;
    const targets = this.document.elementsFromPoint(x, y);
    for (const id2 in this.positions) {
      const pos = this.positions[id2];
      if (model.$$id !== id2 && targets.find((el) => el === pos.element)) {
        return {
          pos,
          i
        };
      }
      i++;
    }
  }
  createMapDiffs() {
    return this.draggables.toArray().reduce((acc, curr) => {
      acc[curr.dragModel.$$id] = curr;
      return acc;
    }, {});
  }
  static {
    this.ɵfac = function OrderableDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OrderableDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _OrderableDirective,
      selectors: [["", "orderable", ""]],
      contentQueries: function OrderableDirective_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, DraggableDirective, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.draggables = _t);
        }
      },
      outputs: {
        reorder: "reorder",
        targetChanged: "targetChanged"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderableDirective, [{
    type: Directive,
    args: [{
      selector: "[orderable]",
      standalone: true
    }]
  }], null, {
    reorder: [{
      type: Output
    }],
    targetChanged: [{
      type: Output
    }],
    draggables: [{
      type: ContentChildren,
      args: [DraggableDirective, {
        descendants: true
      }]
    }]
  });
})();
var DataTableHeaderComponent = class _DataTableHeaderComponent {
  constructor() {
    this.cd = inject(ChangeDetectorRef);
    this.scrollbarHelper = inject(ScrollbarHelper);
    this.enableClearingSortState = false;
    this.verticalScrollVisible = false;
    this.sort = new EventEmitter();
    this.reorder = new EventEmitter();
    this.resize = new EventEmitter();
    this.resizing = new EventEmitter();
    this.select = new EventEmitter();
    this.columnContextmenu = new EventEmitter(false);
    this._columnGroupWidths = {
      total: 100
    };
    this._styleByGroup = {
      left: {},
      center: {},
      right: {}
    };
    this.destroyed = false;
  }
  set innerWidth(val) {
    this._innerWidth = val;
    setTimeout(() => {
      if (this._columns) {
        const colByPin = columnsByPin(this._columns);
        this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
        this.setStylesByGroup();
      }
    });
  }
  get innerWidth() {
    return this._innerWidth;
  }
  set headerHeight(val) {
    if (val !== "auto") {
      this._headerHeight = `${val}px`;
    } else {
      this._headerHeight = val;
    }
  }
  get headerHeight() {
    return this._headerHeight;
  }
  set columns(val) {
    this._columns = val;
    const colsByPin = columnsByPin(val);
    this._columnsByPin = columnsByPinArr(val);
    setTimeout(() => {
      this._columnGroupWidths = columnGroupWidths(colsByPin, val);
      this.setStylesByGroup();
    });
  }
  get columns() {
    return this._columns;
  }
  set offsetX(val) {
    this._offsetX = val;
    this.setStylesByGroup();
  }
  get offsetX() {
    return this._offsetX;
  }
  ngOnChanges(changes) {
    if (changes.verticalScrollVisible) {
      this._styleByGroup.right = this.calcStylesByGroup("right");
      if (!this.destroyed) {
        this.cd.detectChanges();
      }
    }
  }
  ngOnDestroy() {
    this.destroyed = true;
  }
  onLongPressStart({
    event,
    model
  }) {
    model.dragging = true;
    this.dragEventTarget = event;
  }
  onLongPressEnd({
    model
  }) {
    this.dragEventTarget = void 0;
    setTimeout(() => {
      const column = this._columns.find((c) => c.$$id === model.$$id);
      if (column && "dragging" in column) {
        column.dragging = false;
      }
    }, 5);
  }
  get headerWidth() {
    if (this.scrollbarH) {
      const width = this.verticalScrollVisible ? this.innerWidth - this.scrollbarHelper.width : this.innerWidth;
      return width + "px";
    }
    return "100%";
  }
  onColumnResized(width, column) {
    this.resize.emit(this.makeResizeEvent(width, column));
  }
  onColumnResizing(width, column) {
    this.resizing.emit(this.makeResizeEvent(width, column));
  }
  makeResizeEvent(width, column) {
    if (width <= column.minWidth) {
      width = column.minWidth;
    } else if (width >= column.maxWidth) {
      width = column.maxWidth;
    }
    return {
      column,
      prevValue: column.width,
      newValue: width
    };
  }
  onColumnReordered({
    prevIndex,
    newIndex,
    model
  }) {
    const column = this.getColumn(newIndex);
    column.isTarget = false;
    column.targetMarkerContext = void 0;
    this.reorder.emit({
      column: model,
      prevValue: prevIndex,
      newValue: newIndex
    });
  }
  onTargetChanged({
    prevIndex,
    newIndex,
    initialIndex
  }) {
    if (prevIndex || prevIndex === 0) {
      const oldColumn = this.getColumn(prevIndex);
      oldColumn.isTarget = false;
      oldColumn.targetMarkerContext = void 0;
    }
    if (newIndex || newIndex === 0) {
      const newColumn = this.getColumn(newIndex);
      newColumn.isTarget = true;
      if (initialIndex !== newIndex) {
        newColumn.targetMarkerContext = {
          class: "targetMarker ".concat(initialIndex > newIndex ? "dragFromRight" : "dragFromLeft")
        };
      }
    }
  }
  getColumn(index) {
    const leftColumnCount = this._columnsByPin[0].columns.length;
    if (index < leftColumnCount) {
      return this._columnsByPin[0].columns[index];
    }
    const centerColumnCount = this._columnsByPin[1].columns.length;
    if (index < leftColumnCount + centerColumnCount) {
      return this._columnsByPin[1].columns[index - leftColumnCount];
    }
    return this._columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
  }
  onSort({
    column,
    prevValue,
    newValue
  }) {
    if (column.dragging) {
      return;
    }
    const sorts = this.calcNewSorts(column, prevValue, newValue);
    this.sort.emit({
      sorts,
      column,
      prevValue,
      newValue
    });
  }
  calcNewSorts(column, prevValue, newValue) {
    let idx = 0;
    if (!this.sorts) {
      this.sorts = [];
    }
    const sorts = this.sorts.map((s, i) => {
      s = __spreadValues({}, s);
      if (s.prop === column.prop) {
        idx = i;
      }
      return s;
    });
    if (newValue === void 0) {
      sorts.splice(idx, 1);
    } else if (prevValue) {
      sorts[idx].dir = newValue;
    } else {
      if (this.sortType === SortType.single) {
        sorts.splice(0, this.sorts.length);
      }
      sorts.push({
        dir: newValue,
        prop: column.prop
      });
    }
    return sorts;
  }
  setStylesByGroup() {
    this._styleByGroup.left = this.calcStylesByGroup("left");
    this._styleByGroup.center = this.calcStylesByGroup("center");
    this._styleByGroup.right = this.calcStylesByGroup("right");
    if (!this.destroyed) {
      this.cd.detectChanges();
    }
  }
  calcStylesByGroup(group) {
    const widths = this._columnGroupWidths;
    if (group === "center") {
      return {
        transform: `translateX(${this.offsetX * -1}px)`,
        width: `${widths[group]}px`,
        willChange: "transform"
      };
    }
    return {
      width: `${widths[group]}px`
    };
  }
  static {
    this.ɵfac = function DataTableHeaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableHeaderComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableHeaderComponent,
      selectors: [["datatable-header"]],
      hostAttrs: [1, "datatable-header"],
      hostVars: 4,
      hostBindings: function DataTableHeaderComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵstyleProp("height", ctx.headerHeight)("width", ctx.headerWidth);
        }
      },
      inputs: {
        sortAscendingIcon: "sortAscendingIcon",
        sortDescendingIcon: "sortDescendingIcon",
        sortUnsetIcon: "sortUnsetIcon",
        scrollbarH: "scrollbarH",
        dealsWithGroup: "dealsWithGroup",
        targetMarkerTemplate: "targetMarkerTemplate",
        enableClearingSortState: "enableClearingSortState",
        innerWidth: "innerWidth",
        sorts: "sorts",
        sortType: "sortType",
        allRowsSelected: "allRowsSelected",
        selectionType: "selectionType",
        reorderable: "reorderable",
        verticalScrollVisible: "verticalScrollVisible",
        headerHeight: "headerHeight",
        columns: "columns",
        offsetX: "offsetX"
      },
      outputs: {
        sort: "sort",
        reorder: "reorder",
        resize: "resize",
        resizing: "resizing",
        select: "select",
        columnContextmenu: "columnContextmenu"
      },
      standalone: true,
      features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
      decls: 3,
      vars: 2,
      consts: [["role", "row", "orderable", "", 1, "datatable-header-inner", 3, "reorder", "targetChanged"], [3, "class", "ngStyle"], [3, "ngStyle"], ["role", "columnheader", "resizeable", "", "long-press", "", "draggable", "", 3, "resizeEnabled", "pressModel", "pressEnabled", "dragX", "dragY", "dragModel", "dragEventTarget", "headerHeight", "isTarget", "targetMarkerTemplate", "targetMarkerContext", "column", "sortType", "sorts", "selectionType", "sortAscendingIcon", "sortDescendingIcon", "sortUnsetIcon", "allRowsSelected", "enableClearingSortState"], ["role", "columnheader", "resizeable", "", "long-press", "", "draggable", "", 3, "resize", "resizing", "longPressStart", "longPressEnd", "sort", "select", "columnContextmenu", "resizeEnabled", "pressModel", "pressEnabled", "dragX", "dragY", "dragModel", "dragEventTarget", "headerHeight", "isTarget", "targetMarkerTemplate", "targetMarkerContext", "column", "sortType", "sorts", "selectionType", "sortAscendingIcon", "sortDescendingIcon", "sortUnsetIcon", "allRowsSelected", "enableClearingSortState"]],
      template: function DataTableHeaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵlistener("reorder", function DataTableHeaderComponent_Template_div_reorder_0_listener($event) {
            return ctx.onColumnReordered($event);
          })("targetChanged", function DataTableHeaderComponent_Template_div_targetChanged_0_listener($event) {
            return ctx.onTargetChanged($event);
          });
          ɵɵrepeaterCreate(1, DataTableHeaderComponent_For_2_Template, 3, 3, "div", 1, _forTrack0);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵstyleProp("width", ctx._columnGroupWidths.total, "px");
          ɵɵadvance();
          ɵɵrepeater(ctx._columnsByPin);
        }
      },
      dependencies: [OrderableDirective, NgStyle, DataTableHeaderCellComponent, ResizeableDirective, LongPressDirective, DraggableDirective],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableHeaderComponent, [{
    type: Component,
    args: [{
      selector: "datatable-header",
      template: `
    <div
      role="row"
      orderable
      (reorder)="onColumnReordered($event)"
      (targetChanged)="onTargetChanged($event)"
      [style.width.px]="_columnGroupWidths.total"
      class="datatable-header-inner"
    >
      @for (colGroup of _columnsByPin; track colGroup.type) {
      <div [class]="'datatable-row-' + colGroup.type" [ngStyle]="_styleByGroup[colGroup.type]">
        @for (column of colGroup.columns; track column.$$id) {
        <datatable-header-cell
          role="columnheader"
          resizeable
          [resizeEnabled]="column.resizeable"
          (resize)="onColumnResized($event, column)"
          (resizing)="onColumnResizing($event, column)"
          long-press
          [pressModel]="column"
          [pressEnabled]="reorderable && column.draggable"
          (longPressStart)="onLongPressStart($event)"
          (longPressEnd)="onLongPressEnd($event)"
          draggable
          [dragX]="reorderable && column.draggable && column.dragging"
          [dragY]="false"
          [dragModel]="column"
          [dragEventTarget]="dragEventTarget"
          [headerHeight]="headerHeight"
          [isTarget]="column.isTarget"
          [targetMarkerTemplate]="targetMarkerTemplate"
          [targetMarkerContext]="column.targetMarkerContext"
          [column]="column"
          [sortType]="sortType"
          [sorts]="sorts"
          [selectionType]="selectionType"
          [sortAscendingIcon]="sortAscendingIcon"
          [sortDescendingIcon]="sortDescendingIcon"
          [sortUnsetIcon]="sortUnsetIcon"
          [allRowsSelected]="allRowsSelected"
          [enableClearingSortState]="enableClearingSortState"
          (sort)="onSort($event)"
          (select)="select.emit($event)"
          (columnContextmenu)="columnContextmenu.emit($event)"
        >
        </datatable-header-cell>
        }
      </div>
      }
    </div>
  `,
      host: {
        class: "datatable-header"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [OrderableDirective, NgStyle, DataTableHeaderCellComponent, ResizeableDirective, LongPressDirective, DraggableDirective]
    }]
  }], null, {
    sortAscendingIcon: [{
      type: Input
    }],
    sortDescendingIcon: [{
      type: Input
    }],
    sortUnsetIcon: [{
      type: Input
    }],
    scrollbarH: [{
      type: Input
    }],
    dealsWithGroup: [{
      type: Input
    }],
    targetMarkerTemplate: [{
      type: Input
    }],
    enableClearingSortState: [{
      type: Input
    }],
    innerWidth: [{
      type: Input
    }],
    sorts: [{
      type: Input
    }],
    sortType: [{
      type: Input
    }],
    allRowsSelected: [{
      type: Input
    }],
    selectionType: [{
      type: Input
    }],
    reorderable: [{
      type: Input
    }],
    verticalScrollVisible: [{
      type: Input
    }],
    headerHeight: [{
      type: HostBinding,
      args: ["style.height"]
    }, {
      type: Input
    }],
    columns: [{
      type: Input
    }],
    offsetX: [{
      type: Input
    }],
    sort: [{
      type: Output
    }],
    reorder: [{
      type: Output
    }],
    resize: [{
      type: Output
    }],
    resizing: [{
      type: Output
    }],
    select: [{
      type: Output
    }],
    columnContextmenu: [{
      type: Output
    }],
    headerWidth: [{
      type: HostBinding,
      args: ["style.width"]
    }]
  });
})();
function throttle(func, wait, options) {
  options = options || {};
  let context;
  let args;
  let result;
  let timeout = null;
  let previous = 0;
  function later() {
    previous = options.leading === false ? 0 : +/* @__PURE__ */ new Date();
    timeout = null;
    result = func.apply(context, args);
  }
  return function() {
    const now = +/* @__PURE__ */ new Date();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
function throttleable(duration, options) {
  return function innerDecorator(target, key, descriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: throttle(descriptor.value, duration, options)
        });
        return this[key];
      }
    };
  };
}
function getTotalFlexGrow(columns) {
  let totalFlexGrow = 0;
  for (const c of columns) {
    totalFlexGrow += c.flexGrow || 0;
  }
  return totalFlexGrow;
}
function adjustColumnWidths(allColumns, expectedWidth) {
  const columnsWidth = columnsTotalWidth(allColumns);
  const totalFlexGrow = getTotalFlexGrow(allColumns);
  const colsByGroup = columnsByPin(allColumns);
  if (columnsWidth !== expectedWidth) {
    scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
  }
}
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
  for (const attr in colsByGroup) {
    if (attr in colsByGroup) {
      for (const column of colsByGroup[attr]) {
        if (column.$$oldWidth) {
          column.canAutoResize = false;
        }
        if (!column.canAutoResize) {
          maxWidth -= column.width;
          totalFlexGrow -= column.flexGrow ? column.flexGrow : 0;
        } else {
          column.width = 0;
        }
      }
    }
  }
  const hasMinWidth = {};
  let remainingWidth = maxWidth;
  do {
    const widthPerFlexPoint = remainingWidth / totalFlexGrow;
    remainingWidth = 0;
    for (const attr in colsByGroup) {
      if (attr in colsByGroup) {
        for (const column of colsByGroup[attr]) {
          if (column.canAutoResize && !hasMinWidth[column.prop]) {
            const newWidth = column.width + column.flexGrow * widthPerFlexPoint;
            if (column.minWidth !== void 0 && newWidth < column.minWidth) {
              remainingWidth += newWidth - column.minWidth;
              column.width = column.minWidth;
              hasMinWidth[column.prop] = true;
            } else {
              column.width = newWidth;
            }
          }
        }
      }
    }
  } while (remainingWidth !== 0);
  const columns = Object.values(colsByGroup).reduce((acc, col) => acc.concat(col), []);
  const totalWidthAchieved = columns.reduce((acc, col) => acc + col.width, 0);
  const delta = maxWidth - totalWidthAchieved;
  if (delta === 0) {
    return;
  }
  for (const col of columns.filter((c) => c.canAutoResize).sort((a, b) => a.width - b.width)) {
    if (delta > 0 && (!col.maxWidth || col.width + delta <= col.maxWidth) || delta < 0 && (!col.minWidth || col.width + delta >= col.minWidth)) {
      col.width += delta;
      break;
    }
  }
}
function forceFillColumnWidths(allColumns, expectedWidth, startIdx, allowBleed, defaultColWidth = 150, verticalScrollWidth = 0) {
  const columnsToResize = allColumns.slice(startIdx + 1, allColumns.length).filter((c) => c.canAutoResize !== false);
  for (const column of columnsToResize) {
    if (!column.$$oldWidth) {
      column.$$oldWidth = column.width;
    }
  }
  let additionWidthPerColumn = 0;
  let exceedsWindow = false;
  let contentWidth = getContentWidth(allColumns, defaultColWidth);
  let remainingWidth = expectedWidth - contentWidth;
  const initialRemainingWidth = remainingWidth;
  const columnsProcessed = [];
  const remainingWidthLimit = 1;
  do {
    additionWidthPerColumn = remainingWidth / columnsToResize.length;
    exceedsWindow = contentWidth >= expectedWidth;
    for (const column of columnsToResize) {
      if (exceedsWindow && allowBleed && initialRemainingWidth !== -1 * verticalScrollWidth) {
        column.width = column.$$oldWidth || column.width || defaultColWidth;
      } else {
        const newSize = (column.width || defaultColWidth) + additionWidthPerColumn;
        if (column.minWidth && newSize < column.minWidth) {
          column.width = column.minWidth;
          columnsProcessed.push(column);
        } else if (column.maxWidth && newSize > column.maxWidth) {
          column.width = column.maxWidth;
          columnsProcessed.push(column);
        } else {
          column.width = newSize;
        }
      }
      column.width = Math.max(0, column.width);
    }
    contentWidth = getContentWidth(allColumns, defaultColWidth);
    remainingWidth = expectedWidth - contentWidth;
    removeProcessedColumns(columnsToResize, columnsProcessed);
  } while (remainingWidth > remainingWidthLimit && columnsToResize.length !== 0);
  for (const column of columnsToResize) {
    column.$$oldWidth = 0;
  }
}
function removeProcessedColumns(columnsToResize, columnsProcessed) {
  for (const column of columnsProcessed) {
    const index = columnsToResize.indexOf(column);
    columnsToResize.splice(index, 1);
  }
}
function getContentWidth(allColumns, defaultColWidth = 150) {
  let contentWidth = 0;
  for (const column of allColumns) {
    contentWidth += column.width || defaultColWidth;
  }
  return contentWidth;
}
var DataTablePagerComponent = class _DataTablePagerComponent {
  constructor() {
    this.change = new EventEmitter();
    this._count = 0;
    this._page = 1;
    this._size = 0;
  }
  set size(val) {
    this._size = val;
    this.pages = this.calcPages();
  }
  get size() {
    return this._size;
  }
  set count(val) {
    this._count = val;
    this.pages = this.calcPages();
  }
  get count() {
    return this._count;
  }
  set page(val) {
    this._page = val;
    this.pages = this.calcPages();
  }
  get page() {
    return this._page;
  }
  get totalPages() {
    const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
    return Math.max(count || 0, 1);
  }
  canPrevious() {
    return this.page > 1;
  }
  canNext() {
    return this.page < this.totalPages;
  }
  prevPage() {
    this.selectPage(this.page - 1);
  }
  nextPage() {
    this.selectPage(this.page + 1);
  }
  selectPage(page) {
    if (page > 0 && page <= this.totalPages && page !== this.page) {
      this.page = page;
      this.change.emit({
        page
      });
    }
  }
  calcPages(page) {
    const pages = [];
    let startPage = 1;
    let endPage = this.totalPages;
    const maxSize = 5;
    const isMaxSized = maxSize < this.totalPages;
    page = page || this.page;
    if (isMaxSized) {
      startPage = page - Math.floor(maxSize / 2);
      endPage = page + Math.floor(maxSize / 2);
      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(startPage + maxSize - 1, this.totalPages);
      } else if (endPage > this.totalPages) {
        startPage = Math.max(this.totalPages - maxSize + 1, 1);
        endPage = this.totalPages;
      }
    }
    for (let num = startPage; num <= endPage; num++) {
      pages.push({
        number: num,
        text: num
      });
    }
    return pages;
  }
  static {
    this.ɵfac = function DataTablePagerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTablePagerComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTablePagerComponent,
      selectors: [["datatable-pager"]],
      hostAttrs: [1, "datatable-pager"],
      inputs: {
        pagerLeftArrowIcon: "pagerLeftArrowIcon",
        pagerRightArrowIcon: "pagerRightArrowIcon",
        pagerPreviousIcon: "pagerPreviousIcon",
        pagerNextIcon: "pagerNextIcon",
        size: "size",
        count: "count",
        page: "page"
      },
      outputs: {
        change: "change"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 15,
      vars: 20,
      consts: [[1, "pager"], ["role", "button", "aria-label", "go to first page", 3, "click"], ["role", "button", "aria-label", "go to previous page", 3, "click"], ["role", "button", 1, "pages", 3, "active"], ["role", "button", "aria-label", "go to next page", 3, "click"], ["role", "button", "aria-label", "go to last page", 3, "click"], ["role", "button", 1, "pages"], [3, "click"]],
      template: function DataTablePagerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "ul", 0)(1, "li")(2, "a", 1);
          ɵɵlistener("click", function DataTablePagerComponent_Template_a_click_2_listener() {
            return ctx.selectPage(1);
          });
          ɵɵelement(3, "i");
          ɵɵelementEnd()();
          ɵɵelementStart(4, "li")(5, "a", 2);
          ɵɵlistener("click", function DataTablePagerComponent_Template_a_click_5_listener() {
            return ctx.prevPage();
          });
          ɵɵelement(6, "i");
          ɵɵelementEnd()();
          ɵɵrepeaterCreate(7, DataTablePagerComponent_For_8_Template, 3, 4, "li", 3, _forTrack2);
          ɵɵelementStart(9, "li")(10, "a", 4);
          ɵɵlistener("click", function DataTablePagerComponent_Template_a_click_10_listener() {
            return ctx.nextPage();
          });
          ɵɵelement(11, "i");
          ɵɵelementEnd()();
          ɵɵelementStart(12, "li")(13, "a", 5);
          ɵɵlistener("click", function DataTablePagerComponent_Template_a_click_13_listener() {
            return ctx.selectPage(ctx.totalPages);
          });
          ɵɵelement(14, "i");
          ɵɵelementEnd()()();
        }
        if (rf & 2) {
          ɵɵadvance();
          ɵɵclassProp("disabled", !ctx.canPrevious());
          ɵɵadvance(2);
          ɵɵclassMap(ctx.pagerPreviousIcon);
          ɵɵadvance();
          ɵɵclassProp("disabled", !ctx.canPrevious());
          ɵɵadvance(2);
          ɵɵclassMap(ctx.pagerLeftArrowIcon);
          ɵɵadvance();
          ɵɵrepeater(ctx.pages);
          ɵɵadvance(2);
          ɵɵclassProp("disabled", !ctx.canNext());
          ɵɵadvance(2);
          ɵɵclassMap(ctx.pagerRightArrowIcon);
          ɵɵadvance();
          ɵɵclassProp("disabled", !ctx.canNext());
          ɵɵadvance(2);
          ɵɵclassMap(ctx.pagerNextIcon);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTablePagerComponent, [{
    type: Component,
    args: [{
      selector: "datatable-pager",
      template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to first page" (click)="selectPage(1)">
          <i class="{{ pagerPreviousIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to previous page" (click)="prevPage()">
          <i class="{{ pagerLeftArrowIcon }}"></i>
        </a>
      </li>
      @for (pg of pages; track pg.number) {
      <li
        role="button"
        [attr.aria-label]="'page ' + pg.number"
        class="pages"
        [class.active]="pg.number === page"
      >
        <a (click)="selectPage(pg.number)">
          {{ pg.text }}
        </a>
      </li>
      }
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to next page" (click)="nextPage()">
          <i class="{{ pagerRightArrowIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to last page" (click)="selectPage(totalPages)">
          <i class="{{ pagerNextIcon }}"></i>
        </a>
      </li>
    </ul>
  `,
      host: {
        class: "datatable-pager"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], null, {
    pagerLeftArrowIcon: [{
      type: Input
    }],
    pagerRightArrowIcon: [{
      type: Input
    }],
    pagerPreviousIcon: [{
      type: Input
    }],
    pagerNextIcon: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    count: [{
      type: Input
    }],
    page: [{
      type: Input
    }],
    change: [{
      type: Output
    }]
  });
})();
var DataTableFooterComponent = class _DataTableFooterComponent {
  constructor() {
    this.selectedCount = 0;
    this.page = new EventEmitter();
  }
  get isVisible() {
    return this.rowCount / this.pageSize > 1;
  }
  get curPage() {
    return this.offset + 1;
  }
  static {
    this.ɵfac = function DataTableFooterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DataTableFooterComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DataTableFooterComponent,
      selectors: [["datatable-footer"]],
      hostAttrs: [1, "datatable-footer"],
      inputs: {
        footerHeight: "footerHeight",
        rowCount: "rowCount",
        pageSize: "pageSize",
        offset: "offset",
        pagerLeftArrowIcon: "pagerLeftArrowIcon",
        pagerRightArrowIcon: "pagerRightArrowIcon",
        pagerPreviousIcon: "pagerPreviousIcon",
        pagerNextIcon: "pagerNextIcon",
        totalMessage: "totalMessage",
        footerTemplate: "footerTemplate",
        selectedCount: "selectedCount",
        selectedMessage: "selectedMessage"
      },
      outputs: {
        page: "page"
      },
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 3,
      vars: 6,
      consts: [[1, "datatable-footer-inner", 3, "ngClass"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "page-count"], [3, "change", "pagerLeftArrowIcon", "pagerRightArrowIcon", "pagerPreviousIcon", "pagerNextIcon", "page", "size", "count", "hidden"]],
      template: function DataTableFooterComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵtemplate(1, DataTableFooterComponent_Conditional_1_Template, 1, 8, null, 1)(2, DataTableFooterComponent_Conditional_2_Template, 4, 11);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵstyleProp("height", ctx.footerHeight, "px");
          ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c10, ctx.selectedMessage));
          ɵɵadvance();
          ɵɵconditional(ctx.footerTemplate ? 1 : 2);
        }
      },
      dependencies: [NgClass, NgTemplateOutlet, DataTablePagerComponent],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataTableFooterComponent, [{
    type: Component,
    args: [{
      selector: "datatable-footer",
      template: `
    <div
      class="datatable-footer-inner"
      [ngClass]="{ 'selected-count': selectedMessage }"
      [style.height.px]="footerHeight"
    >
      @if (footerTemplate) {
      <ng-template
        [ngTemplateOutlet]="footerTemplate.template"
        [ngTemplateOutletContext]="{
          rowCount: rowCount,
          pageSize: pageSize,
          selectedCount: selectedCount,
          curPage: curPage,
          offset: offset
        }"
      >
      </ng-template>
      } @else {
      <div class="page-count">
        @if (selectedMessage) {
        <span> {{ selectedCount?.toLocaleString() }} {{ selectedMessage }} / </span>
        }
        {{ rowCount?.toLocaleString() }} {{ totalMessage }}
      </div>
      <datatable-pager
        [pagerLeftArrowIcon]="pagerLeftArrowIcon"
        [pagerRightArrowIcon]="pagerRightArrowIcon"
        [pagerPreviousIcon]="pagerPreviousIcon"
        [pagerNextIcon]="pagerNextIcon"
        [page]="curPage"
        [size]="pageSize"
        [count]="rowCount"
        [hidden]="!isVisible"
        (change)="page.emit($event)"
      >
      </datatable-pager>
      }
    </div>
  `,
      host: {
        class: "datatable-footer"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NgClass, NgTemplateOutlet, DataTablePagerComponent]
    }]
  }], null, {
    footerHeight: [{
      type: Input
    }],
    rowCount: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    offset: [{
      type: Input
    }],
    pagerLeftArrowIcon: [{
      type: Input
    }],
    pagerRightArrowIcon: [{
      type: Input
    }],
    pagerPreviousIcon: [{
      type: Input
    }],
    pagerNextIcon: [{
      type: Input
    }],
    totalMessage: [{
      type: Input
    }],
    footerTemplate: [{
      type: Input
    }],
    selectedCount: [{
      type: Input
    }],
    selectedMessage: [{
      type: Input
    }],
    page: [{
      type: Output
    }]
  });
})();
var VisibilityDirective = class _VisibilityDirective {
  constructor() {
    this.element = inject(ElementRef);
    this.zone = inject(NgZone);
    this.isVisible = false;
    this.visible = new EventEmitter();
  }
  ngOnInit() {
    this.runCheck();
  }
  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
  onVisibilityChange() {
    this.zone.run(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }
  runCheck() {
    const check = () => {
      const {
        offsetHeight,
        offsetWidth
      } = this.element.nativeElement;
      if (offsetHeight && offsetWidth) {
        clearTimeout(this.timeout);
        this.onVisibilityChange();
      } else {
        clearTimeout(this.timeout);
        this.zone.runOutsideAngular(() => {
          this.timeout = setTimeout(() => check(), 50);
        });
      }
    };
    this.timeout = setTimeout(() => check());
  }
  static {
    this.ɵfac = function VisibilityDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VisibilityDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _VisibilityDirective,
      selectors: [["", "visibilityObserver", ""]],
      hostVars: 2,
      hostBindings: function VisibilityDirective_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵclassProp("visible", ctx.isVisible);
        }
      },
      outputs: {
        visible: "visible"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VisibilityDirective, [{
    type: Directive,
    args: [{
      selector: "[visibilityObserver]",
      standalone: true
    }]
  }], null, {
    isVisible: [{
      type: HostBinding,
      args: ["class.visible"]
    }],
    visible: [{
      type: Output
    }]
  });
})();
var ProgressBarComponent = class _ProgressBarComponent {
  static {
    this.ɵfac = function ProgressBarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProgressBarComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ProgressBarComponent,
      selectors: [["datatable-progress"]],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 3,
      vars: 0,
      consts: [["role", "progressbar", 1, "progress-linear"], [1, "container"], [1, "bar"]],
      template: function ProgressBarComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0)(1, "div", 1);
          ɵɵelement(2, "div", 2);
          ɵɵelementEnd()();
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBarComponent, [{
    type: Component,
    args: [{
      selector: "datatable-progress",
      template: `
    <div class="progress-linear" role="progressbar">
      <div class="container">
        <div class="bar"></div>
      </div>
    </div>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], null, null);
})();
var DatatableComponent = class _DatatableComponent {
  /**
   * Rows that are displayed in the table.
   */
  set rows(val) {
    this._rows = val;
    this.rowDiffer.diff([]);
    if (val) {
      this._internalRows = [...val];
    }
  }
  /**
   * Gets the rows.
   */
  get rows() {
    return this._rows;
  }
  /**
   * This attribute allows the user to set the name of the column to group the data with
   */
  set groupRowsBy(val) {
    if (val) {
      this._groupRowsBy = val;
      if (this._rows && this._groupRowsBy) {
        this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
      }
    }
  }
  get groupRowsBy() {
    return this._groupRowsBy;
  }
  /**
   * Columns to be displayed.
   */
  set columns(val) {
    if (val) {
      this._internalColumns = [...val];
      setColumnDefaults(this._internalColumns, this._defaultColumnWidth);
      this.recalculateColumns();
    }
    this._columns = val;
  }
  /**
   * Get the columns.
   */
  get columns() {
    return this._columns;
  }
  /**
   * The page size to be shown.
   * Default value: `undefined`
   */
  set limit(val) {
    this._limit = val;
    this.recalculate();
  }
  /**
   * Gets the limit.
   */
  get limit() {
    return this._limit;
  }
  /**
   * The total count of all rows.
   * Default value: `0`
   */
  set count(val) {
    this._count = val;
    this.recalculate();
  }
  /**
   * Gets the count.
   */
  get count() {
    return this._count;
  }
  /**
   * The current offset ( page - 1 ) shown.
   * Default value: `0`
   */
  set offset(val) {
    this._offset = val;
  }
  get offset() {
    return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
  }
  /**
   * Show ghost loaders on each cell.
   * Default value: `false`
   */
  set ghostLoadingIndicator(val) {
    this._ghostLoadingIndicator = val;
    if (val && this.scrollbarV && !this.externalPaging) {
      this.rows = [...this.rows ?? [], void 0];
    }
  }
  get ghostLoadingIndicator() {
    return this._ghostLoadingIndicator;
  }
  /**
   * CSS class applied if the header height if fixed height.
   */
  get isFixedHeader() {
    const headerHeight = this.headerHeight;
    return typeof headerHeight === "string" ? headerHeight !== "auto" : true;
  }
  /**
   * CSS class applied to the root element if
   * the row heights are fixed heights.
   */
  get isFixedRow() {
    return this.rowHeight !== "auto";
  }
  /**
   * CSS class applied to root element if
   * vertical scrolling is enabled.
   */
  get isVertScroll() {
    return this.scrollbarV;
  }
  /**
   * CSS class applied to root element if
   * virtualization is enabled.
   */
  get isVirtualized() {
    return this.virtualization;
  }
  /**
   * CSS class applied to the root element
   * if the horziontal scrolling is enabled.
   */
  get isHorScroll() {
    return this.scrollbarH;
  }
  /**
   * CSS class applied to root element is selectable.
   */
  get isSelectable() {
    return this.selectionType !== void 0;
  }
  /**
   * CSS class applied to root is checkbox selection.
   */
  get isCheckboxSelection() {
    return this.selectionType === SelectionType.checkbox;
  }
  /**
   * CSS class applied to root if cell selection.
   */
  get isCellSelection() {
    return this.selectionType === SelectionType.cell;
  }
  /**
   * CSS class applied to root if single select.
   */
  get isSingleSelection() {
    return this.selectionType === SelectionType.single;
  }
  /**
   * CSS class added to root element if mulit select
   */
  get isMultiSelection() {
    return this.selectionType === SelectionType.multi;
  }
  /**
   * CSS class added to root element if mulit click select
   */
  get isMultiClickSelection() {
    return this.selectionType === SelectionType.multiClick;
  }
  /**
   * Returns if all rows are selected.
   */
  get allRowsSelected() {
    let allRowsSelected = this.rows && this.selected && this.selected.length === this.rows.length;
    if (this.bodyComponent && this.selectAllRowsOnPage) {
      const indexes = this.bodyComponent.indexes;
      const rowsOnPage = indexes().last - indexes().first;
      allRowsSelected = this.selected.length === rowsOnPage;
    }
    return this.selected && this.rows && this.rows.length !== 0 && allRowsSelected;
  }
  constructor() {
    this.scrollbarHelper = inject(ScrollbarHelper);
    this.cd = inject(ChangeDetectorRef);
    this.columnChangesService = inject(ColumnChangesService);
    this.configuration = inject("configuration", {
      optional: true
    });
    this.selected = [];
    this.scrollbarV = false;
    this.scrollbarVDynamic = false;
    this.scrollbarH = false;
    this.rowHeight = 30;
    this.columnMode = ColumnMode.standard;
    this.headerHeight = 30;
    this.footerHeight = 0;
    this.externalPaging = false;
    this.externalSorting = false;
    this.loadingIndicator = false;
    this.reorderable = true;
    this.swapColumns = true;
    this.sortType = SortType.single;
    this.sorts = [];
    this.cssClasses = {
      sortAscending: "datatable-icon-up",
      sortDescending: "datatable-icon-down",
      sortUnset: "datatable-icon-sort-unset",
      pagerLeftArrow: "datatable-icon-left",
      pagerRightArrow: "datatable-icon-right",
      pagerPrevious: "datatable-icon-prev",
      pagerNext: "datatable-icon-skip"
    };
    this.messages = {
      // Message to show when array is presented
      // but contains no values
      emptyMessage: "No data to display",
      // Footer total message
      totalMessage: "total",
      // Footer selected message
      selectedMessage: "selected"
    };
    this.groupExpansionDefault = false;
    this.selectAllRowsOnPage = false;
    this.virtualization = true;
    this.summaryRow = false;
    this.summaryHeight = 30;
    this.summaryPosition = "top";
    this.rowDraggable = false;
    this.enableClearingSortState = false;
    this.scroll = new EventEmitter();
    this.activate = new EventEmitter();
    this.select = new EventEmitter();
    this.sort = new EventEmitter();
    this.page = new EventEmitter();
    this.reorder = new EventEmitter();
    this.resize = new EventEmitter();
    this.tableContextmenu = new EventEmitter(false);
    this.treeAction = new EventEmitter();
    this.rowDragEvents = new EventEmitter();
    this.element = inject(ElementRef).nativeElement;
    this.rowCount = 0;
    this.rowDiffer = inject(IterableDiffers).find([]).create();
    this._offsetX = new import_rxjs.BehaviorSubject(0);
    this._count = 0;
    this._offset = 0;
    this._subscriptions = [];
    this._ghostLoadingIndicator = false;
    this.verticalScrollVisible = false;
    this._rowInitDone = signal(false);
    this.rowIdentity = (x) => {
      if (this._groupRowsBy) {
        return x.key ?? x;
      } else {
        return x;
      }
    };
    if (this.configuration) {
      if (this.configuration.messages) {
        this.messages = __spreadValues({}, this.configuration.messages);
      }
      if (this.configuration.cssClasses) {
        this.cssClasses = __spreadValues({}, this.configuration.cssClasses);
      }
      this.headerHeight = this.configuration.headerHeight ?? this.headerHeight;
      this.footerHeight = this.configuration.footerHeight ?? this.footerHeight;
      this.rowHeight = this.configuration.rowHeight ?? this.rowHeight;
      this._defaultColumnWidth = this.configuration.defaultColumnWidth ?? 150;
    }
  }
  /**
   * Lifecycle hook that is called after data-bound
   * properties of a directive are initialized.
   */
  ngOnInit() {
    this.recalculate();
  }
  /**
   * Lifecycle hook that is called after a component's
   * view has been fully initialized.
   */
  ngAfterViewInit() {
    if (typeof requestAnimationFrame === "undefined") {
      return;
    }
    requestAnimationFrame(() => {
      this.recalculate();
      if (this.externalPaging && this.scrollbarV) {
        this.page.emit({
          count: this.count,
          pageSize: this.pageSize,
          limit: this.limit,
          offset: 0
        });
      }
    });
  }
  /**
   * Lifecycle hook that is called after a component's
   * content has been fully initialized.
   */
  ngAfterContentInit() {
    if (this.columnTemplates.length) {
      this.translateColumns(this.columnTemplates);
    }
    this._subscriptions.push(this.columnTemplates.changes.subscribe((v) => this.translateColumns(v)));
    this.listenForColumnInputChanges();
  }
  /**
   * Translates the templates to the column objects
   */
  translateColumns(val) {
    if (val) {
      const arr = val.toArray();
      if (arr.length) {
        this._internalColumns = translateTemplates(arr);
        setColumnDefaults(this._internalColumns, this._defaultColumnWidth);
        this.recalculateColumns();
        if (!this.externalSorting && this.rows?.length) {
          this.sortInternalRows();
        }
        this.cd.markForCheck();
      }
    }
  }
  /**
   * Creates a map with the data grouped by the user choice of grouping index
   *
   * @param originalArray the original array passed via parameter
   * @param groupBy the key of the column to group the data by
   */
  groupArrayBy(originalArray, groupBy) {
    const map = /* @__PURE__ */ new Map();
    let i = 0;
    originalArray.forEach((item) => {
      const key = item[groupBy];
      if (!map.has(key)) {
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
      i++;
    });
    const addGroup = (key, value) => ({
      key,
      value
    });
    return Array.from(map, (x) => addGroup(x[0], x[1]));
  }
  /*
   * Lifecycle hook that is called when Angular dirty checks a directive.
   */
  ngDoCheck() {
    const rowDiffers = this.rowDiffer.diff(this.rows);
    if (rowDiffers || this.disableRowCheck) {
      if (!this.ghostLoadingIndicator && !this.externalSorting && this._internalColumns) {
        this.sortInternalRows();
      } else {
        this._internalRows = [...this.rows];
      }
      this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
      if (this._rows && this._groupRowsBy) {
        this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
      }
      if (rowDiffers) {
        queueMicrotask(() => {
          this._rowInitDone.set(true);
          this.recalculate();
          this.cd.markForCheck();
        });
      }
      this.recalculatePages();
      this.cd.markForCheck();
    }
  }
  /**
   * Recalc's the sizes of the grid.
   *
   * Updated automatically on changes to:
   *
   *  - Columns
   *  - Rows
   *  - Paging related
   *
   * Also can be manually invoked or upon window resize.
   */
  recalculate() {
    this.recalculateDims();
    this.recalculateColumns();
    this.cd.markForCheck();
  }
  /**
   * Window resize handler to update sizes.
   */
  onWindowResize() {
    this.recalculate();
  }
  /**
   * Recalulcates the column widths based on column width
   * distribution mode and scrollbar offsets.
   */
  recalculateColumns(columns = this._internalColumns, forceIdx = -1, allowBleed = this.scrollbarH) {
    let width = this._innerWidth;
    if (!columns || !width) {
      return void 0;
    }
    const bodyElement = this.bodyElement?.nativeElement;
    this.verticalScrollVisible = bodyElement?.scrollHeight > bodyElement?.clientHeight;
    if (this.scrollbarV || this.scrollbarVDynamic) {
      width = width - (this.verticalScrollVisible || !this._rowInitDone() ? this.scrollbarHelper.width : 0);
    }
    if (this.columnMode === ColumnMode.force) {
      forceFillColumnWidths(columns, width, forceIdx, allowBleed, this._defaultColumnWidth, this.scrollbarHelper.width);
    } else if (this.columnMode === ColumnMode.flex) {
      adjustColumnWidths(columns, width);
    }
    if (this.bodyComponent && this.bodyComponent.columnGroupWidths.total !== width) {
      this.bodyComponent.columns = [...this._internalColumns];
      this.bodyComponent.cd.markForCheck();
    }
    if (this.headerComponent && this.headerComponent._columnGroupWidths.total !== width) {
      this.headerComponent.columns = [...this._internalColumns];
    }
    return columns;
  }
  /**
   * Recalculates the dimensions of the table size.
   * Internally calls the page size and row count calcs too.
   *
   */
  recalculateDims() {
    const dims = this.element.getBoundingClientRect();
    this._innerWidth = Math.floor(dims.width);
    if (this.scrollbarV) {
      let height = dims.height;
      if (this.headerHeight) {
        height = height - this.headerHeight;
      }
      if (this.footerHeight) {
        height = height - this.footerHeight;
      }
      this.bodyHeight = height;
    }
    this.recalculatePages();
  }
  /**
   * Recalculates the pages after a update.
   */
  recalculatePages() {
    this.pageSize = this.calcPageSize();
    this.rowCount = this.calcRowCount();
  }
  /**
   * Body triggered a page event.
   */
  onBodyPage(offset) {
    if (this.externalPaging && !this.virtualization) {
      return;
    }
    this.offset = offset;
    if (!isNaN(this.offset)) {
      this.page.emit({
        count: this.count,
        pageSize: this.pageSize,
        limit: this.limit,
        offset: this.offset
      });
    }
  }
  /**
   * The body triggered a scroll event.
   */
  onBodyScroll(event) {
    this._offsetX.next(event.offsetX);
    this.scroll.emit(event);
    this.cd.detectChanges();
  }
  /**
   * The footer triggered a page event.
   */
  onFooterPage(event) {
    this.offset = event.page - 1;
    this.bodyComponent.updateOffsetY(this.offset);
    this.page.emit({
      count: this.count,
      pageSize: this.pageSize,
      limit: this.limit,
      offset: this.offset
    });
    if (this.selectAllRowsOnPage) {
      this.selected = [];
      this.select.emit({
        selected: this.selected
      });
    }
  }
  /**
   * Recalculates the sizes of the page
   */
  calcPageSize() {
    if (this.scrollbarV && this.virtualization) {
      const size = Math.ceil(this.bodyHeight / this.rowHeight);
      return Math.max(size, 0);
    }
    if (this.limit !== void 0) {
      return this.limit;
    }
    if (this.rows) {
      return this.rows.length;
    }
    return 0;
  }
  /**
   * Calculates the row count.
   */
  calcRowCount() {
    if (!this.externalPaging) {
      if (!this.rows) {
        return 0;
      }
      if (this.groupedRows) {
        return this.groupedRows.length;
      } else if (this.treeFromRelation != null && this.treeToRelation != null) {
        return this._internalRows.length;
      } else {
        return this.rows.length;
      }
    }
    return this.count;
  }
  /**
   * The header triggered a contextmenu event.
   */
  onColumnContextmenu({
    event,
    column
  }) {
    this.tableContextmenu.emit({
      event,
      type: ContextmenuType.header,
      content: column
    });
  }
  /**
   * The body triggered a contextmenu event.
   */
  onRowContextmenu({
    event,
    row
  }) {
    this.tableContextmenu.emit({
      event,
      type: ContextmenuType.body,
      content: row
    });
  }
  /**
   * The header triggered a column resize event.
   */
  onColumnResize({
    column,
    newValue,
    prevValue
  }) {
    if (column === void 0) {
      return;
    }
    let idx;
    const cols = this._internalColumns.map((c, i) => {
      c = __spreadValues({}, c);
      if (c.$$id === column.$$id) {
        idx = i;
        c.width = newValue;
        c.$$oldWidth = newValue;
      }
      return c;
    });
    this.recalculateColumns(cols, idx);
    this._internalColumns = cols;
    this.resize.emit({
      column,
      newValue,
      prevValue
    });
  }
  onColumnResizing({
    column,
    newValue
  }) {
    if (column === void 0) {
      return;
    }
    column.width = newValue;
    column.$$oldWidth = newValue;
    const idx = this._internalColumns.indexOf(column);
    this.recalculateColumns(this._internalColumns, idx);
  }
  /**
   * The header triggered a column re-order event.
   */
  onColumnReorder({
    column,
    newValue,
    prevValue
  }) {
    const cols = this._internalColumns.map((c) => __spreadValues({}, c));
    if (this.swapColumns) {
      const prevCol = cols[newValue];
      cols[newValue] = column;
      cols[prevValue] = prevCol;
    } else {
      if (newValue > prevValue) {
        const movedCol = cols[prevValue];
        for (let i = prevValue; i < newValue; i++) {
          cols[i] = cols[i + 1];
        }
        cols[newValue] = movedCol;
      } else {
        const movedCol = cols[prevValue];
        for (let i = prevValue; i > newValue; i--) {
          cols[i] = cols[i - 1];
        }
        cols[newValue] = movedCol;
      }
    }
    this._internalColumns = cols;
    this.reorder.emit({
      column,
      newValue,
      prevValue
    });
  }
  /**
   * The header triggered a column sort event.
   */
  onColumnSort(event) {
    if (this.selectAllRowsOnPage) {
      this.selected = [];
      this.select.emit({
        selected: this.selected
      });
    }
    this.sorts = event.sorts;
    if (this.externalSorting === false) {
      this.sortInternalRows();
    }
    this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
    this.offset = 0;
    this.bodyComponent.updateOffsetY(this.offset);
    this.page.emit({
      count: this.count,
      pageSize: this.pageSize,
      limit: this.limit,
      offset: this.offset
    });
    this.sort.emit(event);
  }
  /**
   * Toggle all row selection
   */
  onHeaderSelect() {
    if (this.bodyComponent && this.selectAllRowsOnPage) {
      const first = this.bodyComponent.indexes().first;
      const last = this.bodyComponent.indexes().last;
      const allSelected = this.selected.length === last - first;
      this.selected = [];
      if (!allSelected) {
        this.selected.push(...this._internalRows.slice(first, last));
      }
    } else {
      let relevantRows;
      if (this.disableRowCheck) {
        relevantRows = this.rows.filter((row) => !this.disableRowCheck(row));
      } else {
        relevantRows = this.rows;
      }
      const allSelected = this.selected.length === relevantRows.length;
      this.selected = [];
      if (!allSelected) {
        this.selected.push(...relevantRows);
      }
    }
    this.select.emit({
      selected: this.selected
    });
  }
  /**
   * A row was selected from body
   */
  onBodySelect(event) {
    this.select.emit(event);
  }
  /**
   * A row was expanded or collapsed for tree
   */
  onTreeAction(event) {
    const row = event.row;
    const rowIndex = this._rows.findIndex((r) => r[this.treeToRelation] === event.row[this.treeToRelation]);
    this.treeAction.emit({
      row,
      rowIndex
    });
  }
  ngOnDestroy() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  /**
   * listen for changes to input bindings of all DataTableColumnDirective and
   * trigger the columnTemplates.changes observable to emit
   */
  listenForColumnInputChanges() {
    this._subscriptions.push(this.columnChangesService.columnInputChanges$.subscribe(() => {
      if (this.columnTemplates) {
        this.columnTemplates.notifyOnChanges();
      }
    }));
  }
  sortInternalRows() {
    if (!this.sorts || !this.sorts?.length) {
      this._internalRows = this._rows;
      if (this.treeFromRelation && this.treeToRelation) {
        this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
      }
    }
    if (this.groupedRows && this.groupedRows.length) {
      const sortOnGroupHeader = this.sorts?.find((sortColumns) => sortColumns.prop === this._groupRowsBy);
      this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
      this.groupedRows = sortGroupedRows(this.groupedRows, this._internalColumns, this.sorts, sortOnGroupHeader);
      this._internalRows = [...this._internalRows];
    } else {
      this._internalRows = sortRows(this._internalRows, this._internalColumns, this.sorts);
    }
  }
  static {
    this.ɵfac = function DatatableComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DatatableComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DatatableComponent,
      selectors: [["ngx-datatable"]],
      contentQueries: function DatatableComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, DatatableRowDetailDirective, 5);
          ɵɵcontentQuery(dirIndex, DatatableGroupHeaderDirective, 5);
          ɵɵcontentQuery(dirIndex, DatatableFooterDirective, 5);
          ɵɵcontentQuery(dirIndex, DatatableRowDefDirective, 5, TemplateRef);
          ɵɵcontentQuery(dirIndex, DataTableColumnDirective, 4);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.rowDetail = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.groupHeader = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footer = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.rowDefTemplate = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.columnTemplates = _t);
        }
      },
      viewQuery: function DatatableComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(DataTableBodyComponent, 5);
          ɵɵviewQuery(DataTableHeaderComponent, 5);
          ɵɵviewQuery(DataTableBodyComponent, 5, ElementRef);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.bodyComponent = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerComponent = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.bodyElement = _t.first);
        }
      },
      hostAttrs: [1, "ngx-datatable"],
      hostVars: 22,
      hostBindings: function DatatableComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("resize", function DatatableComponent_resize_HostBindingHandler() {
            return ctx.onWindowResize();
          }, false, ɵɵresolveWindow);
        }
        if (rf & 2) {
          ɵɵclassProp("fixed-header", ctx.isFixedHeader)("fixed-row", ctx.isFixedRow)("scroll-vertical", ctx.isVertScroll)("virtualized", ctx.isVirtualized)("scroll-horz", ctx.isHorScroll)("selectable", ctx.isSelectable)("checkbox-selection", ctx.isCheckboxSelection)("cell-selection", ctx.isCellSelection)("single-selection", ctx.isSingleSelection)("multi-selection", ctx.isMultiSelection)("multi-click-selection", ctx.isMultiClickSelection);
        }
      },
      inputs: {
        targetMarkerTemplate: "targetMarkerTemplate",
        rows: "rows",
        groupRowsBy: "groupRowsBy",
        groupedRows: "groupedRows",
        columns: "columns",
        selected: "selected",
        scrollbarV: [2, "scrollbarV", "scrollbarV", booleanAttribute],
        scrollbarVDynamic: [2, "scrollbarVDynamic", "scrollbarVDynamic", booleanAttribute],
        scrollbarH: [2, "scrollbarH", "scrollbarH", booleanAttribute],
        rowHeight: "rowHeight",
        columnMode: "columnMode",
        headerHeight: [2, "headerHeight", "headerHeight", numberAttribute],
        footerHeight: [2, "footerHeight", "footerHeight", numberAttribute],
        externalPaging: [2, "externalPaging", "externalPaging", booleanAttribute],
        externalSorting: [2, "externalSorting", "externalSorting", booleanAttribute],
        limit: [2, "limit", "limit", numberAttribute],
        count: [2, "count", "count", numberAttribute],
        offset: [2, "offset", "offset", numberAttribute],
        loadingIndicator: [2, "loadingIndicator", "loadingIndicator", booleanAttribute],
        ghostLoadingIndicator: [2, "ghostLoadingIndicator", "ghostLoadingIndicator", booleanAttribute],
        selectionType: "selectionType",
        reorderable: [2, "reorderable", "reorderable", booleanAttribute],
        swapColumns: [2, "swapColumns", "swapColumns", booleanAttribute],
        sortType: "sortType",
        sorts: "sorts",
        cssClasses: "cssClasses",
        messages: "messages",
        rowClass: "rowClass",
        selectCheck: "selectCheck",
        displayCheck: "displayCheck",
        groupExpansionDefault: [2, "groupExpansionDefault", "groupExpansionDefault", booleanAttribute],
        trackByProp: "trackByProp",
        selectAllRowsOnPage: [2, "selectAllRowsOnPage", "selectAllRowsOnPage", booleanAttribute],
        virtualization: [2, "virtualization", "virtualization", booleanAttribute],
        treeFromRelation: "treeFromRelation",
        treeToRelation: "treeToRelation",
        summaryRow: [2, "summaryRow", "summaryRow", booleanAttribute],
        summaryHeight: [2, "summaryHeight", "summaryHeight", numberAttribute],
        summaryPosition: "summaryPosition",
        disableRowCheck: "disableRowCheck",
        rowDraggable: [2, "rowDraggable", "rowDraggable", booleanAttribute],
        enableClearingSortState: [2, "enableClearingSortState", "enableClearingSortState", booleanAttribute],
        rowIdentity: "rowIdentity"
      },
      outputs: {
        scroll: "scroll",
        activate: "activate",
        select: "select",
        sort: "sort",
        page: "page",
        reorder: "reorder",
        resize: "resize",
        tableContextmenu: "tableContextmenu",
        treeAction: "treeAction",
        rowDragEvents: "rowDragEvents"
      },
      standalone: true,
      features: [ɵɵProvidersFeature([{
        provide: DatatableComponentToken,
        useExisting: _DatatableComponent
      }, ColumnChangesService]), ɵɵInputTransformsFeature, ɵɵStandaloneFeature],
      ngContentSelectors: _c8,
      decls: 10,
      vars: 39,
      consts: [["visibilityObserver", "", 3, "visible"], ["role", "table"], ["role", "rowgroup", 3, "sorts", "sortType", "scrollbarH", "innerWidth", "offsetX", "dealsWithGroup", "columns", "headerHeight", "reorderable", "targetMarkerTemplate", "sortAscendingIcon", "sortDescendingIcon", "sortUnsetIcon", "allRowsSelected", "selectionType", "verticalScrollVisible", "enableClearingSortState"], ["tabindex", "0", "role", "rowgroup", 3, "page", "activate", "rowContextmenu", "select", "scroll", "treeAction", "groupRowsBy", "groupedRows", "rows", "groupExpansionDefault", "scrollbarV", "scrollbarH", "virtualization", "loadingIndicator", "ghostLoadingIndicator", "externalPaging", "rowHeight", "rowCount", "offset", "trackByProp", "columns", "pageSize", "offsetX", "rowDetail", "groupHeader", "selected", "innerWidth", "bodyHeight", "selectionType", "rowIdentity", "rowClass", "selectCheck", "displayCheck", "summaryRow", "summaryHeight", "summaryPosition", "verticalScrollVisible", "disableRowCheck", "rowDraggable", "rowDragEvents", "rowDefTemplate"], [3, "rowCount", "pageSize", "offset", "footerHeight", "footerTemplate", "totalMessage", "pagerLeftArrowIcon", "pagerRightArrowIcon", "pagerPreviousIcon", "selectedCount", "selectedMessage", "pagerNextIcon"], ["role", "rowgroup", 3, "sort", "resize", "resizing", "reorder", "select", "columnContextmenu", "sorts", "sortType", "scrollbarH", "innerWidth", "offsetX", "dealsWithGroup", "columns", "headerHeight", "reorderable", "targetMarkerTemplate", "sortAscendingIcon", "sortDescendingIcon", "sortUnsetIcon", "allRowsSelected", "selectionType", "verticalScrollVisible", "enableClearingSortState"], [1, "empty-row", 3, "innerHTML"], [3, "page", "rowCount", "pageSize", "offset", "footerHeight", "footerTemplate", "totalMessage", "pagerLeftArrowIcon", "pagerRightArrowIcon", "pagerPreviousIcon", "selectedCount", "selectedMessage", "pagerNextIcon"]],
      template: function DatatableComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c7);
          ɵɵelementStart(0, "div", 0);
          ɵɵlistener("visible", function DatatableComponent_Template_div_visible_0_listener() {
            return ctx.recalculate();
          });
          ɵɵelementStart(1, "div", 1);
          ɵɵtemplate(2, DatatableComponent_Conditional_2_Template, 2, 19, "datatable-header", 2);
          ɵɵelementStart(3, "datatable-body", 3);
          ɵɵpipe(4, "async");
          ɵɵlistener("page", function DatatableComponent_Template_datatable_body_page_3_listener($event) {
            return ctx.onBodyPage($event);
          })("activate", function DatatableComponent_Template_datatable_body_activate_3_listener($event) {
            return ctx.activate.emit($event);
          })("rowContextmenu", function DatatableComponent_Template_datatable_body_rowContextmenu_3_listener($event) {
            return ctx.onRowContextmenu($event);
          })("select", function DatatableComponent_Template_datatable_body_select_3_listener($event) {
            return ctx.onBodySelect($event);
          })("scroll", function DatatableComponent_Template_datatable_body_scroll_3_listener($event) {
            return ctx.onBodyScroll($event);
          })("treeAction", function DatatableComponent_Template_datatable_body_treeAction_3_listener($event) {
            return ctx.onTreeAction($event);
          });
          ɵɵprojection(5, 0, ["ngProjectAs", "[loading-indicator]", 5, ["", "loading-indicator", ""]], DatatableComponent_ProjectionFallback_5_Template, 1, 0);
          ɵɵprojection(7, 1, ["ngProjectAs", "[empty-content]", 5, ["", "empty-content", ""]], DatatableComponent_ProjectionFallback_7_Template, 1, 1);
          ɵɵelementEnd()();
          ɵɵtemplate(9, DatatableComponent_Conditional_9_Template, 1, 12, "datatable-footer", 4);
          ɵɵelementEnd();
        }
        if (rf & 2) {
          ɵɵadvance(2);
          ɵɵconditional(ctx.headerHeight ? 2 : -1);
          ɵɵadvance();
          ɵɵproperty("groupRowsBy", ctx.groupRowsBy)("groupedRows", ctx.groupedRows)("rows", ctx._internalRows)("groupExpansionDefault", ctx.groupExpansionDefault)("scrollbarV", ctx.scrollbarV)("scrollbarH", ctx.scrollbarH)("virtualization", ctx.virtualization)("loadingIndicator", ctx.loadingIndicator)("ghostLoadingIndicator", ctx.ghostLoadingIndicator)("externalPaging", ctx.externalPaging)("rowHeight", ctx.rowHeight)("rowCount", ctx.rowCount)("offset", ctx.offset)("trackByProp", ctx.trackByProp)("columns", ctx._internalColumns)("pageSize", ctx.pageSize)("offsetX", ɵɵpipeBind1(4, 37, ctx._offsetX))("rowDetail", ctx.rowDetail)("groupHeader", ctx.groupHeader)("selected", ctx.selected)("innerWidth", ctx._innerWidth)("bodyHeight", ctx.bodyHeight)("selectionType", ctx.selectionType)("rowIdentity", ctx.rowIdentity)("rowClass", ctx.rowClass)("selectCheck", ctx.selectCheck)("displayCheck", ctx.displayCheck)("summaryRow", ctx.summaryRow)("summaryHeight", ctx.summaryHeight)("summaryPosition", ctx.summaryPosition)("verticalScrollVisible", ctx.verticalScrollVisible)("disableRowCheck", ctx.disableRowCheck)("rowDraggable", ctx.rowDraggable)("rowDragEvents", ctx.rowDragEvents)("rowDefTemplate", ctx.rowDefTemplate);
          ɵɵadvance(6);
          ɵɵconditional(ctx.footerHeight ? 9 : -1);
        }
      },
      dependencies: [VisibilityDirective, DataTableHeaderComponent, DataTableBodyComponent, DataTableFooterComponent, AsyncPipe, ProgressBarComponent],
      styles: [".ngx-datatable{display:block;overflow:hidden;justify-content:center;position:relative;transform:translateZ(0)}.ngx-datatable [hidden]{display:none!important}.ngx-datatable *,.ngx-datatable *:before,.ngx-datatable *:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ngx-datatable.scroll-vertical .datatable-body{overflow-y:auto}.ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper{position:absolute}.ngx-datatable.scroll-horz .datatable-body{overflow-x:auto;-webkit-overflow-scrolling:touch}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner{white-space:nowrap}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-datatable.fixed-row .datatable-scroll,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row{white-space:nowrap}.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ngx-datatable .datatable-body-row,.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-header-inner{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;flex-direction:row;-webkit-flex-flow:row;-moz-flex-flow:row;-ms-flex-flow:row;-o-flex-flow:row;flex-flow:row}.ngx-datatable .datatable-body-cell,.ngx-datatable .datatable-header-cell{overflow-x:hidden;vertical-align:top;display:inline-block;line-height:1.625}.ngx-datatable .datatable-body-cell:focus,.ngx-datatable .datatable-header-cell:focus{outline:none}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-right,.ngx-datatable .datatable-group-header{z-index:9;position:sticky!important}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-group-header{left:0}.ngx-datatable .datatable-row-right{right:0}.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-row-group{position:relative}.ngx-datatable .datatable-header{display:block;overflow:hidden}.ngx-datatable .datatable-header .datatable-header-inner{align-items:stretch;-webkit-align-items:stretch}.ngx-datatable .datatable-header .datatable-header-cell{position:relative;display:inline-block}.ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper{cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper{cursor:move}.ngx-datatable .datatable-header .datatable-header-cell .sort-btn{line-height:100%;vertical-align:middle;display:inline-block;cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable{display:inline-block;position:absolute;right:0;top:0;bottom:0;width:5px;padding:0 4px;visibility:hidden}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle{cursor:ew-resize}.ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable{visibility:visible}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker{position:absolute;top:0;bottom:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft{right:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight{left:0}.ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap{height:inherit}.ngx-datatable .datatable-body{position:relative;z-index:10;display:block;overflow:hidden}.ngx-datatable .datatable-body .datatable-scroll{display:inline-block}.ngx-datatable .datatable-body .datatable-row-detail{overflow-y:hidden}.ngx-datatable .datatable-body .datatable-row-wrapper{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ngx-datatable .datatable-body .datatable-body-row{outline:none}.ngx-datatable .datatable-body .datatable-body-row>div{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.ngx-datatable .datatable-footer{display:block;width:100%;overflow:auto}.ngx-datatable .datatable-footer .datatable-footer-inner{display:flex;align-items:center;width:100%}.ngx-datatable .datatable-footer .selected-count .page-count{flex:1 1 40%}.ngx-datatable .datatable-footer .selected-count .datatable-pager{flex:1 1 60%}.ngx-datatable .datatable-footer .page-count{flex:1 1 20%}.ngx-datatable .datatable-footer .datatable-pager{flex:1 1 80%;text-align:right}.ngx-datatable .datatable-footer .datatable-pager .pager,.ngx-datatable .datatable-footer .datatable-pager .pager li{padding:0;margin:0;display:inline-block;list-style:none}.ngx-datatable .datatable-footer .datatable-pager .pager li,.ngx-datatable .datatable-footer .datatable-pager .pager li a{outline:none}.ngx-datatable .datatable-footer .datatable-pager .pager li a{cursor:pointer;display:inline-block}.ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a{cursor:not-allowed}\n"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
__decorate([throttleable(5)], DatatableComponent.prototype, "onWindowResize", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableComponent, [{
    type: Component,
    args: [{
      selector: "ngx-datatable",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        class: "ngx-datatable"
      },
      providers: [{
        provide: DatatableComponentToken,
        useExisting: DatatableComponent
      }, ColumnChangesService],
      imports: [VisibilityDirective, DataTableHeaderComponent, DataTableBodyComponent, DataTableFooterComponent, AsyncPipe, ProgressBarComponent],
      template: '<div visibilityObserver (visible)="recalculate()">\n  <div role="table">\n    @if (headerHeight) {\n      <datatable-header\n        role="rowgroup"\n        [sorts]="sorts"\n        [sortType]="sortType"\n        [scrollbarH]="scrollbarH"\n        [innerWidth]="_innerWidth"\n        [offsetX]="_offsetX | async"\n        [dealsWithGroup]="groupedRows !== undefined"\n        [columns]="_internalColumns"\n        [headerHeight]="headerHeight"\n        [reorderable]="reorderable"\n        [targetMarkerTemplate]="targetMarkerTemplate"\n        [sortAscendingIcon]="cssClasses.sortAscending"\n        [sortDescendingIcon]="cssClasses.sortDescending"\n        [sortUnsetIcon]="cssClasses.sortUnset"\n        [allRowsSelected]="allRowsSelected"\n        [selectionType]="selectionType"\n        [verticalScrollVisible]="verticalScrollVisible"\n        [enableClearingSortState]="enableClearingSortState"\n        (sort)="onColumnSort($event)"\n        (resize)="onColumnResize($event)"\n        (resizing)="onColumnResizing($event)"\n        (reorder)="onColumnReorder($event)"\n        (select)="onHeaderSelect()"\n        (columnContextmenu)="onColumnContextmenu($event)"\n      >\n      </datatable-header>\n    }\n    <datatable-body\n      tabindex="0"\n      role="rowgroup"\n      [groupRowsBy]="groupRowsBy"\n      [groupedRows]="groupedRows"\n      [rows]="_internalRows"\n      [groupExpansionDefault]="groupExpansionDefault"\n      [scrollbarV]="scrollbarV"\n      [scrollbarH]="scrollbarH"\n      [virtualization]="virtualization"\n      [loadingIndicator]="loadingIndicator"\n      [ghostLoadingIndicator]="ghostLoadingIndicator"\n      [externalPaging]="externalPaging"\n      [rowHeight]="rowHeight"\n      [rowCount]="rowCount"\n      [offset]="offset"\n      [trackByProp]="trackByProp"\n      [columns]="_internalColumns"\n      [pageSize]="pageSize"\n      [offsetX]="_offsetX | async"\n      [rowDetail]="rowDetail"\n      [groupHeader]="groupHeader"\n      [selected]="selected"\n      [innerWidth]="_innerWidth"\n      [bodyHeight]="bodyHeight"\n      [selectionType]="selectionType"\n      [rowIdentity]="rowIdentity"\n      [rowClass]="rowClass"\n      [selectCheck]="selectCheck"\n      [displayCheck]="displayCheck"\n      [summaryRow]="summaryRow"\n      [summaryHeight]="summaryHeight"\n      [summaryPosition]="summaryPosition"\n      [verticalScrollVisible]="verticalScrollVisible"\n      (page)="onBodyPage($event)"\n      (activate)="activate.emit($event)"\n      (rowContextmenu)="onRowContextmenu($event)"\n      (select)="onBodySelect($event)"\n      (scroll)="onBodyScroll($event)"\n      (treeAction)="onTreeAction($event)"\n      [disableRowCheck]="disableRowCheck"\n      [rowDraggable]="rowDraggable"\n      [rowDragEvents]="rowDragEvents"\n      [rowDefTemplate]="rowDefTemplate"\n    >\n      <ng-content select="[loading-indicator]" ngProjectAs="[loading-indicator]">\n        <datatable-progress></datatable-progress>\n      </ng-content>\n      <ng-content select="[empty-content]" ngProjectAs="[empty-content]">\n        <div class="empty-row" [innerHTML]="messages.emptyMessage"></div>\n      </ng-content>\n    </datatable-body>\n  </div>\n  @if (footerHeight) {\n    <datatable-footer\n      [rowCount]="groupedRows !== undefined ? _internalRows.length : rowCount"\n      [pageSize]="pageSize"\n      [offset]="offset"\n      [footerHeight]="footerHeight"\n      [footerTemplate]="footer"\n      [totalMessage]="messages.totalMessage"\n      [pagerLeftArrowIcon]="cssClasses.pagerLeftArrow"\n      [pagerRightArrowIcon]="cssClasses.pagerRightArrow"\n      [pagerPreviousIcon]="cssClasses.pagerPrevious"\n      [selectedCount]="selected.length"\n      [selectedMessage]="!!selectionType && messages.selectedMessage"\n      [pagerNextIcon]="cssClasses.pagerNext"\n      (page)="onFooterPage($event)"\n    >\n    </datatable-footer>\n  }\n</div>\n',
      styles: [".ngx-datatable{display:block;overflow:hidden;justify-content:center;position:relative;transform:translateZ(0)}.ngx-datatable [hidden]{display:none!important}.ngx-datatable *,.ngx-datatable *:before,.ngx-datatable *:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ngx-datatable.scroll-vertical .datatable-body{overflow-y:auto}.ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper{position:absolute}.ngx-datatable.scroll-horz .datatable-body{overflow-x:auto;-webkit-overflow-scrolling:touch}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner{white-space:nowrap}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-datatable.fixed-row .datatable-scroll,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row{white-space:nowrap}.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ngx-datatable .datatable-body-row,.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-header-inner{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;flex-direction:row;-webkit-flex-flow:row;-moz-flex-flow:row;-ms-flex-flow:row;-o-flex-flow:row;flex-flow:row}.ngx-datatable .datatable-body-cell,.ngx-datatable .datatable-header-cell{overflow-x:hidden;vertical-align:top;display:inline-block;line-height:1.625}.ngx-datatable .datatable-body-cell:focus,.ngx-datatable .datatable-header-cell:focus{outline:none}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-right,.ngx-datatable .datatable-group-header{z-index:9;position:sticky!important}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-group-header{left:0}.ngx-datatable .datatable-row-right{right:0}.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-row-group{position:relative}.ngx-datatable .datatable-header{display:block;overflow:hidden}.ngx-datatable .datatable-header .datatable-header-inner{align-items:stretch;-webkit-align-items:stretch}.ngx-datatable .datatable-header .datatable-header-cell{position:relative;display:inline-block}.ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper{cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper{cursor:move}.ngx-datatable .datatable-header .datatable-header-cell .sort-btn{line-height:100%;vertical-align:middle;display:inline-block;cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable{display:inline-block;position:absolute;right:0;top:0;bottom:0;width:5px;padding:0 4px;visibility:hidden}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle{cursor:ew-resize}.ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable{visibility:visible}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker{position:absolute;top:0;bottom:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft{right:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight{left:0}.ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap{height:inherit}.ngx-datatable .datatable-body{position:relative;z-index:10;display:block;overflow:hidden}.ngx-datatable .datatable-body .datatable-scroll{display:inline-block}.ngx-datatable .datatable-body .datatable-row-detail{overflow-y:hidden}.ngx-datatable .datatable-body .datatable-row-wrapper{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ngx-datatable .datatable-body .datatable-body-row{outline:none}.ngx-datatable .datatable-body .datatable-body-row>div{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.ngx-datatable .datatable-footer{display:block;width:100%;overflow:auto}.ngx-datatable .datatable-footer .datatable-footer-inner{display:flex;align-items:center;width:100%}.ngx-datatable .datatable-footer .selected-count .page-count{flex:1 1 40%}.ngx-datatable .datatable-footer .selected-count .datatable-pager{flex:1 1 60%}.ngx-datatable .datatable-footer .page-count{flex:1 1 20%}.ngx-datatable .datatable-footer .datatable-pager{flex:1 1 80%;text-align:right}.ngx-datatable .datatable-footer .datatable-pager .pager,.ngx-datatable .datatable-footer .datatable-pager .pager li{padding:0;margin:0;display:inline-block;list-style:none}.ngx-datatable .datatable-footer .datatable-pager .pager li,.ngx-datatable .datatable-footer .datatable-pager .pager li a{outline:none}.ngx-datatable .datatable-footer .datatable-pager .pager li a{cursor:pointer;display:inline-block}.ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a{cursor:not-allowed}\n"]
    }]
  }], () => [], {
    targetMarkerTemplate: [{
      type: Input
    }],
    rows: [{
      type: Input
    }],
    groupRowsBy: [{
      type: Input
    }],
    groupedRows: [{
      type: Input
    }],
    columns: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    scrollbarV: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    scrollbarVDynamic: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    scrollbarH: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    rowHeight: [{
      type: Input
    }],
    columnMode: [{
      type: Input
    }],
    headerHeight: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    footerHeight: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    externalPaging: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    externalSorting: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    limit: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    count: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    offset: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    loadingIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ghostLoadingIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectionType: [{
      type: Input
    }],
    reorderable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    swapColumns: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    sortType: [{
      type: Input
    }],
    sorts: [{
      type: Input
    }],
    cssClasses: [{
      type: Input
    }],
    messages: [{
      type: Input
    }],
    rowClass: [{
      type: Input
    }],
    selectCheck: [{
      type: Input
    }],
    displayCheck: [{
      type: Input
    }],
    groupExpansionDefault: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    trackByProp: [{
      type: Input
    }],
    selectAllRowsOnPage: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    virtualization: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    treeFromRelation: [{
      type: Input
    }],
    treeToRelation: [{
      type: Input
    }],
    summaryRow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    summaryHeight: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    summaryPosition: [{
      type: Input
    }],
    disableRowCheck: [{
      type: Input
    }],
    rowDraggable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    enableClearingSortState: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    scroll: [{
      type: Output
    }],
    activate: [{
      type: Output
    }],
    select: [{
      type: Output
    }],
    sort: [{
      type: Output
    }],
    page: [{
      type: Output
    }],
    reorder: [{
      type: Output
    }],
    resize: [{
      type: Output
    }],
    tableContextmenu: [{
      type: Output
    }],
    treeAction: [{
      type: Output
    }],
    rowDragEvents: [{
      type: Output
    }],
    isFixedHeader: [{
      type: HostBinding,
      args: ["class.fixed-header"]
    }],
    isFixedRow: [{
      type: HostBinding,
      args: ["class.fixed-row"]
    }],
    isVertScroll: [{
      type: HostBinding,
      args: ["class.scroll-vertical"]
    }],
    isVirtualized: [{
      type: HostBinding,
      args: ["class.virtualized"]
    }],
    isHorScroll: [{
      type: HostBinding,
      args: ["class.scroll-horz"]
    }],
    isSelectable: [{
      type: HostBinding,
      args: ["class.selectable"]
    }],
    isCheckboxSelection: [{
      type: HostBinding,
      args: ["class.checkbox-selection"]
    }],
    isCellSelection: [{
      type: HostBinding,
      args: ["class.cell-selection"]
    }],
    isSingleSelection: [{
      type: HostBinding,
      args: ["class.single-selection"]
    }],
    isMultiSelection: [{
      type: HostBinding,
      args: ["class.multi-selection"]
    }],
    isMultiClickSelection: [{
      type: HostBinding,
      args: ["class.multi-click-selection"]
    }],
    columnTemplates: [{
      type: ContentChildren,
      args: [DataTableColumnDirective]
    }],
    rowDetail: [{
      type: ContentChild,
      args: [DatatableRowDetailDirective]
    }],
    groupHeader: [{
      type: ContentChild,
      args: [DatatableGroupHeaderDirective]
    }],
    footer: [{
      type: ContentChild,
      args: [DatatableFooterDirective]
    }],
    bodyComponent: [{
      type: ViewChild,
      args: [DataTableBodyComponent]
    }],
    headerComponent: [{
      type: ViewChild,
      args: [DataTableHeaderComponent]
    }],
    bodyElement: [{
      type: ViewChild,
      args: [DataTableBodyComponent, {
        read: ElementRef
      }]
    }],
    rowDefTemplate: [{
      type: ContentChild,
      args: [DatatableRowDefDirective, {
        read: TemplateRef
      }]
    }],
    rowIdentity: [{
      type: Input
    }],
    onWindowResize: [{
      type: HostListener,
      args: ["window:resize"]
    }]
  });
})();
var DisableRowDirective = class _DisableRowDirective {
  constructor() {
    this.element = inject(ElementRef);
    this._disabled = false;
  }
  set disabled(val) {
    this._disabled = val;
    if (val) {
      this.disableAllElements();
    }
  }
  get disabled() {
    return this._disabled;
  }
  disableAllElements() {
    const el = this.element?.nativeElement;
    if (!el) {
      return;
    }
    Array.from(el.querySelectorAll("*")).forEach((child) => {
      child?.setAttribute("disabled", "");
    });
  }
  static {
    this.ɵfac = function DisableRowDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DisableRowDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DisableRowDirective,
      selectors: [["", "disable-row", ""]],
      inputs: {
        disabled: [2, "disabled", "disabled", booleanAttribute]
      },
      standalone: true,
      features: [ɵɵInputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DisableRowDirective, [{
    type: Directive,
    args: [{
      selector: "[disable-row]",
      standalone: true
    }]
  }], null, {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var NgxDatatableModule = class _NgxDatatableModule {
  /**
   * Configure global configuration via INgxDatatableConfig
   * @param configuration
   */
  static forRoot(configuration) {
    return {
      ngModule: _NgxDatatableModule,
      providers: [{
        provide: "configuration",
        useValue: configuration
      }]
    };
  }
  static {
    this.ɵfac = function NgxDatatableModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxDatatableModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxDatatableModule,
      imports: [DataTableFooterTemplateDirective, DatatableComponent, DataTableColumnDirective, DataTablePagerComponent, DatatableRowDetailDirective, DatatableGroupHeaderDirective, DatatableRowDetailTemplateDirective, DataTableColumnHeaderDirective, DataTableColumnCellDirective, DataTableColumnGhostCellDirective, DataTableColumnCellTreeToggle, DatatableFooterDirective, DatatableGroupHeaderTemplateDirective, DisableRowDirective, DatatableRowDefComponent, DatatableRowDefDirective],
      exports: [DatatableComponent, DatatableRowDetailDirective, DatatableGroupHeaderDirective, DatatableRowDetailTemplateDirective, DataTableColumnDirective, DataTableColumnHeaderDirective, DataTableColumnCellDirective, DataTableColumnGhostCellDirective, DataTableColumnCellTreeToggle, DataTableFooterTemplateDirective, DatatableFooterDirective, DataTablePagerComponent, DatatableGroupHeaderTemplateDirective, DisableRowDirective, DatatableRowDefComponent, DatatableRowDefDirective]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDatatableModule, [{
    type: NgModule,
    args: [{
      imports: [DataTableFooterTemplateDirective, DatatableComponent, DataTableColumnDirective, DataTablePagerComponent, DatatableRowDetailDirective, DatatableGroupHeaderDirective, DatatableRowDetailTemplateDirective, DataTableColumnHeaderDirective, DataTableColumnCellDirective, DataTableColumnGhostCellDirective, DataTableColumnCellTreeToggle, DatatableFooterDirective, DatatableGroupHeaderTemplateDirective, DisableRowDirective, DatatableRowDefComponent, DatatableRowDefDirective],
      exports: [DatatableComponent, DatatableRowDetailDirective, DatatableGroupHeaderDirective, DatatableRowDetailTemplateDirective, DataTableColumnDirective, DataTableColumnHeaderDirective, DataTableColumnCellDirective, DataTableColumnGhostCellDirective, DataTableColumnCellTreeToggle, DataTableFooterTemplateDirective, DatatableFooterDirective, DataTablePagerComponent, DatatableGroupHeaderTemplateDirective, DisableRowDirective, DatatableRowDefComponent, DatatableRowDefDirective]
    }]
  }], null, null);
})();
export {
  ColumnChangesService,
  ColumnMode,
  ContextmenuType,
  DataTableBodyCellComponent,
  DataTableBodyComponent,
  DataTableBodyRowComponent,
  DataTableColumnCellDirective,
  DataTableColumnCellTreeToggle,
  DataTableColumnDirective,
  DataTableColumnGhostCellDirective,
  DataTableColumnHeaderDirective,
  DataTableFooterComponent,
  DataTableFooterTemplateDirective,
  DataTableHeaderCellComponent,
  DataTableHeaderComponent,
  DataTablePagerComponent,
  DataTableRowWrapperComponent,
  DataTableSelectionComponent,
  DataTableSummaryRowComponent,
  DatatableComponent,
  DatatableFooterDirective,
  DatatableGroupHeaderDirective,
  DatatableGroupHeaderTemplateDirective,
  DatatableRowDefComponent,
  DatatableRowDefDirective,
  DatatableRowDefInternalDirective,
  DatatableRowDetailDirective,
  DatatableRowDetailTemplateDirective,
  DisableRowDirective,
  DraggableDirective,
  Keys,
  LongPressDirective,
  NgxDatatableModule,
  OrderableDirective,
  ProgressBarComponent,
  ResizeableDirective,
  RowHeightCache,
  ScrollbarHelper,
  ScrollerComponent,
  SelectionType,
  SortDirection,
  SortType,
  VisibilityDirective,
  adjustColumnWidths,
  camelCase,
  columnGroupWidths,
  columnTotalWidth,
  columnsByPin,
  columnsByPinArr,
  columnsTotalWidth,
  deCamelCase,
  deepValueGetter,
  emptyStringGetter,
  forceFillColumnWidths,
  getTotalFlexGrow,
  getterForProp,
  groupRowsByParents,
  id,
  isNullOrUndefined,
  nextSortDir,
  numericIndexGetter,
  optionalGetterForProp,
  orderByComparator,
  selectRows,
  selectRowsBetween,
  setColumnDefaults,
  shallowValueGetter,
  sortGroupedRows,
  sortRows,
  throttle,
  throttleable,
  translateTemplates
};
//# sourceMappingURL=@swimlane_ngx-datatable.js.map
