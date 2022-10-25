import React, { useEffect, useState } from 'react';
import { ToastContainer, toast  } from 'react-toastify';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './CharacterList';
import { Slider } from 'rsuite';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {

  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(()=>{
       if( includeUppercase || includeLowercase || includeNumbers || includeSymbols ){
            setIsDisabled(false);
       }
       else{
            setIsDisabled(true);
       }
  }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols]);
  
  const generatePassword = () => {

        let characterList = '';

        if( !includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols ){
              toast.error('Must Select Aleast One Option...');
        }

        if (includeLowercase) {
          characterList = characterList + lowerCaseLetters;
        }

        if (includeUppercase) {
          characterList = characterList + upperCaseLetters;
        }

        if (includeNumbers) {
          characterList = characterList + numbers;
        }

        if (includeSymbols) {
          characterList = characterList + specialCharacters;
        } 
         
        setPassword(createPassword(characterList)); 
  } 

  const createPassword = (characterList) => {
       let password = '';
       const characterListLength = characterList.length;

       for (let i = 0; i < passwordLength; i++) {
            const characterIndex = Math.round(Math.random() * characterListLength);
            password = password + characterList.charAt(characterIndex);
       }

       return password;
  }

  useEffect(()=>{
       if( password ){
            toast.success('Password Generated Successfully...');
       } 
  }, [password]);

  const copyClipboard = () => {
      const newTextArea = document.createElement('textarea')
      newTextArea.innerText = password
      document.body.appendChild(newTextArea)
      newTextArea.select()
      document.execCommand('copy')
      newTextArea.remove()
  }

  const copyPassword = () => {
      if( password === '' ){
           toast.error('Please Generate the Password');
      }
      else{
           copyClipboard();
           toast.success('Password Copied Successfully...');
      }
  } 

  return (
    <div>
        <div className="todoApp position-relative">
          <div className='bg-img'></div>
          <div className='innerDiv position-relative pt-5 z-index-1'>
              <div className='container'>
                  <div className='row justify-content-center'>
                      <div className='col-xl-5 col-lg-5 col-sm-10 col-md-8 col-12'>
                          <div className='web-logo text-center'>
                              <img src='https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg' alt='Todo Logo' />
                          </div>

                          <div className='input-box mt-5'>
                              <div className='top-form position-relative'>
                                      <input 
                                              type={'text'} 
                                              placeholder="Your Generated Password..." 
                                              className='form-control' 
                                              readOnly 
                                              value={password}
                                      />
                                      <button onClick={copyPassword} type="submit"> 
                                          <i className='fa fa-copy'></i>
                                      </button> 
                              </div>
                          </div>

                          <div className='result-sec mt-4 pt-2'>
                              <div className='final-res'>
                                  <div className='res-div'>
                                       <div className='row align-items-center'>
                                             <div className='col-5'>
                                                  <p>Password Length - {passwordLength}</p>
                                             </div>
                                             <div className='col-7'>
                                                      <div className='range-slider'>
                                                            <Slider
                                                                progress
                                                                defaultValue={passwordLength}
                                                                max={40}
                                                                min={7}
                                                                tooltip={true}
                                                                onChange={value => {
                                                                    setPasswordLength(value);
                                                                }}
                                                              />
                                                      </div>
                                             </div>
                                       </div>
                                       
                                       
                                  </div>
                                  <div className='res-div'>
                                       <div className='d-flex gap-3 align-items-center'>
                                            <input type='checkbox'
                                                    id='lowercase-letters'
                                                    name='lowercase-letters' 
                                                    checked={includeLowercase}
                                                    onChange={(e)=> setIncludeLowercase(e.target.checked)}
                                            />
                                            <label htmlFor='lowercase-letters'>Include lowercase letters</label>
                                       </div>
                                  </div>
                                  <div className='res-div'>
                                       <div className='d-flex gap-3 align-items-center'>
                                            <input type='checkbox'
                                                    id='uppercase-letters'
                                                    name='uppercase-letters' 
                                                    checked={includeUppercase}
                                                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                                            />
                                            <label htmlFor='uppercase-letters'>Include uppercase letters</label>
                                       </div>
                                  </div>
                                  <div className='res-div'>
                                       <div className='d-flex gap-3 align-items-center'>
                                            <input type='checkbox'
                                                    id='include-numbers'
                                                    name='include-numbers' 
                                                    checked={includeNumbers}
                                                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                                            />
                                            <label htmlFor='include-numbers'>include Numbers</label>
                                       </div>
                                  </div>
                                  <div className='res-div'>
                                       <div className='d-flex gap-3 align-items-center'>
                                            <input type='checkbox'
                                                    id='include-symbols'
                                                    name='include-symbols'
                                                    checked={includeSymbols}
                                                    onChange={(e) => setIncludeSymbols(e.target.checked)} 
                                            />
                                            <label htmlFor='include-symbols'>Include Symbols</label>
                                       </div>
                                  </div>
                                  <div className='res-div'>
                                       <button disabled={isDisabled} onClick={generatePassword} className='btn btn-block w-100 btn-primary btn-lg'>
                                              Generate Password
                                       </button>
                                  </div>
                              </div>
                          </div>

                          <div className='author-name pb-4 text-center mt-4'>
                              Created by 💗  Saurabh Jain
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <ToastContainer position="bottom-right"/>
    </div> 
  );
}

export default App;
