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

import {required} from 'admin-on-rest';


export const NotificationsList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="notification_id"/>
            <TextField source="message"/>
            <TextField source="link"/>
            <TextField source="hour"/>
            <TextField source="minute"/>
            <TextField source="createAt"/>
            <TextField source="updateAt"/>
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);


export const NotificationsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="message" label='Notification Message' validate={[required]}/>
            <TextInput source="link" label="Notification Link" validate={[required]}/>
            <TextInput source="hour" label="Set daily hour" validate={[required]}/>
            <TextInput source="minute" label="Set daily minute" validate={[required]}/>
        </SimpleForm>
    </Create>
);
const NotificationsTitle = ({record}) => {
    return <span>Notification {record ? `"${record.message}"` : ''}</span>;
};
export const NotificationsEdit = (props) => (
    <Edit title={<NotificationsTitle />} {...props}>
        <SimpleForm>
            <DisabledInput label="Notification Id" source="notification_id"/>
            <TextInput source="message" label="Notification Message" validate={[required]}/>
            <TextInput source="link" label="Notification Link" validate={[required]}/>
            <TextInput source="hour" label="Set daily hour" validate={[required]}/>
            <TextInput source="minute" label="Set daily minute" validate={[required]}/>
        </SimpleForm>
    </Edit>
);