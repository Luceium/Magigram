import React from 'react';

function Header(){
    return (
        <>
            <h1>Magigram</h1>
            <select data-choose-theme>
                <option value="">Default</option>
                <option value="dark">Dark</option>
                <option value="pink">Pink</option>
            </select>
        </>
    );
}
 
export default Header;