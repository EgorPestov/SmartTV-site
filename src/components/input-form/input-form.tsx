import { CloseButton } from "../close-button/close-button";
import { useAppDispatch } from "../../hooks/use-app-dispatch/use-app-dispatch";
import { setFormStatus, setVideoStatus } from "../../store/banner-process/banner-process";
import { useState, ChangeEvent, MouseEvent, useRef } from 'react';
import InputMask from 'react-input-mask';


export const InputForm = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [numberString, setNumberString] = useState('+7(___)___-__-__');

    const handleNumberChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setNumberString(evt.target.value);
        if (evt.target.value === '') {
            setNumberString('+7(___)___-__-__')
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
        }, 0);
    };

    const handleDeleteClick = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        if (numberString === '+7(___)___-__-__'){
            return;
        }
        const lastDigitIndex = numberString.search(/\d(?![\d\D]*\d)/);
        if (lastDigitIndex >= 0) {
            const updatedNumberString = numberString.substring(0, lastDigitIndex) + '_' + numberString.substring(lastDigitIndex + 1);
            setNumberString(updatedNumberString);
        }
        setTimeout(() => {
            moveCursorToEnd();
        }, 0);
    };

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
                    >
                        {() => <input
                            type="text"
                            className="input-form-number"
                            ref={inputRef}
                            onClick={() => moveCursorToEnd()}
                        />}
                    </InputMask>
                    <p className='input-form-top-text'>и с Вами свяжется наш менеждер для дальнейшей консультации</p>
                    <div className="buttons-container">
                        <div className="buttons-row">
                            <button className="button-usual" onClick={(e) => handleNumberClick('1', e)}>1</button>
                            <button className="button-usual" onClick={(e) => handleNumberClick('2', e)}>2</button>
                            <button className="button-usual" onClick={(e) => handleNumberClick('3', e)}>3</button>
                        </div>
                        <div className="buttons-row">
                            <button className="button-usual" onClick={(e) => handleNumberClick('4', e)}>4</button>
                            <button className="button-usual" onClick={(e) => handleNumberClick('5', e)}>5</button>
                            <button className="button-usual" onClick={(e) => handleNumberClick('6', e)}>6</button>
                        </div>
                        <div className="buttons-row">
                            <button className="button-usual" onClick={(e) => handleNumberClick('7', e)}>7</button>
                            <button className="button-usual" onClick={(e) => handleNumberClick('8', e)}>8</button>
                            <button className="button-usual" onClick={(e) => handleNumberClick('9', e)}>9</button>
                        </div>
                        <div className="buttons-row">
                            <button className="button-usual button-double" onClick={handleDeleteClick}>Стереть</button>
                            <button className="button-usual" onClick={(e) => handleNumberClick('0', e)}>0</button>
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
