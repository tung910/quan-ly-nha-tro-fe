/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal as ModalAntd, ModalProps } from 'antd';
import { ReactElement } from 'react';

interface Props {
    title?: string;
    open: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactElement | any;
    onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Modal = (props: Props & ModalProps) => {
    const {
        open,
        setOpen,
        children,
        onOk,
        onCancel,
        title,
        ...passModalProps
    } = props;

    return (
        <ModalAntd
            title={title}
            centered
            visible={open}
            onOk={onOk}
            onCancel={onCancel}
            {...passModalProps}
        >
            {children}
        </ModalAntd>
    );
};

export default Modal;
