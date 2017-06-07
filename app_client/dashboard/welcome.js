import React from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';

const styles = {
    title: {fontSize: 40}
};

export default ({ style }) => (
    <Card style={style}>
        <CardHeader style={styles.title}
            title='Welcome to our Admin Dashboard'
            subtitle='This is the admin of a music app.'
            avatar={<Avatar backgroundColor="#FFEB3B" icon={<LightBulbIcon />} />}
        />
    </Card>
);
