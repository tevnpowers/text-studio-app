/* eslint-disable react/no-multi-comp */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    paddingLeft: theme.spacing(1),
    userSelect: 'none',
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(0),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

// eslint-disable-next-line react/display-name
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

export default function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelInfo, color, bgColor, href, id, rootNode, ...other } = props;

  const handleClick = () => {
    console.log('You clicked the Chip.');
  };

  const getTypography = () => {
    let text = labelText;
    if (labelText.length >= 20) {
      text = labelText.slice(0, 19) + '...';
    }

    if (rootNode) {
      return (
        <Tooltip title={labelText}>
          <Typography
            className={classes.labelText}
            variant={'overline'}
          >
            {text}
          </Typography>
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title={labelText}>
          <Typography
            className={classes.labelText}
            variant={'body2'}
          >
            {text}
          </Typography>
        </Tooltip>
      )
    }
  }

  const getChip = () => {
    if (!rootNode && labelInfo > 0) {
      const title = 'Unsaved changes';
      return (
        <Tooltip title={title}>
          <Chip
            label={labelInfo.toString()}
            onClick={handleClick}
            size="small"
          />
        </Tooltip>
      )
    }
  }

  let routerInfo;
  if (!rootNode) {
    routerInfo = { component: CustomRouterLink, to: '/projects/' + id }
  }

  return (
    <TreeItem
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      label={
        <div
          className={classes.labelRoot}
        >
          <Grid
            alignItems="baseline"
            container
            direction="row"
            justify="space-between"
            spacing={0}
            {...routerInfo}
          >
            <Grid
              item
              key={0}
            >
              {getTypography()}
            </Grid>
            <Grid
              item
              key={1}
            >
              {getChip()}
            </Grid>
          </Grid>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}
  
StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelInfo: PropTypes.number,
  labelText: PropTypes.string.isRequired,
  rootNode: PropTypes.bool
};