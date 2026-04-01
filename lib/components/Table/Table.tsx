import React, { FC, ReactNode } from "react";
import './table.scss';

export interface TableProps {
    classNames?: {
        table?: string;
    };
    children?: ReactNode;
}

export const TableBase: FC<TableProps & React.TableHTMLAttributes<HTMLTableElement>> = ({
                                                                                            classNames,
                                                                                            children,
                                                                                            ...props
                                                                                        }) => {
    return (
        <table className={`naria-table ${classNames?.table || ''}`} {...props}>
            {children}
        </table>
    );
};

export const TableHeader: FC<{ children?: ReactNode; classNames?: { thead?: string } }> = ({ children, classNames, ...props }) => (
    <thead className={`naria-table__thead ${classNames?.thead || ''}`} {...props}>
    {children}
    </thead>
);

export const TableBody: FC<{ children?: ReactNode; classNames?: { tbody?: string } }> = ({ children, classNames, ...props }) => (
    <tbody className={`naria-table__tbody ${classNames?.tbody || ''}`} {...props}>
    {children}
    </tbody>
);

export const TableFooter: FC<{ children?: ReactNode; classNames?: { tfoot?: string } }> = ({ children, classNames, ...props }) => (
    <tfoot className={`naria-table__tfoot ${classNames?.tfoot || ''}`} {...props}>
    {children}
    </tfoot>
);

export const TableRow: FC<{ children?: ReactNode; classNames?: { tr?: string } }> = ({ children, classNames, ...props }) => (
    <tr className={`naria-table__tr ${classNames?.tr || ''}`} {...props}>
        {children}
    </tr>
);

export const TableHead: FC<{ children?: ReactNode; classNames?: { th?: string } }> = ({ children, classNames, ...props }) => (
    <th className={`naria-table__th ${classNames?.th || ''}`} {...props}>
        {children}
    </th>
);

export const TableCell: FC<{ children?: ReactNode; classNames?: { td?: string } }> = ({ children, classNames, ...props }) => (
    <td className={`naria-table__td ${classNames?.td || ''}`} {...props}>
        {children}
    </td>
);

interface TableComponent extends FC<TableProps & React.TableHTMLAttributes<HTMLTableElement>> {
    Header: typeof TableHeader;
    Body: typeof TableBody;
    Footer: typeof TableFooter;
    Row: typeof TableRow;
    Head: typeof TableHead;
    Cell: typeof TableCell;
}

export const Table = TableBase as TableComponent;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.displayName = 'Table';