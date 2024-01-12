import React from 'react';

function Header(){
    return (
        <div className='navbar bg-base-100'>
            <div className="flex-1">
                <h1 className="text-3xl">Magigram</h1>
            </div>
            <select data-choose-theme class="select select-primary max-w-xs">
            {[
                        "cyberpunk",
                        "synthwave",
                        "lemonade",
                        "retro",
                        "dark",
                        "night",
                        "forest",
                        "luxury",
                    ].map((theme) => { return <option value={theme}>{theme[0].toUpperCase() + theme.slice(1)}</option>})}
            </select>
        </div>
    );
}
 
export default Header;