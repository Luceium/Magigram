import React, { useState } from 'react';
import Instructions from './Instructions';

function Header(){
    // local storage only stores strings and with 2 bytes per character so t is used to represent true.
    const [isInfoNeverClicked, infoClicked] = useState(localStorage.getItem('isInfoNeverClicked') == null);
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'cyberpunk');

    return (
        <>
            <div className='navbar text-base-content'>
                <div className="flex-1">
                    <h1 className="text-3xl">Magigram</h1>
                </div>
                <div className="indicator">
                    {isInfoNeverClicked && <span className="indicator-item badge badge-primary">new</span>}
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn text-info m-2" onClick={()=>document.getElementById('tip_modal').showModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>
                    <dialog id="tip_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
            
                        <Instructions />
                        <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => {infoClicked(false); localStorage.setItem("isInfoNeverClicked", "f");}}>Close</button>
                        </form>
                        </div>
                    </div>
                    </dialog>
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
                        ].map((theme) => { return <option key={theme} value={theme}>{theme[0].toUpperCase() + theme.slice(1)}</option>})}
                </select>
            </div>
            <div className="divider divider-neutral m-0 h-0"></div>
        </>
    );
}
 
export default Header;