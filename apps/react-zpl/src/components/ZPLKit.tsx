import React from 'react';

export interface ZPLKitProps {
  children?: React.ReactNode;
}

export default function ZPLKit({ children }: ZPLKitProps) {
  return <div>{children}</div>;
}
