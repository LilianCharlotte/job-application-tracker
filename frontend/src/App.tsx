import React from 'react';
import UserApp from "./component/UserApp";
import {createTheme, GlobalStyles, ThemeProvider} from "@mui/material";
import {themeOptions} from "./mui-theme";


export const theme = createTheme(themeOptions)


function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <GlobalStyles styles={{body: {backgroundColor: '#040c33'}}}/>
                <UserApp/>
            </ThemeProvider>
        </div>
    )
}

export default App;
