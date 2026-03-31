import React, {FC} from "react";
import './table.scss';


export interface props {
    classNames?: {
        table?: string;
    };
    children?: React.ReactNode;
}

export const Table: FC<props> = ({
                                     classNames = {
                                         table: "",
                                     },
                                     children,
                                     ...props
                                 }) => {
    return (
        <table className={`naria-table ${classNames?.table || ''}`} {...props}>
            {children}
        </table>
    );
};


export const TableHeader = ({children, classNames, ...props}: {
    children?: React.ReactNode,
    classNames?: { thead?: string }
}) => {
    return <thead className={`naria-table__thead ${classNames?.thead || ''}`} {...props}>{children}</thead>;
};

export const TableBody = ({children, classNames, ...props}: {
    children?: React.ReactNode,
    classNames?: { tbody?: string }
}) => {
    return <tbody className={`naria-table__tbody ${classNames?.tbody || ''}`} {...props}>{children}</tbody>;
};

export const TableFooter = ({children, classNames, ...props}: {
    children?: React.ReactNode,
    classNames?: { tfoot?: string }
}) => {
    return <tfoot className={`naria-table__tfoot ${classNames?.tfoot || ''}`} {...props}>{children}</tfoot>;
};

export const TableRow = ({children, classNames, ...props}: {
    children?: React.ReactNode,
    classNames?: { tr?: string }
}) => {
    return (
        <tr className={`naria-table__tr ${classNames?.tr || ''}`} {...props}>
            {children}
        </tr>
    );
};

export const TableHead = ({children, classNames, ...props}: {
    children?: React.ReactNode,
    classNames?: { th?: string }
}) => {
    return <th {...props}
               className={`naria-table__th ${classNames?.th || ''}`}>{children}</th>;
};

export const TableCell = ({children, classNames, ...props}: {
    children?: React.ReactNode,
    classNames?: { td?: string }
}) => {
    return <td className={`naria-table__td ${classNames?.td || ''}`} {...props}>{children}</td>;
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.displayName = 'Table';