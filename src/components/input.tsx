import React, {CSSProperties, ReactNode} from "react";
import {InputUnstyled, TextareaAutosize} from "@mui/base";
import {InputUnstyledOwnProps} from "@mui/base/InputUnstyled/InputUnstyled.types";

interface Props {
    name: string;
    value?: string|number;
    label: string;
    id?: string;
    className?: string;
    style?: CSSProperties;
    placeholder?: string;
    disabled?: boolean;
    multiline?: boolean;
    autosize?: boolean;
    addonStart?: ReactNode|ReactNode[];
    addonEnd?: ReactNode|ReactNode[];
    onChange: (value: string, name: string, config: {[key: string]: any}) => void;
}

export const Input: React.FC<Props> = (props) => {

    const handleChange = (ev: any) => {
        const value = ev.target.value;
        props.onChange(value, props.name, {[props.name]: value});
    };

    const components: InputUnstyledOwnProps['components'] = {};
    if (props.autosize) {
        components.Textarea = TextareaAutosize;
    }

    return (
        <div className='ys-input-editor'>
            <label>
                {props.label}
            </label>
            <InputUnstyled value={props.value}
                           id={props.id}
                           className={props.className}
                           style={props.style}
                           placeholder={props.placeholder}
                           disabled={props.disabled}
                           multiline={props.multiline}
                           startAdornment={props.addonStart}
                           endAdornment={props.addonEnd}
                           onChange={handleChange}
                           components={components}
            />
        </div>
    );
}