declare module 'react-window' {
  import * as React from 'react';
  export interface FixedSizeGridProps {
    columnCount: number;
    columnWidth: number;
    height: number;
    rowCount: number;
    rowHeight: number;
    width: number;
    children: React.ComponentType<any>;
    className?: string;
    style?: React.CSSProperties;
  }
  export class FixedSizeGrid extends React.Component<FixedSizeGridProps> { }
}