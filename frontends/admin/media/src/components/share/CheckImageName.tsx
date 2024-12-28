import React from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/redux';
import { checkImageName, setNewName } from 'store/Store';

const CheckImageName = (): React.ReactNode => {
  const nameInput = React.useRef<HTMLInputElement>(null);
  const [allow, setAllow] = React.useState<boolean | null>();
  const dispatch = useAppDispatch();
  const add_media = useAppSelector((state) => state.media.add_media);

  const debounce = () => {
    let timeoutID: ReturnType<typeof setTimeout>; // Correct type for timeout ID

    // Return the debounced function
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setNewName(e.target.value)); // Dispatch immediately for real-time state update

      if (add_media.file) {
        const file_type: string = add_media.file_type;
        // Clear previous timeout if it exists
        if (timeoutID) clearTimeout(timeoutID);

        // Set new timeout for delayed dispatch
        timeoutID = setTimeout(() => {
          dispatch(
            checkImageName({ image_name: e.target.value, file_type: file_type })
          ); // Dispatch after 1 second
        }, 1000);
      }
    };
  };

  const optimizationDebounce = React.useMemo(() => debounce(), [add_media]);

  React.useEffect(() => {
    // if (add_media.new_name) {
    //   nameInput.current?.focus();
    // }

    // console.log(add_media.allow_name);

    if (add_media.allow_name !== null && add_media.allow_name !== undefined) {
      if (add_media.allow_name) {
        setAllow(true);
      } else {
        setAllow(false);
      }
    } else {
      setAllow(null);
    }
  }, [add_media]);

  return (
    <>
      <div
        className={
          allow !== null
            ? !allow
              ? 'form-input alert'
              : 'form-input'
            : 'form-input'
        }
      >
        <input
          type="text"
          value={add_media.new_name} // Bind to local input state
          onChange={optimizationDebounce} // Handle input change
          ref={nameInput}
          required
        />
        <label>Title</label>
      </div>
    </>
  );
};

export default CheckImageName;
