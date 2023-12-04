import { getBusinessObject, is } from "bpmn-js/lib/util/ModelUtil";
import { isAny } from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import { add as collectionAdd } from "diagram-js/lib/util/Collections";
import { getModeler } from "@packages/bpmn-utils/BpmnDesignerUtils";

// 根据元素获取 name 属性
export function getNameValue(element) {
  if (isAny(element, ["bpmn:Collaboration", "bpmn:DataAssociation", "bpmn:Association"])) {
    return undefined;
  }
  if (is(element, "bpmn:TextAnnotation")) {
    return element.businessObject.text;
  }
  if (is(element, "bpmn:Group")) {
    const businessObject = getBusinessObject(element),
      categoryValueRef = businessObject?.categoryValueRef;
    return categoryValueRef?.value;
  }
  return element?.businessObject.name;
}

// 根据输入内容设置 name 属性
export function setNameValue(element, value) {
  const modeling = getModeler.getModeling();

  const canvas = getModeler.getCanvas();
  const bpmnFactory = getModeler.getModeler?.get("bpmnFactory");

  if (isAny(element, ["bpmn:Collaboration", "bpmn:DataAssociation", "bpmn:Association"])) {
    return undefined;
  }
  if (is(element, "bpmn:TextAnnotation")) {
    return modeling?.updateProperties(element, { text: value });
  }
  if (is(element, "bpmn:Group")) {
    const businessObject = getBusinessObject(element),
      categoryValueRef = businessObject.categoryValueRef;
    if (!categoryValueRef) {
      initializeCategory(businessObject, canvas?.getRootElement(), bpmnFactory);
    }
    return modeling?.updateLabel(element, value);
  }
  modeling?.updateProperties(element, { name: value });
}
// 根据元素获取 assignee 属性
export function getAssigneeValue(element) {
  // console.log('getAssigneeValue===', element)
  if (is(element, "bpmn:UserTask")) {
    return element?.businessObject?.assignee;
  }
  return undefined;
}

// 根据输入内容设置 assignee 属性
export function setAssigneeValue(element, value) {
  const modeling = getModeler.getModeling();

  // console.log('根据输入内容设置=assignee==', modeling)
  if (!is(element, "bpmn:UserTask")) {
    return undefined;
  }
  // console.log('element===', element)
  modeling?.updateProperties(element, { assignee: value });
}

////////////////  helpers

function createCategoryValue(definitions, bpmnFactory) {
  const categoryValue = bpmnFactory.create("bpmn:CategoryValue");
  const category = bpmnFactory.create("bpmn:Category", {
    categoryValue: [categoryValue]
  });
  collectionAdd(definitions.get("rootElements"), category);
  getBusinessObject(category).$parent = definitions;
  getBusinessObject(categoryValue).$parent = category;

  return categoryValue;
}

function initializeCategory(businessObject, rootElement, bpmnFactory) {
  const definitions = getBusinessObject(rootElement).$parent;

  businessObject.categoryValueRef = createCategoryValue(definitions, bpmnFactory);
}
