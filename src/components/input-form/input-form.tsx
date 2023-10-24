import { CloseButton } from "../close-button/close-button";
import { useAppDispatch } from "../../hooks/use-app-dispatch/use-app-dispatch";
import { setFormStatus, setVideoStatus } from "../../store/banner-process/banner-process";
import { useState, ChangeEvent, MouseEvent, KeyboardEvent, useRef, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useKeyPress } from "../../assets/hooks/use-key-press/use-key-press";

export const InputForm = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [numberString, setNumberString] = useState('+7(___)___-__-__');
    const [focusedIndex, setFocusedIndex] = useState(0);

    const arrowUpPressed = useKeyPress('ArrowUp');
    const arrowDownPressed = useKeyPress('ArrowDown');
    const arrowLeftPressed = useKeyPress('ArrowLeft');
    const arrowRightPressed = useKeyPress('ArrowRight');



    const handleNumberChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setNumberString(evt.target.value);
        if (evt.target.value === '') {
            setNumberString('+7(___)___-__-__');
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

    const handleNumberClick = (digit: string, evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        const currentFocusedElement = document.activeElement;
        if (inputRef.current) {
            inputRef.current.focus();
        }
        const firstUnderscore = numberString.indexOf('_');
        const lastUnderscore = numberString.lastIndexOf('_');

        if (firstUnderscore !== -1 && lastUnderscore !== -1) {
            const updatedNumberString = numberString.slice(0, firstUnderscore) + digit + numberString.slice(firstUnderscore + 1);
            setNumberString(updatedNumberString);
        }
        setTimeout(() => {
            moveCursorToEnd();
            if (currentFocusedElement) {
                (currentFocusedElement as HTMLElement).focus();
            }
        }, 0);
    };

    const handleDeleteClick = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        const currentFocusedElement = document.activeElement;

        const lastDigitIndex = numberString.search(/\d(?![\d\D]*\d)/);
        if (lastDigitIndex >= 0) {
            if (lastDigitIndex === 1) {
                return;
            }
            const updatedNumberString = numberString.substring(0, lastDigitIndex) + '_' + numberString.substring(lastDigitIndex + 1);
            
            console.log(updatedNumberString)
            setNumberString(updatedNumberString);
        }
        setTimeout(() => {
            moveCursorToEnd();
            if (currentFocusedElement) {
                (currentFocusedElement as HTMLElement).focus();
            }
        }, 0);
    };

    const handleInputKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
        }
    };

    useEffect(() => {
        const maxIndex = 12;
        if (arrowUpPressed) {
            if (focusedIndex === 2) {
                setFocusedIndex(10);
            } else if (focusedIndex === 3) {
                setFocusedIndex(11);
            } else if (focusedIndex === 11) {
                setFocusedIndex(9);
            } else (setFocusedIndex((prevIndex) => (prevIndex - 3 + maxIndex) % maxIndex));
        }
        if (arrowDownPressed) {
            if (focusedIndex === 8) {
                setFocusedIndex(10);
            } else if (focusedIndex === 9) {
                setFocusedIndex(11);
            } else if (focusedIndex === 11) {
                setFocusedIndex(3);
            } else if (focusedIndex === 0) {
                setFocusedIndex(1);
            } else (setFocusedIndex((prevIndex) => (prevIndex + 3) % maxIndex));
        }
        if (arrowLeftPressed) {
            if (focusedIndex === 1) {
                setFocusedIndex(12);
            }
            setFocusedIndex((prevIndex) => (prevIndex - 1 + maxIndex) % maxIndex);
        }
        if (arrowRightPressed) {
            if (focusedIndex === 11) {
                setFocusedIndex(0);
            }
            setFocusedIndex((prevIndex) => (prevIndex + 1) % maxIndex);
        }

        const focusedElement = document.querySelector('.focused'); // Находим элемент с классом "focused"
        if (focusedElement) {
            (focusedElement as HTMLElement).focus(); // Устанавливаем фокус на найденном элементе
        }
    }, [arrowUpPressed, arrowDownPressed, arrowLeftPressed, arrowRightPressed]);

    return (
        <>
            <form className="input-form-wrapper" onClick={handleOutOfMaskClick}>
                <fieldset className='fieldset-wrapper'>
                    <label className="input-form-heading">Введите ваш номер мобильного телефона</label>
                    <InputMask
                        mask="+7(999)999-99-99"
                        maskChar="_"
                        value={numberString}
                        onChange={handleNumberChange}
                        onKeyDown={handleInputKeyDown}
                        alwaysShowMask={true}
                    >
                        {() => <input
                            type="text"
                            className="input-form-number"
                            ref={inputRef}
                            onClick={() => moveCursorToEnd()}
                        />}
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
                            <button className={`button-usual button-double ${focusedIndex === 10 ? 'focused' : ''}`} onClick={handleDeleteClick}>Стереть</button>
                            <button className={`button-usual ${focusedIndex === 11 ? 'focused' : ''}`} type="button" onClick={(e) => handleNumberClick('0', e)}>0</button>
                        </div>
                    </div>
                </fieldset>
            </form>
            <div
                className="close-button"
                onClick={() => {
                    dispatch(setFormStatus(false));
                    dispatch(setVideoStatus(true));
                }}
            >
                <CloseButton />
            </div>
        </>
    );
}
