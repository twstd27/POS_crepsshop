import { WhiteCard } from "../../components";
import { useBearsStore } from "../../stores";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <PolarBears />
        <PandaBears />
        <BearsDisplay />
      </div>
    </>
  );
};

const BlackBears = () => {
  const blackBears = useBearsStore((state) => state.blackBears);
  const increaseBlackBears = useBearsStore((state) => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button className="btn-primary" onClick={() => increaseBlackBears(+1)}>
          {" "}
          +1
        </button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button className="btn-primary" onClick={() => increaseBlackBears(-1)}>
          -1
        </button>
      </div>
    </WhiteCard>
  );
};

const PolarBears = () => {
  const polarBears = useBearsStore((state) => state.polarBears);
  const increasePolarBears = useBearsStore((state) => state.increasePolarBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button className="btn-primary" onClick={() => increasePolarBears(+1)}>
          {" "}
          +1
        </button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button className="btn-primary" onClick={() => increasePolarBears(-1)}>
          -1
        </button>
      </div>
    </WhiteCard>
  );
};

const PandaBears = () => {
  const pandaBears = useBearsStore((state) => state.pandaBears);
  const increasePandaBears = useBearsStore((state) => state.increasePandaBears);

  return (
    <WhiteCard centered>
      <h2>Osos Panda</h2>

      <div className="flex flex-col md:flex-row">
        <button className="btn-primary" onClick={() => increasePandaBears(+1)}>
          {" "}
          +1
        </button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button className="btn-primary" onClick={() => increasePandaBears(-1)}>
          -1
        </button>
      </div>
    </WhiteCard>
  );
};

const BearsDisplay = () => {
  const bears = useBearsStore((state) => state.bears);
  const addBears = useBearsStore((state) => state.addBears);
  const clearBears = useBearsStore((state) => state.clearBears);
  return (
    <WhiteCard>
      <h1>Oso</h1>
      <button className="mt-2 btn-primary" onClick={() => addBears()}>
        Agregar Osos
      </button>
      <button className="mt-2 btn-primary" onClick={() => clearBears()}>
        Limpiar Osos
      </button>
      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};

export default BearPage;
