import { WhiteCard } from "../../components";
import { useWeddingBounceStore } from "../../stores/wedding";

export const WeddingInvitationPage = () => {
  const firstName = useWeddingBounceStore((state) => state.firstName);
  const lastName = useWeddingBounceStore((state) => state.lastName);

  const guestQuantity = useWeddingBounceStore((state) => state.guestQuantity);
  const confirmation = useWeddingBounceStore((state) => state.confirmation);

  const setFistName = useWeddingBounceStore((state) => state.setFirstName);
  const setLastName = useWeddingBounceStore((state) => state.setLastName);

  const setGuestQuantity = useWeddingBounceStore(
    (state) => state.setGuestQuantity
  );

  const eventYYYYMMDD = useWeddingBounceStore((state) => state.eventYYYYMMDD());
  const eventHHMM = useWeddingBounceStore((state) => state.eventHHMM());
  const setEventDate = useWeddingBounceStore((state) => state.setEventDate);
  const setEventTime = useWeddingBounceStore((state) => state.setEventTime);

  const setConfirmation = useWeddingBounceStore(
    (state) => state.setConfirmation
  );

  return (
    <>
      <h1>Invitación de Boda</h1>
      <p>Zustand segmentado en slices</p>
      <hr />

      <WhiteCard className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Nombre"
                    value={firstName}
                    onChange={(e) => setFistName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Cuántos invitados traerá?
              </label>
              <input
                type="number"
                name="guestNumber"
                id="guestNumber"
                placeholder="5"
                min="0"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={guestQuantity}
                onChange={(e) => setGuestQuantity(+e.target.value)}
              />
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Fecha de evento
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    id="eventDate"
                    value={eventYYYYMMDD}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Hora del evento
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    id="eventTime"
                    value={eventHHMM}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Tu también vendrás?
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton1"
                    className="h-5 w-5"
                    checked={confirmation}
                    onChange={() => setConfirmation(true)}
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">
                    Si
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton2"
                    className="h-5 w-5"
                    checked={!confirmation}
                    onChange={() => setConfirmation(false)}
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button className="btn-primary">Enviar</button>
            </div>
          </form>
        </div>
      </WhiteCard>
    </>
  );
};
