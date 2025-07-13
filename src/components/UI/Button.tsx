import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  textOnly?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  children,
  textOnly,
  className,
  ...otherProps
}: ButtonProps) {
  let cssClass = textOnly ? "text-button" : "button";

  cssClass += " " + className;

  return (
    <button {...otherProps} className={cssClass}>
      {children}
    </button>
  );
}

/* import { ComponentPropsWithoutRef, ReactNode } from "react";
import {LinkProps, Link} from 'react-router-dom';

type ButtonProps = {
    children: ReactNode
}
type ButtonType = ComponentPropsWithoutRef<'button'> & ButtonProps;
type LinkType = LinkProps & ButtonProps;

type AvailibleType = ButtonType | LinkType;

function isRouterLink(props: AvailibleType): props is LinkType {
    return 'to' in props
}

export default function Button(props: AvailibleType) {

const { children, ...otherProps } = props;
  if(isRouterLink(props)) {

    return <Link {...otherProps}>{children}</Link>;
  }
  return <button {...otherProps}>{children}</button>;
} */
