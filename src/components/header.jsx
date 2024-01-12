import React from 'react';

function Header(){
    return (
        <>
            <h1>Magigram</h1>
            <select data-choose-theme>
                {[  "cyberpunk",
                    "synthwave",
                    "lemonade",
                    "retro",
                    "dark",
                    "night",
                    "forest",
                    "luxury",]
                .map((theme) =>
                    {return <option value={theme}>{theme[0].toUpperCase() + theme.slice(1)}</option>})}
            </select>
        </>
    );
}
 
export default Header;