import DoneIcon from '@material-ui/icons/Done';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import React , {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CuTable from './CuTable';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    {/* <Typography component ={'span'} variant ={'body2'}>{children}</Typography> */}
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    AppBar: {

        flexGrow: 1,
        color: 'with',
        width: '100%',
        backgroundColor: '#9E9E9E'
    }
}));

export default function CuTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const rowsData = props.rowsData;

    useEffect(() => {
        console.log("[Tabs] Tabs render" ,rowsData)
    })

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    className={classes.AppBar}
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="off"
                    aria-label="scrollable prevent tabs example">
                    <Tab icon={<DoneIcon />} aria-label="phone" {...a11yProps(0)} />
                    <Tab icon={<DoneAllRoundedIcon />} aria-label="favorite" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <CuTable rowsData={rowsData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
      </TabPanel>
        </div>
    );
}
