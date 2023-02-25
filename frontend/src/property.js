import React from 'react';

function Property(props) {

  return (
    <>
    
    <div className='prop-div'>
          <div>
              <label className='label-1'>
                  Button text
              </label>
          </div>
          <div>
              <input type="text" name="name" className='txt-1' placeholder="Enter your Text" />
          </div>
        </div>
        <div className='prop-div'>
              <div>

                  <label className='label-2'>
                      Button Radius
                  </label>
              </div>
              <div>
                  <input type="text" name="name" className='txt-1' placeholder="Enter Radius(%)" />
              </div>
          </div><div className='prop-div'>
              <div>
                  <label className='label-3'>
                      Text box
                  </label>
              </div>
              <div>
                  <input type="text" name="name" className='txt-1' placeholder="Enter your Text" />
              </div>
          </div></>
  );
}

export default Property;