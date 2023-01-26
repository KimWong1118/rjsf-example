import React, { FunctionComponent, ReactNode } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { WidgetProps } from "@rjsf/core";
import styles from "./styles.module.scss";

type TProps = {
  options: Record<string, any>;
};

export const CustomToggle: FunctionComponent<WidgetProps & TProps> = ({
  value,
  schema: { title },
  options: { enumOptions },
  onChange
}) => (
  <div className={styles.innerBlock}>
    <Typography variant="caption" component="div" noWrap>
      {title}
    </Typography>
    <ButtonGroup className={styles.gutterRight}>
      {enumOptions.map((name: { value: string; label: ReactNode }) => (
        <Button
          key={name.value}
          value={name.value}
          onClick={() => onChange(name.value)}
          color={name.value === value ? "primary" : "neutral"}
          variant={name.value === value ? "contained" : undefined}
        >
          {name.label}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);
