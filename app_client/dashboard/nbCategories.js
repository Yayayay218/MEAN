import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';

import CategoryIcon from 'material-ui/svg-icons/social/pages';

const styles = {
    card: { borderLeft: 'solid 4px #f46542', flex: '1', marginRight: '1em' },
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#f46542' },
};

export default ({ value }) => (
    <Card style={styles.card}>
        <CategoryIcon style={styles.icon} />
        <CardTitle title={value} subtitle='Number of Category' />
    </Card>
)