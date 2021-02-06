import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import s from './ProfileInfo.module.css';

const styles = theme => ({
  root: {
    width: '80%',
    maxWidth: 250,
    backgroundColor: '#D8E9EA',
    paddingLeft: '0px'
  },
  listButton: {
    paddingLeft: '0px',
    fontSize: '25px'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 1,
  },
});

class ContactsList extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  goToEditMode = () => {
      this.props.goToEditMode();
  }

  render() {
    const { classes } = this.props;

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div"></ListSubheader>}
        className={classes.root}
      >
        <ListItem button onClick={this.handleClick} style={{paddingLeft: '0px'}} >
          <ListItemText inset primary="Contacts" className={classes.listButton} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            {Object.keys(this.props.profile.contacts).map((objKey) => {
                return <ListItem key={objKey} button className={classes.nested}>
                            <b style={{paddingRight: '5px'}}>{objKey}: </b>
                            <a href={this.props.profile.contacts[objKey]} target='_blank' > 
                                {this.props.profile.contacts[objKey]}
                            </a>
                        </ListItem>
                })}
          </List>
          {this.props.isOwner && <button onClick={this.goToEditMode} className={s.editProfileBtn}>Edit</button>}
        </Collapse>
      </List>
    );
  }
}

ContactsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactsList);
