import React from "react";
/**
 * T ref类型
 * P prop类型
 * @param comps 必须是function组件
 * @returns 
 */
function memoFunctionComp<T extends HTMLElement, P>(comps: React.ForwardRefRenderFunction<T, P>) {
  // 为了让comps支持ref
  return React.memo(React.forwardRef(comps));
}

export default memoFunctionComp;
