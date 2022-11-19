import MDBox from "components/MDBox";
import MDModal from "components/MDModal";
import { useGlobalStore } from "store";

const ModalForm = ({ Form, formProps }) => {
  const {
    modal: { open },
    setOpenModal: setOpen,
  } = useGlobalStore();
  return (
    <MDModal open={open} setOpen={setOpen}>
      <MDBox sx={{ pt: 4, px: 2 }}>
        <Form {...formProps} />
      </MDBox>
    </MDModal>
  );
};

export default ModalForm;
