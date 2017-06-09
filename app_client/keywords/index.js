import React from 'react';
import {
    Create,
    Edit,
    List,
    SimpleForm,
    DisabledInput,
    TextInput,
    DateInput,
    LongTextInput,
    ReferenceManyField,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    DeleteButton
} from 'admin-on-rest';

import {required} from 'admin-on-rest'


export const KeywordList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="key_id" label="Keyword Id"/>
            <TextField source="key" label="Keyword Name"/>
            <TextField source="createAt" label="Created At"/>
            <TextField source="updateAt" label="Updated At"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);


export const KeywordCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="key" validate={[required]}/>
        </SimpleForm>
    </Create>
);
const KeywordTitle = ({ record }) => {
    return <span>Keyword {record ? `"${record.name}"` : ''}</span>;
};
export  const KeywordEdit = (props) => (
    <Edit title={<KeywordTitle />} {...props}>
        <SimpleForm>
            <DisabledInput label="Keyword Id" source="key_id" />
            <TextInput source="key" label="Keyword Name" validate={[required]}/>
        </SimpleForm>
    </Edit>
);