import { CloseButton } from "../close-button/close-button";
import { useAppDispatch } from "../../hooks/use-app-dispatch/use-app-dispatch";
import { setFormStatus, setVideoStatus, setFormShownStatus } from "../../store/banner-process/banner-process";
import { useState, ChangeEvent, MouseEvent, KeyboardEvent, useRef, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useKeyPress } from "../../assets/hooks/use-key-press/use-key-press";
import { BUTTON_FOCUS_TIME, ERROR_SHOW_TIME, IDDLE_TIME, NUMBER_MASK, API_KEY, API_URL } from "../../const";
import axios from "axios";
import { formatPhoneNumber } from "../../utils";

export const InputForm = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const agreementLabelRef = useRef<HTMLLabelElement | null>(null);
    const closeButtonRef = useRef<HTMLDivElement | null>(null);
    const submitRef = useRef<HTMLButtonElement | null>(null);

    const [timerValue, setTimerValue] = useState<number | null>(null);
    const timerRef = useRef<number | null>(null);

    const [isFormShowing, setFormShowing] = useState(true);
    const [numberString, setNumberString] = useState(NUMBER_MASK);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [showError, setShowError] = useState(false);
    const [isAgreementChecked, setAgreementChecked] = useState(false);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);

    const arrowUpPressed = useKeyPress('ArrowUp');
    const arrowDownPressed = useKeyPress('ArrowDown');
    const arrowLeftPressed = useKeyPress('ArrowLeft');
    const arrowRightPressed = useKeyPress('ArrowRight');

    useEffect(() => {
        const initialTimer = setTimeout(() => {
            setTimerValue(10);
        }, 0);

        return () => {
            clearTimeout(initialTimer);
        };
    }, []);

    useEffect(() => {
        if (!isFormShowing) {
            const initialTimer = setTimeout(() => {
                setTimerValue(10);
            }, 0);


            return () => {
                clearTimeout(initialTimer);
            };
        }
    }, [isFormShowing]);

    useEffect(() => {
        const handleUserActivity = () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            setTimerValue(null);
            timerRef.current = setTimeout(() => {
                setTimerValue(10);
            }, IDDLE_TIME);
        };

        document.addEventListener("mousemove", handleUserActivity);
        document.addEventListener("keydown", handleUserActivity);
        document.addEventListener("touchstart", handleUserActivity);

        return () => {
            document.removeEventListener("mousemove", handleUserActivity);
            document.removeEventListener("keydown", handleUserActivity);
            document.removeEventListener("touchstart", handleUserActivity);
        };
    }, []);

    useEffect(() => {
        if (timerValue !== null && timerValue > 0) {
            const countdown = setInterval(() => {
                setTimerValue((prev) => (prev !== null ? prev - 1 : null));
            }, 1000);

            return () => clearInterval(countdown);
        } else if (timerValue === 0) {
            dispatch(setFormStatus(false));
            dispatch(setVideoStatus(true));
            dispatch(setFormShownStatus(true));
        }
    }, [timerValue, dispatch]);

    const handleNumberChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setNumberString(evt.target.value);
        if (evt.target.value === '') {
            setNumberString(NUMBER_MASK);
        }

        const digitCount = (evt.target.value.match(/\d/g) || []).length;

        if (digitCount === 11) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    };

    const moveCursorToEnd = () => {
        if (inputRef.current) {
            const input = inputRef.current;
            const value = input.value;
            let cursorPosition = value.length;

            for (let i = value.length - 1; i >= 0; i--) {
                if (/[0-9]/.test(value[i])) {
                    cursorPosition = i + 1;
                    break;
                }
            }

            if (value[cursorPosition] === ')' || value[cursorPosition] === '(' || value[cursorPosition] === '-') {
                cursorPosition++;
            }

            input.setSelectionRange(cursorPosition, cursorPosition);
        }
    };

    const handleOutOfMaskClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
        const currentlyFocused = document.querySelector('.focused');
        const currentlyFocusedAgreement = document.querySelector('.agreement-focused');

        if (currentlyFocused === evt.currentTarget || currentlyFocusedAgreement === evt.currentTarget) {
            return;
        }

        if (currentlyFocused) {
            currentlyFocused.classList.remove('focused');
        }

        if (currentlyFocusedAgreement) {
            currentlyFocusedAgreement.classList.remove('agreement-focused');
        }

        const currentButton = evt.currentTarget as HTMLButtonElement;
        currentButton.classList.add('focused');

        setTimeout(() => {
            currentButton.classList.remove('focused');
        }, BUTTON_FOCUS_TIME);
    };

    const handleNumberClick = (digit: string, evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        handleClick(evt);
        const currentFocusedElement = document.activeElement;
        if (inputRef.current) {
            inputRef.current.focus();
        }
        const firstUnderscore = numberString.indexOf('_');
        const lastUnderscore = numberString.lastIndexOf('_');

        if (firstUnderscore !== -1 && lastUnderscore !== -1) {
            const updatedNumberString = numberString.slice(0, firstUnderscore) + digit + numberString.slice(firstUnderscore + 1);
            setNumberString(updatedNumberString);

            const digitCount = (updatedNumberString.match(/\d/g) || []).length;

            if (digitCount === 11) {
                setSubmitDisabled(false);
            } else {
                setSubmitDisabled(true);
            }
        }
        setTimeout(() => {
            moveCursorToEnd();
            if (currentFocusedElement) {
                (currentFocusedElement as HTMLElement).focus();
            }
        }, 0);
    };

    const handleDocumentKeyDown = (evt: globalThis.KeyboardEvent) => {
        const isNumberKey = evt.key >= '0' && evt.key <= '9';
        const isBackspaceKey = evt.key === 'Backspace';

        if (isNumberKey || isBackspaceKey) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleDocumentKeyDown);

        return () => {
            document.removeEventListener('keydown', handleDocumentKeyDown);
        };
    }, [numberString]);

    const handleDeleteClick = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        handleClick(evt);
        const currentFocusedElement = document.activeElement;

        const lastDigitIndex = numberString.search(/\d(?![\d\D]*\d)/);
        if (lastDigitIndex >= 0) {
            if (lastDigitIndex === 1) {
                return;
            }
            const updatedNumberString = numberString.substring(0, lastDigitIndex) + '_' + numberString.substring(lastDigitIndex + 1);
            const digitCount = (updatedNumberString.match(/\d/g) || []).length;

            if (digitCount === 11) {
                setSubmitDisabled(false);
            } else {
                setSubmitDisabled(true);
            }

            setNumberString(updatedNumberString);
        }
        setTimeout(() => {
            moveCursorToEnd();
            if (currentFocusedElement) {
                (currentFocusedElement as HTMLElement).focus();
            }
        }, 0);
    };

    useEffect(() => {
        const maxIndex = 15;
        const lastDownIndex = (isSubmitDisabled || !isAgreementChecked) ? 13 : 14;

        if (arrowUpPressed) {
            if (focusedIndex === 1) {
                setFocusedIndex(lastDownIndex);
            } else if (focusedIndex === 3) {
                setFocusedIndex(lastDownIndex);
            } else if (focusedIndex === 11) {
                setFocusedIndex(9);
            } else if (focusedIndex === 14) {
                setFocusedIndex(13);
            } else if (focusedIndex === 15) {
                setFocusedIndex(lastDownIndex);
            } else (setFocusedIndex((prevIndex) => (prevIndex - 3 + maxIndex) % maxIndex));
        }
        if (arrowDownPressed) {
            if (focusedIndex === 8) {
                setFocusedIndex(10);
            } else if (focusedIndex === 9) {
                setFocusedIndex(11);
            } else if (focusedIndex === 11) {
                setFocusedIndex(13);
            } else if (focusedIndex === 0) {
                setFocusedIndex(1);
            } else if (focusedIndex === 10) {
                setFocusedIndex(13);
            } else if (focusedIndex === 13) {
                setFocusedIndex((isSubmitDisabled || !isAgreementChecked) ? 1 : 14);
            } else if (focusedIndex === 14) {
                setFocusedIndex(1);
            } else if (focusedIndex === 15) {
                setFocusedIndex(1);
            } else (setFocusedIndex((prevIndex) => (prevIndex + 3) % maxIndex));
        }
        if (arrowLeftPressed) {
            if (focusedIndex === 1) {
                setFocusedIndex(15);
            } else if (focusedIndex === 13) {
                setFocusedIndex(12);
            } else if (focusedIndex === 15) {
                setFocusedIndex(lastDownIndex);
            } else setFocusedIndex((prevIndex) => (prevIndex - 1 + maxIndex) % maxIndex);
        }
        if (arrowRightPressed) {
            if (focusedIndex === 13) {
                setFocusedIndex(15);
            } else if (focusedIndex === 14) {
                setFocusedIndex(15);
            } else if (focusedIndex === 3) {
                setFocusedIndex(15);
            } else if (focusedIndex === 6) {
                setFocusedIndex(15);
            } else if (focusedIndex === 9) {
                setFocusedIndex(15);
            } else if (focusedIndex === 11) {
                setFocusedIndex(15);
            } else setFocusedIndex((prevIndex) => (prevIndex + 1) % maxIndex);
        }

        const focusedElement = document.querySelector('.focused');
        if (focusedElement) {
            (focusedElement as HTMLElement).focus();
        }
    }, [arrowUpPressed, arrowDownPressed, arrowLeftPressed, arrowRightPressed]);

    useEffect(() => {
        if (focusedIndex === 13 && agreementLabelRef.current) {
            agreementLabelRef.current.focus();
        } else if (focusedIndex === 15 && closeButtonRef.current) {
            closeButtonRef.current.focus();
        } else if (focusedIndex === 14 && submitRef.current) {
            submitRef.current.focus();
        }
    }, [focusedIndex]);

    const handleAgreementChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setAgreementChecked(evt.target.checked);
    }

    const handleSubmitClick = async (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        try {
            const response = await axios.get(`${API_URL}?api_key=${API_KEY}&phone=${formatPhoneNumber(numberString)}`);
            
            if (response.data.valid) {
                setFormShowing(false);
            } else {
                setShowError(true);
                setTimeout(() => setShowError(false), ERROR_SHOW_TIME);
            }
        } catch (error) {
            throw new Error;
        }
    };

    useEffect(() => {
        if (!isFormShowing && closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, [isFormShowing]);

    const handleCheckboxEnterPress = (evt: KeyboardEvent<HTMLLabelElement>) => {
        evt.preventDefault();
        const checkboxElement = evt.target as HTMLInputElement;
        if (evt.key === 'Enter') {
            setAgreementChecked(prevChecked => !prevChecked);
            setTimeout(() => checkboxElement.focus(), 0);
        }
    };

    const handleSubmitEnterPress = async (evt: KeyboardEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        if (evt.key === 'Enter') {
            try {
                const response = await axios.get(`${API_URL}?api_key=${API_KEY}&phone=${formatPhoneNumber(numberString)}`);
                
                if (response.data.valid) {
                    setFormShowing(false);
                } else {
                    setShowError(true);
                    setTimeout(() => setShowError(false), ERROR_SHOW_TIME);
                }
            } catch (error) {
                throw new Error;
            }
        }
    };

    const handleCloseButtonEnterPress = (evt: KeyboardEvent<HTMLDivElement>) => {
        evt.preventDefault();
        if (evt.key === 'Enter') {
            dispatch(setFormStatus(false));
            dispatch(setVideoStatus(true));
            dispatch(setFormShownStatus(true));
        }
    };

    return (
        <>
            <div className="container">
                <form className="input-form-wrapper" onClick={handleOutOfMaskClick}>
                    {isFormShowing ? <fieldset className='fieldset-wrapper'>
                        <label className="input-form-heading">Введите ваш номер мобильного телефона</label>
                        <InputMask
                            mask="+7(999)999-99-99"
                            maskChar="_"
                            value={numberString}
                            onChange={handleNumberChange}
                            alwaysShowMask={true}
                        >
                            <input
                                type="text"
                                className="input-form-number"
                                ref={inputRef}
                                onClick={() => moveCursorToEnd()}
                                style={{ color: showError ? 'red' : 'inherit' }}
                            />
                        </InputMask>
                        <p className='input-form-top-text'>и с Вами свяжется наш менеджер для дальнейшей консультации</p>
                        <div className="buttons-container">
                            <div className="buttons-row">
                                <button className={`button-usual ${focusedIndex === 1 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('1', e)}>1</button>
                                <button className={`button-usual ${focusedIndex === 2 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('2', e)}>2</button>
                                <button className={`button-usual ${focusedIndex === 3 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('3', e)}>3</button>
                            </div>
                            <div className="buttons-row">
                                <button className={`button-usual ${focusedIndex === 4 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('4', e)}>4</button>
                                <button className={`button-usual ${focusedIndex === 5 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('5', e)}>5</button>
                                <button className={`button-usual ${focusedIndex === 6 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('6', e)}>6</button>
                            </div>
                            <div className="buttons-row">
                                <button className={`button-usual ${focusedIndex === 7 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('7', e)}>7</button>
                                <button className={`button-usual ${focusedIndex === 8 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('8', e)}>8</button>
                                <button className={`button-usual ${focusedIndex === 9 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('9', e)}>9</button>
                            </div>
                            <div className="buttons-row">
                                <button className={`button-usual button-double ${focusedIndex === 10 ? 'focused' : ''}`} type="button" onClick={handleDeleteClick}>СТЕРЕТЬ</button>
                                <button className={`button-usual ${focusedIndex === 11 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('0', e)}>0</button>
                            </div>
                        </div>
                        {showError ?
                            <div className="error-wrapper">
                                <p>НЕВЕРНО ВВЕДЁН НОМЕР</p>
                            </div>
                            :
                            <div className="agreement-wrapper">
                                <input
                                    type="checkbox"
                                    id="agreement-checkbox"
                                    className="agreement-checkbox"
                                    onChange={handleAgreementChange}
                                    checked={isAgreementChecked}
                                />
                                <label
                                    ref={agreementLabelRef}
                                    tabIndex={0}
                                    htmlFor="agreement-checkbox"
                                    className={`agreement-label ${focusedIndex === 13 ? 'agreement-focused' : ''}`}
                                    onKeyDown={handleCheckboxEnterPress}
                                ></label>
                                <p className="agreement-text">Согласие на обработку персональных данных</p>
                            </div>
                        }
                        <button
                            className={`submit-button ${focusedIndex === 14 ? 'focused' : ''}`}
                            type='submit'
                            onClick={handleSubmitClick}
                            onKeyDown={handleSubmitEnterPress}
                            disabled={isSubmitDisabled || !isAgreementChecked}
                            ref={submitRef}
                        >
                            ПОДТВЕРДИТЬ НОМЕР
                        </button>
                    </fieldset>
                        :
                        <div className="success-wrapper">
                            <h1 className="success-header">ЗАЯВКА ПРИНЯТА</h1>
                            <p className="success-text">Держите телефон под рукой. <br /> Скоро с Вами свяжется наш менеджер.</p>
                        </div>
                    }

                </form>
                <div
                    className={`close-button ${focusedIndex === 15 || !isFormShowing ? 'close-focused' : ''}`}
                    onClick={() => {
                        dispatch(setFormStatus(false));
                        dispatch(setVideoStatus(true));
                        dispatch(setFormShownStatus(true));
                    }}
                    onKeyDown={handleCloseButtonEnterPress}
                    tabIndex={0}
                    ref={closeButtonRef}
                >
                    <CloseButton />
                </div>
                {timerValue !== null && (
                    <div className="timer">
                        {timerValue}
                    </div>
                )}
            </div >
        </>
    );
};
