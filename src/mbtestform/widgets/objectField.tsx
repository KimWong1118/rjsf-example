import React, { FC, useState, memo } from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ObjectFieldTemplateProps } from "@rjsf/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./styles.module.scss";

const createGridGroups = (
  properties: ObjectFieldTemplateProps["properties"],
  exclude: string[]
) => {
  //const groups: ObjectFieldTemplateProps['properties'][] = [[]];

  return properties.reduce(
    (prev, next) => {
      if (exclude.includes(next.name)) {
        prev.push([]);
      }

      prev[prev.length - 1].push(next);

      return prev;
    },
    [[]] as ObjectFieldTemplateProps["properties"][]
  );
};

export const ObjectFieldTemplateSubSection: FC<ObjectFieldTemplateProps> = memo(
  ({
    title,
    description,
    properties = [],
    uiSchema: {
      maxCols = 12,
      expanded = false,
      grid: [cols = 12, exclude = []] = []
    }
  }) => {
    const [isExpanded, setExpanded] = useState<boolean>(expanded);

    //console.log(maxCols, expanded, columns, properties);

    const groups = createGridGroups(properties, exclude);
    console.log(groups);

    return (
      <div className={styles.expandPanelWrapper}>
        <Accordion
          expanded={isExpanded}
          onChange={() => setExpanded(!isExpanded)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container>
              <Grid md={4} sm={12} item>
                <Typography variant="body1">{title}</Typography>
              </Grid>
              <Grid md={8} sm={12} item>
                <Typography variant="caption" color="textSecondary">
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={styles.objectWrapper}>
            <Grid container spacing={1}>
              {properties.map((element, i) => (
                <Grid
                  key={element.name}
                  className={styles.gridCell}
                  md={cols}
                  sm={12}
                  item
                >
                  {element.content}
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
);

export const ObjectFieldTemplateGroupExpandable: FC<ObjectFieldTemplateProps> = memo(
  ({ title, uiSchema: { open = false }, properties = [] }) => {
    const [isExpanded, setExpanded] = useState<boolean>(open);

    return (
      <Accordion
        expanded={isExpanded}
        onChange={() => setExpanded(!isExpanded)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.objectWrapper}>
          <Grid container>
            {properties.map((element, i) => (
              <Grid key={element.name} md={12} item>
                {element.content}
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
);

export const ObjectFieldTemplate: FC<ObjectFieldTemplateProps> = ({
  title,
  description,
  properties = []
}) => (
  <div>
    <Typography variant="caption" component="div" noWrap>
      {title}
    </Typography>
    <div>{description}</div>
    <div>
      {properties.map((element) => (
        <div key={element.name}>{element.content}</div>
      ))}
    </div>
  </div>
);
