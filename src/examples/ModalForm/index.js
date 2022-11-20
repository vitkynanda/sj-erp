import MDBox from "components/MDBox";
import MDModal from "components/MDModal";
import { useGlobalStore } from "store";

const ModalForm = () => {
  const {
    modal: { open, form: Form, handler, title, input, disableFields, notRenderFields },
    setOpenModal,
  } = useGlobalStore();

  console.log(handler);
  const setOpen = (payload) => setOpenModal({ open: payload });
  return (
    <>
      <MDModal open={open} setOpen={setOpen}>
        <MDBox sx={{ pt: 4, px: 2 }}>
          {Form && (
            <Form
              title={title}
              submitHandler={handler}
              input={input}
              disableFields={disableFields}
              notRenderFields={notRenderFields}
            />
          )}
        </MDBox>
      </MDModal>
    </>
  );
};

export default ModalForm;
