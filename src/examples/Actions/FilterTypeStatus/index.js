import MDBox from "components/MDBox";
import AutoCompleteInput from "components/UI/AutoCompleteInput";
import { useGlobalStore } from "store";

const FilterTypeStatus = () => {
  const { setTypeStatus, typeStatus } = useGlobalStore();
  const onSelect = (e) => {
    const { name, value } = e.target;
    setTypeStatus({ ...typeStatus, [name]: value });
  };
  return (
    <MDBox display="flex" gap={2} alignItems="center" width={300}>
      <AutoCompleteInput
        fullWidth
        label="Type"
        onSelect={onSelect}
        options={[
          { key: "All", value: "" },
          { key: "Deposit", value: "DEPOSIT" },
          { key: "Withdraw", value: "WITHDRAW" },
          { key: "Bonus", value: "BONUS" },
        ]}
      />
      <AutoCompleteInput
        fullWidth
        label="Status"
        onSelect={onSelect}
        options={[
          { key: "All", value: "" },
          { key: "Pending", value: "PENDING" },
          { key: "Completed", value: "COMPLETED" },
        ]}
      />
    </MDBox>
  );
};

export default FilterTypeStatus;
