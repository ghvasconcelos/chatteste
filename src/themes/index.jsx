import { cores } from "./cores";
import { tipografia } from "./tipografia";

export const theme = {
  cores,
  tipografia
};

theme.propTypes = {
  cores: typeof cores,
  tipografia: typeof tipografia
}