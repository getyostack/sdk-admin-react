import React, {useContext, useEffect, useState} from "react";
import {EditorContext} from "../contexts/editor.context";
import {BasicSelect} from "./basic-select";
import { Input } from "./input";
import {Menu} from "./menu";
import {DataSourceOption} from "../data/data-source-option.interface";

interface Props {
    onChange: (config: {[key: string]: any}) => void;
}

const dataSourceAliasConfigName = '_dataAlias';
const dataArrayFieldPathConfigName = '_dataArrayFieldPath';
const dataRepeatItemAliasConfigName = '_dataRepeatItemAlias';

export const DataRepeat: React.FC<Props> = (props) => {

    const editorContext = useContext(EditorContext);
    const dataSourceOptions = editorContext.getRepeatDataSourceOptions();
    const [activeDataSourceOption, setActiveDataSourceOption] = useState(editorContext.getActiveDataSourceOption(dataSourceOptions));
    const [dataArrayFieldPath, setDataArrayFieldPath] = useState(editorContext.config[dataArrayFieldPathConfigName]);
    const [dataRepeatItemAlias, setDataRepeatItemAlias] = useState(editorContext.config[dataRepeatItemAliasConfigName]);

    const updateActiveDataSourceOption = (option: DataSourceOption) => {
        if (option.alias !== activeDataSourceOption?.alias) {
            setActiveDataSourceOption(option);
            props.onChange({[dataSourceAliasConfigName]: option.alias});
        }
    };

    const updateArrayFieldPath = (value: string) => {
        setDataArrayFieldPath(value);
        props.onChange({[dataArrayFieldPathConfigName]: value});
    };

    const updateRepeatItemAlias = (value: string) => {
        setDataRepeatItemAlias(value);
        props.onChange({[dataRepeatItemAliasConfigName]: value});
    };

    useEffect(() => {
        // Persist initial active data source option
        if (!editorContext.config[dataSourceAliasConfigName] && activeDataSourceOption) {
            updateActiveDataSourceOption(activeDataSourceOption);
        }
    }, [activeDataSourceOption]);

    return (
        <div className='ys-data-repeat-editor'>
            <div className="form-group data-field-config-field">
                <div>
                    Repeat for
                    {dataSourceOptions.length === 1 &&
                        <>
                            <span className="icon-wrapper"><i className="fas fa-database"/></span>
                            <strong>{dataSourceOptions[0].alias}</strong>
                        </>
                    }
                    {dataSourceOptions.length > 1 &&
                        <Menu className='dark compact data-field-menu' triggerContent={
                            <span style={{cursor: 'pointer'}}>
                                <span className="icon-wrapper"><i className="fas fa-database"/></span>
                                <strong>{activeDataSourceOption.alias}</strong>
                                <span className="icon-wrapper"><i className="fas fa-caret-down"/></span>
                            </span>
                        }>
                            {dataSourceOptions.map((option, index) =>
                                <>
                                    {option.alias !== dataRepeatItemAlias &&
                                        <button key={index} onClick={() => updateActiveDataSourceOption(option)}>
                                            {option.alias}
                                        </button>
                                    }
                                </>
                            )}
                        </Menu>
                    }
                </div>

                {activeDataSourceOption?.options.length > 1 &&
                    <BasicSelect name={dataArrayFieldPathConfigName}
                                 value={dataArrayFieldPath}
                                 label='Items'
                                 onChange={updateArrayFieldPath}
                                 options={activeDataSourceOption.options}
                    />
                }
            </div>

            <div className="form-group data-field-config-field">
                <Input name={dataRepeatItemAliasConfigName}
                    value={dataRepeatItemAlias||''}
                    label='Repeat Item Alias'
                    onChange={updateRepeatItemAlias}
                />
            </div>
        </div>
    );
}