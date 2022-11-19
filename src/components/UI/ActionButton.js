import { Icon, Tooltip } from "@mui/material";
import { useMaterialUIController } from "context";
import ThemedIconButton from "./ThemedIconButton";

const ActionButton = ({ icon, title, onClick }) => {
  const [controller] = useMaterialUIController();
  return (
    <Tooltip title={title}>
      <ThemedIconButton color={controller.darkMode ? "white" : "inherit"} onClick={onClick}>
        <Icon>{icon}</Icon>
      </ThemedIconButton>
    </Tooltip>
  );
};

export default ActionButton;
