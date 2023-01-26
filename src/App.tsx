import "./styles.css";
import CicadaForm from "./cicadaform";
import cicada from "./schemas/cicada.json";

import MbtestForm from "./mbtestform";
import mbtest from "./schemas/mbtest.json";

export default function App() {
  return (
    <div className="App" style={{ textAlign: "left" }}>
      {/* <CicadaForm schema={cicada} /> */}
      <MbtestForm schema={mbtest} />
    </div>
  );
}
