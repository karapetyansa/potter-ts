import * as styledComponents from "styled-components";
import {ThemedStyledComponentsModule} from "styled-components";
import {ITheme} from "./theme";

const {default: styled, ThemeProvider} = styledComponents as ThemedStyledComponentsModule<ITheme>;

export {styled, ThemeProvider};
