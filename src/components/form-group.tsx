import React, {PropsWithChildren} from "react";

interface Props {
    className?: string
}

export const FormGroup: React.FC<PropsWithChildren<Props>> = (props) => {
    const className = props.className ? props.className + ' form-group' : 'form-group';
    return (
        <div className={className}>
            {props.children}
        </div>
    );
}