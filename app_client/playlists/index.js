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
    ReferenceField,
    ReferenceManyField,
    ReferenceInput,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    DeleteButton,
    SelectInput,
    ImageInput,
    ImageField,
    FormTab,
    TabbedForm
} from 'admin-on-rest';

export const PlaylistList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="playlist_id" label="Playlist Id"/>
            <ReferenceField label="Category" source="category._id" reference="category" allowEmpty>
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="name" label="Playlist Name"/>
            <TextField source="key" label="Playlist Key"/>
            <TextField source="type" label="Playlist Type"/>
            <TextField source="createAt" label="Created At"/>
            <TextField source="updateAt" label="Updated At"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const PlaylistCreate = (props) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="Information">
                <TextInput source="name"/>
                <TextInput source="key"/>
                <ReferenceInput label="Category" source="category" reference="category" allowEmpty>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
            </FormTab>

            <FormTab label="Cover Photo">
                <ImageInput source="file" label="Cover Photo" accept="image/*">
                    <ImageField source="file" title="title"/>
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Create>
);

export const ImageFormatter = v => {
    // console.log("====LogoFormatter=====: ", v);
    if (typeof v === 'object'){
        return v;
    }
    const imageObj = {
        "src": v
    };
    return imageObj;
};

export const ImageParser = v => {
    // console.log("====LogoParser=====: ", v);
    return v;
};

const PlaylistTitle = ({record}) => {
    return <span>Playlist {record ? `"${record.name}"` : ''}</span>;
};
export const PlaylistEdit = (props) => (
    <Edit title={<PlaylistTitle />} {...props}>
        <TabbedForm>
            <FormTab label="Information">
                <TextInput source="name"/>
                <TextInput source="key"/>
                <SelectInput source="type" choices={[
                    {id: 0, name: 0},
                    {id: 1, name: 1}
                ]}/>
                <ReferenceInput label="Category" source="category._id" reference="category" allowEmpty>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
            </FormTab>

            <FormTab label="Cover Photo">
                <ImageInput source="file" label="Cover Photo" accept="image/*" format={ImageFormatter} parse={ImageParser}>
                    <ImageField source="src" title="title"/>
                </ImageInput>
            </FormTab>
        </TabbedForm>
    </Edit>
);
