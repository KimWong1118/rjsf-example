import React, { Component, ComponentProps, lazy, Suspense } from "react";

const Form = lazy(() => import("./form"));

type Props = ComponentProps<typeof Form>;

type State = {
  hasError: boolean;
};

class LoadableCicadaTestForm extends Component<Props, State> {
  static getDerivedStateFromError = () => ({
    hasError: true
  });

  state = {
    hasError: false
  };

  render() {
    const { hasError } = this.state;

    return (
      <Suspense fallback={"Loading"}>
        {hasError ? "Failed to load form component." : <Form {...this.props} />}
      </Suspense>
    );
  }
}

export default LoadableCicadaTestForm;
