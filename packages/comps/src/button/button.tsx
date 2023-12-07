import React, { FC, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import classnames from "classnames";

export type ButtonSize = "lg" | "md" | "sm";
export type ButtonType = "primary" | "default" | "text" | "link";

interface BaseButtonPrps {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  btnType?: ButtonType;
  btnSize: ButtonSize;
  onClick?: VoidFunction;
  children: React.ReactNode;
}
type NativeButtonProps = BaseButtonPrps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonPrps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    className,
    loading,
    disabled,
    btnType,
    btnSize,
    children,
    onClick,
    ...restProps
  } = props;
  const classes = classnames(className, {
    "ez-btn": true,
    [`ez-btn-${btnType}`]: btnType !== "default",
    [`ez-btn-${btnSize}`]: btnSize !== "md",
    "ez-btn-loading": loading,
    disabled,
  });

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (btnType === "link") {
      const { href, target } = restProps;
      if (href) {
        if (target) {
          window.open(href, target);
        } else {
          window.location.href = href;
        }
      }
    } else if (!disabled) {
      onClick && onClick(event);
    }
  };

  return (
    <button
      className={classes}
      {...restProps}
      type="button"
      onClick={handleClick}
    >
      {loading ? (
        <span className="ez-btn-loading-icon">
          <span
            role="img"
            aria-label="loading"
            className="ez-icon ez-icon-loading"
          >
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              className="ez-icon-spin"
              data-icon="loading"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
            </svg>
          </span>
        </span>
      ) : (
        ""
      )}
      <span>{children}</span>
    </button>
  );
};

Button.defaultProps = {
  btnType: "default",
  btnSize: "md",
};

export default Button;
