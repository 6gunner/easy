import React, { useEffect, useState } from "react";
import { Dropdown } from "../dropdown";

import ArrowIcon from "./arrow.svg";

type RawValue = string | number;

type DropdownHandler = React.ElementRef<typeof Dropdown>;
// 默认的选项类型
type BaseOptionType = {
  [name: string]: any;
};

export interface SelectProps<ValueType, OptionType> {
  options: OptionType[];
  // todo 支持dropdownRender来实现option的渲染
  placeholder?: string;
  value: ValueType | null;
  onChange: (value: ValueType, option: OptionType | OptionType[]) => void;
}

export const Select: React.FC<SelectProps<any, BaseOptionType>> = (props) => {
  const { options, value, placeholder } = props;
  const menus = options.map((item) => ({
    name: item.name,
    value: item.value,
  }));
  const dropdownRef = React.useRef<DropdownHandler>(null);

  // 选择的item
  const [item, setItem] = useState<any>();

  useEffect(() => {
    options.forEach((item) => {
      if (item === value) {
        setItem(item);
      }
    });
  }, [value]);

  const OptionList = () => {
    const handleOptionClick = (v: BaseOptionType) => {
      setItem(v);
      dropdownRef.current?.close();
      props.onChange(v.value, v);
    };
    return (
      <div className="ez-options">
        {menus.map((item) => {
          return (
            <div
              key={item.value}
              className="ez-option-item"
              onClick={() => handleOptionClick(item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  };

  const renderPlaceHolder = () => {
    if (item) {
      return;
    }
    return (
      <span className="ez-selection-placeholder">{placeholder || ""}</span>
    );
  };

  const test = () => {
    console.log("test...");
  };
  return (
    <Dropdown overlay={OptionList} ref={dropdownRef}>
      <div className="ez-selector" onClick={test}>
        <div className="ez-selection-item">{item && item.name}</div>
        {renderPlaceHolder()}
        <img src={ArrowIcon} alt="arrow-left" className="ez-selection-arrow" />
      </div>
    </Dropdown>
  );
};
