import { CloseButton } from "../close-button/close-button";
import { useAppDispatch } from "../../hooks/use-app-dispatch/use-app-dispatch";
import { setFormStatus, setVideoStatus } from "../../store/banner-process/banner-process";
import { useState, ChangeEvent } from 'react';
import InputMask from 'react-input-mask';

export const InputForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [number, setNumber] = useState<string>('+7(___)___-__-__');

    const handleNumberChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setNumber(evt.target.value);
    };

    return (
        <>
            <form className="input-form-wrapper">
                <fieldset className='fieldset-wrapper'>
                    <label className="input-form-heading">Введите ваш номер мобильного телефона</label>
                    <InputMask
                        mask="+7(999)999-99-99"
                        maskChar="_"
                        value={number}
                        onChange={handleNumberChange}
                    >
                        {() => <input
                            type="text"
                            className="input-form-number"
                        />}
                    </InputMask>
                    <p className='input-form-top-text'>и с Вами свяжется наш менеждер для дальнейшей консультации</p>
                    <div className="buttons-container">
                        <div className="buttons-row">
                            <button className="button-usual">1</button>
                            <button className="button-usual">2</button>
                            <button className="button-usual">3</button>
                        </div>
                        <div className="buttons-row">
                            <button className="button-usual">4</button>
                            <button className="button-usual">5</button>
                            <button className="button-usual">6</button>
                        </div>
                        <div className="buttons-row">
                            <button className="button-usual">7</button>
                            <button className="button-usual">8</button>
                            <button className="button-usual">9</button>
                        </div>
                        <div className="buttons-row">
                            <button className="button-usual button-double">Стереть</button>
                            <button className="button-usual">0</button>
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
