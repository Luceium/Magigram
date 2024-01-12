import React from 'react';

function Header(){
    return (
        <>
            <h1>Magigram</h1>
            <select data-choose-theme>
                <option value="">Default</option>
                <option value="dark">Dark</option>
                <option value="pink">Pink</option>
                {[  "cyberpunk",
                    "synthwave",
                    "lemonade",
                    "retro",
                    "dark",
                    "night",
                    "forest",
                    "luxury",]
                .map((theme) =>
                    {<option value={theme}>{theme.toUpperCase()}</option>})}
            </select>
        </>
    );
}
 
export default Header;