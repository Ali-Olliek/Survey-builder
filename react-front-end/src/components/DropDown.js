import React, {useState} from 'react'

export default function DropDown({selected, setSelected}) {

    const [isActive, setisActive] = useState(false)
    const options = ['text', 'Checkbox', 'dropdown']

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setisActive(!isActive)}>
        Choose Question Type: {selected}
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(e.target.textContent)
                setisActive(false);
                }
            }
              className="dropdown-item">
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
