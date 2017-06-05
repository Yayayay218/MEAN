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

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="cate_id" label="Category Id"/>
            <TextField source="name" label="Category Name"/>
            <TextField source="createAt" label="Created At"/>
            <TextField source="updateAt" label="Updated At"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
        </SimpleForm>
    </Create>
);
const CategoryTitle = ({ record }) => {
    return <span>Category {record ? `"${record.name}"` : ''}</span>;
};
export  const CategoryEdit = (props) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <DisabledInput label="Category Id" source="cate_id" />
            <TextInput source="name" label="Category Name" />
        </SimpleForm>
    </Edit>
);