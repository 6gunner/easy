import React, { useState, useMemo, forwardRef } from "react";
import classnames from "classnames";
import {
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";
import { toArray } from "@dev-easy/utils";

export type MenuProp = {
  name: string;
  value: string;
};
export type Trigger = "click" | "hover" | "focus";
export type DropdownProps = {
  trigger?: Trigger | Trigger[]; // 触发方式
  overlay: (() => React.ReactElement) | React.ReactElement;
} & {
  children: React.ReactElement;
};
export type DropdownHandler = {
  close: () => void;
  open: () => void;
};

const Countdown: React.ForwardRefRenderFunction<
  DropdownHandler,
  DropdownProps
> = (props, ref) => {
  const { trigger = "click", overlay, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [],
  });
  const triggers = toArray(trigger);

  const hover = useHover(context, { enabled: triggers.includes("hover") });
  const click = useClick(context, {
    enabled: triggers.includes("click"),
  });
  const dismiss = useDismiss(context);

  // getReferenceProps用在引用的元素上，getFloatingProps用在浮动的元素上
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    click,
    hover,
  ]);

  // 缓存overlay的计算结果，避免重复渲染
  const overlayNode = useMemo(() => {
    let overlayElement: React.ReactElement;
    if (typeof overlay === "function") {
      overlayElement = overlay();
    } else {
      overlayElement = overlay;
    }
    return overlayElement;
  }, [overlay]);

  // 浮动的下拉框
  const wrappedOverlay = React.cloneElement(overlayNode, {
    ref: refs.setFloating,
    style: floatingStyles,
    ...getFloatingProps,
    className: classnames("dropdown", overlayNode.props.className),
  });

  // 真实渲染出来的dom
  // todo 怎么在打开dropdown的时候，增加一些className或者标记呢
  const wrappedChildren = React.cloneElement(children, {
    ref: refs.setReference,
    className: classnames(children.props.className, {
      open: isOpen,
    }),
    ...getReferenceProps(),
  });

  // todo 怎么把那个floating关了？
  // way1、通过监听外面的visible属性，来做判断;
  // way2、将setIsOpen方法暴露出去，让外面去调用； 我选的是way2
  React.useImperativeHandle(
    ref,
    () => {
      return {
        close() {
          setIsOpen(false);
        },
        open() {
          setIsOpen(true);
        },
      };
    },
    []
  );

  console.log("重新渲染...");

  return (
    <>
      {wrappedChildren}
      <FloatingPortal>{isOpen && wrappedOverlay}</FloatingPortal>
    </>
  );
};

export default React.forwardRef(Countdown);
