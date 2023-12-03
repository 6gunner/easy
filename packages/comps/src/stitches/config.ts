import {
  theme
} from "./defaultTheme";
import type { ConfigType } from "@stitches/react/types/config";

type Config = {
  prefix?: ConfigType.Prefix<string>
  media?: ConfigType.Media
  theme?: ConfigType.Theme
  themeMap?: ConfigType.ThemeMap
  utils?: ConfigType.Utils
}
const config: Config = {
  prefix: 'dev-easy',
  media: {
    "bp-mobile": '(max-width: 768px)',
  },
  theme: theme,
};

export default config;